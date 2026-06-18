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

  function execute(attacker, target) {
    const weaponData = BattleHelper.compileWeaponData(attacker);
    const attacks = calculateAttacks(attacker, weaponData);
    const messages = []
    const time = totalTime(attacks);

    const rolls = attacks.map(attack => {
      const attackRoll = PhysicalAttackRoll(attacker, target, attack);
      const defendRoll = DefendRoll(target, attacker, attackRoll);
      return { attack:attackRoll, defend:defendRoll };
    });

    for (let i=0; i<attacks.length; i++) {
      if (rolls[i].attack.isCrit() && rolls[i].defend.isCrit()) {
        return execute(attacker, target);
      }
    }

    rolls.forEach(roll => {
      compileMessages(attacker, target, roll).forEach(message => {
        messages.push(message);
      })
    });

    return { messages, time };
  }

  function compileMessages(attacker, target, roll) {
    const state = BattleSystem.getState();
    const context = buildContext(attacker, target, roll.attack, roll.defend);
    const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, roll.attack.getTextKey(), context));
    const messages = [];

    if (state.isAlive(target)) {
      messages.push({ text:Weaver(context).weave(attackText), rollDetails:roll });

      (roll.attack.getFinalValue() > roll.defend.getFinalValue()) ?
        processHit(messages, context, roll):
        processMiss(messages, context, roll);
    }

    return messages;
  }

  // TODO: Assuming crit damage is x2, could be more for different weapons, or with different abilities. Crit damage
  //       reduction could also change this.

  // TODO: Exploding crits should be possible when rolling damage. Need to be able to look up a damage crit chance
  //       which should be handled separately from the hit critical chance.

  function processHit(messages, context, roll) {
    const attacker = context.A;
    const target = context.T;
    const weaver = Weaver(context);
    const baseWeapon = roll.attack.getBaseWeapon();

    const damageRoll = rollDamage(attacker, baseWeapon, context.attack, context.defend);
    const damageTypes = damageRoll.damage;
    damageRoll.messages.forEach(m => {
      messages.push(weaver.weave(m));
    });

    // If the hit comes from a real weapon with a weapon enchantment, we process the on hit effect of the enchantment.
    // This can add a message or modify the raw attack damage. If the damage is adjusted by the enchantment the
    // damageTypes object is modified from within the processOnHit() function.
    if (roll.attack.getWeapon()) {
      const weapon = Weapon(roll.attack.getWeapon());
      if (weapon.hasEnchantment()) {
        const message = weapon.getEnchantment().processOnHit({ attacker, target, damageTypes });
        if (message) {
          messages.push(weaver.weave(message.message));
        }
      }
    }

    const actualDamage = BattleDamage.applyDamage({
      entity: target,
      damageTypes: damageTypes,
      hitLocation: context.hitLocation,
      isCrit: context.attack === 'crit',
    });

    // Get total damage from actual damage types object...
    messages.push({ text:`Hit for ${actualDamage} damage!` });

    Console.log(`Damage Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{
      damage: actualDamage,
      hitLocation: context.hitLocation,
    }});

    if (BattleSystem.getState().isAlive(target) === false) {
      Console.log(`[${target}] was killed`,{ system:'BattleSystem', level:2 });
    }
  }

  function processMiss(messages, context, roll) {
    const attacker = context.A;
    const target = context.T;

    if (context.attack === 'fumble') { messages.push(addStatus(attacker,'off-balance',context,roll)); }
    if (context.defend === 'crit')   { messages.push(addStatus(target,'poised',context,roll)); }
    if (context.defend === 'fumble') { messages.push(addStatus(target,'vulnerable',context,roll)); }

    messages.push({ text:`Miss.` });
  }


  // The rolled damage value is rather complex because we need to divide the base damage into it's damage type
  // components so that additional damage from enchantments can be added or so that damage values can be resisted. We
  // also increase damage depending on the attack and defense crit and fumble states, and include a message when that
  // happens.
  //   - attacker: Attacker entity id.
  //   - baseWeapon: BaseWeapon record
  //   - attack: ['crit','fumble','normal']
  //   - defend: ['crit','fumble','normal']
  function rollDamage(attacker, baseWeapon, attack, defend) {
    const strength = AttributesComponent.lookup(attacker).strength;
    const damageRoll = Random.between(baseWeapon.getHigh(), baseWeapon.getLow());
    const result = { messages:[], damage:{} };

    let rawDamage = Math.round((damageRoll / 100) * strength);

    if (attack === 'crit') {
      result.messages.push(`The attack caught {T:him} by surprise!`);
      rawDamage = rawDamage*2;
    }
    if (attack === 'fumble') {
      result.messages.push(`It was only a glancing blow.`);
      rawDamage = Math.ceil(rawDamage/2);
    }
    if (defend === 'crit') {
      result.messages.push(`{S/tar}{T:baseName}{/S} was almost able to avoid it.`);
      rawDamage = Math.ceil(rawDamage/2);
    }
    if (defend === 'fumble') {
      result.messages.push(`{S/tar}{T:baseName}{/S} was left wide open!`);
      rawDamage = rawDamage*2;
    }

    baseWeapon.getDamageTypes().forEach(damageType => {
      result.damage[damageType.type] = Math.round(rawDamage * (damageType.percent/100));
    });

    return result;
  }

  function addStatus(entity, status, context, roll) {
    const defendSkill = roll.defend.getDefendSkill();
    const weaver = Weaver(context);
    let message;

    if (status === 'poised') {
      message = {
        'dodge': `{S/tar}{T:baseName}{/S} leaps away with stunning agility, and is now {S/pst}Poised{/S} and ready to defend {T:him}self.`,
        'block': `{S/tar}{T:baseName}{/S} braces {T:him}self, becoming {S/pst}Poised{/S} and harder to hit.`,
        'parry': `{S/tar}{T:baseName}{/S} flourishes {T:his} blade, {T:his} {S/pst}Poised{/S} stance ready to defend against any attack.`,
      }[defendSkill];
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
    return { text: weaver.weave(message) };
  }

  function calculateAttacks(attacker, weapons) {
    const attacks = [];
    const state = BattleSystem.getState();
    const speedFactor = state.isMonster(attacker) ?
      Monster(attacker).getSpeedFactor():
      Character(attacker).getSpeedFactor();

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

  // The context is used to select the attack text, so it needs to know if the attack roll or defend rolls are crits
  // or fumbles. This function just puts those values into a better format.
  function buildContext(attacker, target, attackRoll, defendRoll) {
    const context = {
      A:attacker,
      T:target,
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
