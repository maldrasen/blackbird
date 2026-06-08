global.BasicAttack = (function() {

  // TODO: Still need to consider basic attack time. Setting it to a second for now. The basic attack command means,
  //       attack for 1 second, so a single attack command can have multiple swings or stabs in that time.

  // TODO: Skill checks need a way to have modifiers passed to them. There's no way to adjust crit or fumble chances,
  //       and it would be good to build in an advantage / disadvantage type system as well.

  // TODO: This assumes we're always attacking with the primary weapon. How do with handle characters with multiple
  //       weapons equipped? A basic attack can also attack multiple times at higher levels. Need to handle that. Some
  //       monsters might have multiple basic attacks as well, claw/claw/bite for instance.

  function execute(attacker, target) {
    const attack = findBasicAttack(attacker);
    const baseWeapon = BaseWeapon.lookup(attack.base);
    const attackRoll = SkillCheck(attacker, baseWeapon.getSkill())
    const dodgeRoll = SkillCheck(target, 'dodge');

    // An attack crit and defend crit at the same time is possible. Rather than determine which roll should win out,
    // we can simply call this function again as a tiebreaker.
    if (attackRoll.crit && dodgeRoll.crit) {
      return execute(attacker, target);
    }

    const context = buildAttackContext(attacker, target, attackRoll, dodgeRoll);

    // TODO: Assume defend with dodge for now. Characters will block when they have a shield equipped, or parry with a
    //       sword equipped.

    console.log("Making basic attack");
    console.log(`   Base: ${baseWeapon.getCode()}`);
    console.log(`   Attack Roll`,attackRoll);
    console.log(`   Dodge Roll`,dodgeRoll);
    console.log(`   Context:`,context);

    // Should be some kind of penalty for a crit miss. Maybe extra time before next turn. Could give an "off balance"
    // status effect that reduces dodge chance until next turn. Could be multiple penalty types.
    if (attackRoll.fumble) {
      console.log("Attack Fumbled!")
    }

    // Crit hit. Extra damage? Extra Damage Crit Chance?
    if (attackRoll.crit) {
      console.log("Attack CRIT!")
    }

    // Extra damage. (They get the vulnerable status until the next, impending hit)
    if (dodgeRoll.fumble) {
      console.log("Dodge Fumbled!")
    }

    // Critical dodge might add a status effect giving advantage to next dodge until next turn. Not much, but it's
    // something
    if (dodgeRoll.crit) {
      console.log("Dodge CRIT!")
    }


    // Normal attack result. No hits or crits on either side.
    if (Object.keys(attackRoll).length === 1 && Object.keys(dodgeRoll).length === 1) {
      if (attackRoll.value > dodgeRoll.value) {
        console.log("Hit!");
      } else {
        console.log("Miss...");
      }
    }

    const attackTextKey = attack.attackText || baseWeapon.getAttackText();
    const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, attackTextKey, context));
    const weaver = Weaver(context);
    const messages = [{ text:weaver.weave(attackText) }];

    return {
      messages: messages,
      time: 1000,
    };
  }

  // A basic attack will have a base weapon at a bare minimum. To give monster attacks different flavors we also can
  // include a weapon 'name' and the 'attackText' attributes. If the name or attackText properties are null then the
  // basic attack will use the default text for the weapon.
  //
  // TODO: It's possible a character won't have a primary weapon equipped. We could add a 'fist' base weapon, or make
  //       martial arts a more complex system or we don't allow unequipped characters to make basic attacks.
  function findBasicAttack(attacker) {
    if (BattleController.getState().getMonsters().includes(attacker)) {
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
  function buildAttackContext(attacker, target, attackRoll, defendRoll) {
    const context = { C:attacker, T:target };
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
