global.BasicAttack = (function() {

  // TODO: Still need to consider basic attack time. Setting it to a second for now. The basic attack command means,
  //       attack for 1 second, so a single attack command can have multiple swings or stabs in that time.

  // TODO: Skill checks need a way to have modifiers passed to them. There's no way to adjust crit or fumble chances,
  //       and it would be good to build in an advantage / disadvantage type system as well.

  // TODO: This assumes we're always attacking with the primary weapon. How do with handle characters with multiple
  //       weapons equipped? A basic attack can also attack multiple times at higher levels. Need to handle that. Some
  //       monsters might have multiple basic attacks as well, claw/claw/bite for instance.

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
    const attack = findBasicAttack(attacker);
    const baseWeapon = BaseWeapon.lookup(attack.base);
    const attackRoll = SkillCheck(attacker, baseWeapon.getSkill());
    const defendRoll = SkillCheck(target, 'dodge');
    const hitLocation = BattleHelper.randomHitLocation();

    // TODO: Assume defend with dodge for now. Characters will block when they have a shield equipped, or parry with a
    //       sword equipped.

    if (attackRoll.crit && defendRoll.crit) {
      return execute(attacker, target);
    }

    const context = buildContext({
      A: attacker,
      T: target,
      hitLocation: hitLocation,
    }, attackRoll, defendRoll);

    const attackTextKey = attack.attackText || baseWeapon.getAttackText();
    const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, attackTextKey, context));
    const weaver = Weaver(context);

    const result = {
      messages: [
        { text:weaver.weave(attackText) },
        { element:'roll-display', title:'Attack Roll', attack:attackRoll, defend:defendRoll },
      ],
      time: 1000,
    }

    function processHit() {
      // Because the hit happens these status effects only apply to this single
      // attack, so they're not really status effects then are they?
      if (context.attack === 'crit') { addStatus(attacker,'A','do-extra-damage') }
      if (context.attack === 'fumble') { addStatus(attacker,'A','do-less-damage') }
      if (context.defend === 'crit') { addStatus(target,'T','take-less-damage') }
      if (context.defend === 'fumble') { addStatus(target,'T','take-more-damage') }

      const strength = AttributesComponent.lookup(attacker).strength;
      const damageRoll = Random.between(baseWeapon.getHigh(), baseWeapon.getLow())
      const damage = Math.round((damageRoll / 100) * strength);

      result.messages.push({
        text: weaver.weave(`Attack hit {T:baseName's} ${hitLocation} for ${damage} damage!`)
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
      if (context.attack === 'crit') { addStatus(attacker,'A','increase-hit-chance'); }
      if (context.attack === 'fumble') { addStatus(attacker,'A','become-easier-to-hit'); }
      if (context.defend === 'crit') { addStatus(target,'T','become-harder-to-hit') }
      if (context.defend === 'fumble') { addStatus(target,'T','take-more-damage') }

      result.messages.push({
        text: weaver.weave(`Attack missed {T:baseName's} ${hitLocation}`)
      });

      return result;
    }

    function addStatus(entity, key, status) {
      result.messages.push({
        text: weaver.weave(`Add Status to {${key}:baseName} - ${status}`)
      });
    }

    return (attackRoll.value > defendRoll.value) ? processHit() : processMiss();
  }


  // A basic attack will have a base weapon at a bare minimum. To give monster attacks different flavors we also can
  // include a weapon 'name' and the 'attackText' attributes. If the name or attackText properties are null then the
  // basic attack will use the default text for the weapon.
  //
  // TODO: It's possible a character won't have a primary weapon equipped. We could add a 'fist' base weapon, or make
  //       martial arts a more complex system or we don't allow unequipped characters to make basic attacks.
  function findBasicAttack(attacker) {
    if (BattleSystem.getState().isMonster(attacker)) {
      return Monster(attacker).getBasicAttack();
    }

    const weaponId = EquipmentManager(attacker).getSlot(EquipmentSlot.primary);
    if (weaponId) {
      return { base: WeaponComponent.lookup(weaponId).base };
    }

    return null;
  }


  // The context is used to select the attack text, so it needs to know if the attack roll or defend rolls are crits
  // or fumbles. This function just puts those values into a better format.
  function buildContext(context, attackRoll, defendRoll) {
    if (attackRoll.crit) { context.attack = 'crit'; }
    if (attackRoll.fumble) { context.attack = 'fumble'; }
    if (context.attack == null) { context.attack = 'normal'; }
    if (defendRoll.crit) { context.defend = 'crit'; }
    if (defendRoll.fumble) { context.defend = 'fumble'; }
    if (context.defend == null) { context.defend = 'normal'; }
    return context;
  }

  return Object.freeze({
    execute,
  });

})();
