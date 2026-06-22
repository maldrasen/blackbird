global.BasicAttack = (function() {

  // When we execute the basic attack we first find the monster attack, or equipped weapon. Then we make attack and
  // defend rolls using the base weapon skill type for attacker. Because there are three possible states for each roll
  // (crit, fumble, or normal) we're left with a table with 9 possible outcomes for each attack.
  //
  //           D-Crit          D-Fum            D-Nor
  //   A-Crit  [Reroll]        [A++] & [D--]    [A++]
  //   A-Fum   [A--] & [D++]   [A--] & [D--]    [A--]
  //   A-Nor   [D++]           [D--]            [Normal]
  //
  //   [A++]   Attacker gets a positive status effect that increases physical weapon damage.
  //   [A--]   Attacker gets a status effect (like off balance)
  //   [D++]   Defender gets a positive status effect (something to reduce incoming damage)
  //   [D--]   Defender gets a negative status effect (like vulnerable)
  //
  // By handling crits and fumbles as status effects that increase or reduce damage we reduce the number states and
  // keep some of the interesting situations (like when an attacker crits and the defender fumbles, the added damage
  // from the critting state and the extra damage from the vulnerable state will add up to 4x damage)
  //
  // By separating the rolls and the status effects like this we also separate the actual to-hit from the crits and
  // fumbles. An attacker can crit (doing the best they can) but still miss their target.

  function execute() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const target = round.getTarget();
    const attacks = calculateAttacks();

    round.setTime(totalTime(attacks),false);

    const rolls = attacks.map(attack => {
      const attackRoll = PhysicalAttackRoll(acting, target, attack);
      const defendRoll = DefendRoll(target, acting, attackRoll);
      return { attack:attackRoll, defend:defendRoll };
    });

    for (let i=0; i<attacks.length; i++) {
      if (rolls[i].attack.isCrit() && rolls[i].defend.isCrit()) {
        return execute(acting, target);
      }
    }

    rolls.forEach(roll => {
      const context = buildAttackContext(roll)
      const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, roll.attack.getTextKey(), context));

      if (state.isAlive(context.T)) {
        round.addMessage({ text:attackText }, Weaver(context));
        (roll.attack.getFinalValue() > roll.defend.getFinalValue()) ?
          processHit(context, roll):
          processMiss(context, roll);
      }
    });
  }

  // TODO: Assuming crit damage is x2, could be more for different weapons, or with different abilities. Crit damage
  //       reduction could also change this.

  // TODO: Exploding crits should be possible when rolling damage. Need to be able to look up a damage crit chance
  //       which should be handled separately from the hit critical chance.

  function processHit(context, roll) {
    const attacker = context.A;
    const target = context.T;
    const damageTypes = rollDamage(attacker, roll.attack.getBaseWeapon(), context.attack, context.defend);

    // If the hit comes from a real weapon with a weapon enchantment, we process the on hit effect of the enchantment.
    // This can add a message or modify the raw attack damage. If the damage is adjusted by the enchantment the
    // damageTypes object is modified from within the processOnHit() function.
    if (roll.attack.getWeapon()) {
      const weapon = Weapon(roll.attack.getWeapon());
      if (weapon.hasEnchantment()) {
        weapon.getEnchantment().processOnHit(context, damageTypes);
      }
    }

    const actualDamage = BattleDamage.applyDamage({
      entity: target,
      damageTypes: damageTypes,
      hitLocation: context.hitLocation,
      isCrit: context.attack === 'crit',
    });

    BattleSystem.getRound().addMessage({ text:`Hit for ${actualDamage} damage!` });

    Console.log(`Damage Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{
      damage: actualDamage,
      hitLocation: context.hitLocation,
    }});

    if (BattleSystem.getState().isAlive(target) === false) {
      Console.log(`[${target}] was killed`,{ system:'BattleSystem', level:2 });
      BattleSystem.getRound().addMessage({ text:`{S/tar}{T:baseName}{/S} was killed!`, color:'important' });
    }
  }

  function processMiss(context, roll) {
    if (context.defend === 'crit')   { addStatus(context.T, 'poised', { skill:roll.defend.getDefendSkill() }); }
    if (context.attack === 'fumble') { addStatus(context.A, 'off-balance'); }
    if (context.defend === 'fumble') { addStatus(context.T, 'vulnerable'); }
    BattleSystem.getRound().addMessage({ text:`Miss`, color:'miss' });
  }

  // The rolled damage value is rather complex because we need to divide the base damage into it's damage type
  // components so that additional damage from enchantments can be added or so that damage values can be resisted. We
  // could aalso increase damage within this function depending on the attack and defense crit and fumble states.
  //   - attacker: Attacker entity id.
  //   - baseWeapon: BaseWeapon record
  //   - attack: ['crit','fumble','normal']
  //   - defend: ['crit','fumble','normal']
  function rollDamage(attacker, baseWeapon, attack, defend) {
    const round = BattleSystem.getRound();
    const strength = AttributesComponent.lookup(attacker).strength;
    const damageRoll = Random.between(baseWeapon.getHigh(), baseWeapon.getLow());
    const damage = {};

    let rawDamage = Math.round((damageRoll / 100) * strength);

    if (attack === 'crit') {
      round.addMessage({ text:`The attack caught {T:him} by surprise!` });
      rawDamage = rawDamage*2;
    }
    if (attack === 'fumble') {
      round.addMessage({ text:`It was only a glancing blow.` });
      rawDamage = Math.ceil(rawDamage/2);
    }
    if (defend === 'crit') {
      round.addMessage({ text:`{S/tar}{T:baseName}{/S} was almost able to avoid it.` });
      rawDamage = Math.ceil(rawDamage/2);
    }
    if (defend === 'fumble') {
      round.addMessage({ text:`{S/tar}{T:baseName}{/S} was left wide open!` });
      rawDamage = rawDamage*2;
    }

    baseWeapon.getDamageTypes().forEach(damageType => {
      damage[damageType.type] = Math.round(rawDamage * (damageType.percent/100));
    });

    return damage;
  }

  function addStatus(entity, status, options={}) {
    let message;

    if (status === 'poised') {
      message = {
        'dodge': `{S/tar}{T:baseName}{/S} leaps away with stunning agility, and is now {S/pst}Poised{/S} and ready to defend {T:him}self.`,
        'block': `{S/tar}{T:baseName}{/S} braces {T:him}self, becoming {S/pst}Poised{/S} and harder to hit.`,
        'parry': `{S/tar}{T:baseName}{/S} flourishes {T:his} blade, {T:his} {S/pst}Poised{/S} stance ready to defend against any attack.`,
      }[options.skill];
    }
    if (status === 'off-balance') {
      message = `{S/act}{A:baseName's}{/S} clumsy attack leaves {A:him} overextended and {S/nst}Off Balance{/S}.`;
    }
    if (status === 'vulnerable') {
      message = `Though the attack missed {S/tar}{T:baseName}{/S}, it left {T:him} in a {S/nst}Vulnerable{/S} position.`;
    }
    if (message == null) {
      throw new Error(`A basic attack shouldn't add the ${status} status.`)
    }

    BattleSystem.getState().addStatus(BattleStatusEffect(entity, status, { duration:1 }));
    BattleSystem.getRound().addMessage({ text:message });
  }

  // To calculate the weapon attacks we alternate between a character's equipped primary and secondary weapons, adding
  // attacks to a list until we have enough attacks to fill one second. The attacks may take more than one second. If
  // a character's primary weapon strike takes 900ms, they will attack twice but only every 1800ms. Alternatively, a
  // character with a weapon speed of 1200ms will attack once every 1200ms, so it might seem like they attack more
  // often, but really they're getting fewer hits in. It's just that they get to choose their actions more frequently.
  // A character that has both a primary and a secondary weapon equipped will use them each 75% faster.
  function calculateAttacks() {
    const round = BattleSystem.getRound();
    const speedFactor = round.getSpeedFactor();

    const attacks = [];
    const weapons = {
      primary: round.getPrimaryWeapon(),
      secondary: round.getSecondaryWeapon(),
    }

    let hand = 'primary';
    let time = 0;

    while(time < 1000) {
      const weapon = weapons[hand];
      const baseWeapon = BaseWeapon.lookup(weapon.base);

      let strikeTime = baseWeapon.getSpeed() * speedFactor;
      if (weapons.primary && weapons.secondary) {
        strikeTime = Math.round(strikeTime * 0.75);
      }

      attacks.push({
        code: 'basic-attack',
        weapon: weapon.weapon,
        base: weapon.base,
        name: weapon.name,
        textKey: weapon.textKey,
        hand: hand,
        time: strikeTime
      });

      time += strikeTime;
      hand = (hand === 'primary' && weapons.secondary) ? 'secondary' : 'primary';
    }

    return attacks;
  }

  function totalTime(attacks) {
    return attacks.reduce((total, attack) => {
      return total + attack.time
    },0);
  }

  // Because the context needs to include the hit location, crit, and fumble states, it will be different for each
  // attack.
  function buildAttackContext(roll) {
    const round = BattleSystem.getRound();
    const attackRoll = roll.attack;
    const defendRoll = roll.defend;

    const context = {
      A: round.getActing(),
      T: round.getTarget(),
      hitLocation: attackRoll.getHitLocation(),
      weaponName: attackRoll.getWeaponName(),
    };

    if (attackRoll.isCrit()) { context.attack = 'crit'; }
    if (attackRoll.isFumble()) { context.attack = 'fumble'; }
    if (context.attack == null) { context.attack = 'normal'; }
    if (defendRoll.isCrit()) { context.defend = 'crit'; }
    if (defendRoll.isFumble()) { context.defend = 'fumble'; }
    if (context.defend == null) { context.defend = 'normal'; }
    return context;
  }

  return Object.freeze({
    execute,
    rollDamage,
    calculateAttacks,
    totalTime,
  });

})();
