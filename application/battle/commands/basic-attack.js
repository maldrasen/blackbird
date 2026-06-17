global.BasicAttack = (function() {

  // TODO: Still need to consider basic attack time. Setting it to a second for now. The basic attack command means,
  //       attack for 1 second, so a single attack command can have multiple swings or stabs in that time.

  // TODO: Skill checks need a way to have modifiers passed to them. There's no way to adjust crit or fumble chances,
  //       and it would be good to build in an advantage / disadvantage type system as well.

  // TODO: This assumes we're always attacking with the primary weapon. How do with handle characters with multiple
  //       weapons equipped? A basic attack can also attack multiple times at higher levels. Need to handle that. Some
  //       monsters might have multiple basic attacks as well, claw/claw/bite for instance.

  // TODO: Assume defend with dodge for now. Characters will block when they have a shield equipped, or parry with a
  //       sword equipped.

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

    const rolls = attacks.map(attack => {
      const attackRoll = PhysicalAttackRoll(attacker, target, attack);
      const defendRoll = DefendRoll(attacker, target, attackRoll);
      return { attack:attackRoll, defend:defendRoll };
    });

    console.log("=== ROLLS ===")
    console.log(rolls);

    return {
      messages:[{ text:`Work in progress` }],
      time: totalTime(attacks),
    }

    // if (attackRoll.isCrit() && defendRoll.isCrit()) {
    //   return execute(attacker, target);
    // }

    // const context = buildContext({
    //   A: attacker,
    //   T: target,
    //   hitLocation: attackRoll.getHitLocation(),
    // }, attackRoll, defendRoll);

    // const weaver = Weaver(context);

    // const result = {
    //   messages: [
    //     { text:weaver.weave(attackRoll.getAttackText()) },
    //     { element:'roll-display', title:'Attack Roll', attack:attackRoll, defend:defendRoll },
    //   ],
    //   time: 1000,
    // }


    // TODO: Assuming crit damage is x2, could be more for different weapons, or with different abilities. Crit damage
    //       reduction could also change this.
    function processHit() {
      const strength = AttributesComponent.lookup(attacker).strength;
      const damageRoll = Random.between(baseWeapon.getHigh(), baseWeapon.getLow())
      let damage = Math.round((damageRoll / 100) * strength);

      if (context.attack === 'crit') {
        result.messages.push({
          text: weaver.weave(`[CRIT HIT]`)
        });
        damage = damage*2;
      }
      if (context.attack === 'fumble') {
        result.messages.push({
          text: weaver.weave(`[FUMBLE HIT]`)
        });
        damage = Math.ceil(damage/2);
      }
      if (context.defend === 'crit') {
        result.messages.push({
          text: weaver.weave(`[CRIT DEFEND]`)
        });
        damage = Math.ceil(damage/2);
      }
      if (context.defend === 'fumble') {
        result.messages.push({
          text: weaver.weave(`[FUMBLE DEFEND]`)
        });
        damage = damage*2;
      }

      result.messages.push({
        text: weaver.weave(`Hit {T:baseName's} ${hitLocation} for ${damage} damage!`)
      });

      BattleDamage.applyDamage({
        entity: target,
        damage: damage,
        damageTypes: baseWeapon.getDamageTypes(),
        isCrit: context.attack === 'crit',
      });

      return result;
    }

    function processMiss() {
      if (context.attack === 'fumble') { addStatus(attacker,'off-balance'); }
      if (context.defend === 'crit') { addStatus(target,'poised'); }
      if (context.defend === 'fumble') { addStatus(target,'vulnerable'); }

      result.messages.push({
        text: weaver.weave(`Missed {T:baseName's} ${hitLocation}`)
      });

      return result;
    }

    function addStatus(entity, status) {
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

      result.messages.push({ text: weaver.weave(message) });
      BattleSystem.getState().addStatus(BattleStatusEffect(entity, status, { duration:1 }));
    }

    return (attackRoll.value > defendRoll.value) ? processHit() : processMiss();
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
  function buildContext(context, attackRoll, defendRoll) {
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
    calculateAttacks,
    totalTime,
  });

})();
