global.PhysicalAttackRoll = function(attacker, target, abilityCode='basic') {
  const state = BattleSystem.getState();
  const rolls = [];

  // TODO: How do we determine how many attacks per turn there should be? Should be determined by weapon type,
  //       dexterity and skills. I think if a person has two weapons equipped they can attack with both at 75% speed.
  //       For instance: Sword speed is 800, dagger speed is 400. Attacking with one weapon equipped just takes that
  //       amount of time. Attacking with both (600 sword, 300 dagger) takes 900ms
  //
  //       When attacking we see how many attacks they can make in a single 1000ms slot. This only applies to basic
  //       attacks though... Abilities will have their own timing....
  //
  //
  //
  const numberOfAttacks = Random.between(1,3);
  // const hitLocation = BattleHelper.randomHitLocation();



  // SkillCheck(attacker, baseWeapon.getSkill());

  // const attackTextKey = attack.attackText || baseWeapon.getAttackText();
  // const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, attackTextKey, context));

  // A basic attack will have a base weapon at a bare minimum. To give monster attacks different flavors we also can
  // include a weapon 'name' and the 'attackText' attributes. If the name or attackText properties are null then the
  // basic attack will use the default text for the weapon.
  //


  function getPrimaryWeapon() { return primaryWeapon.baseWeapon ? primaryWeapon : null; }
  function getSecondaryWeapon() { return secondaryWeapon.baseWeapon ? secondaryWeapon : null; }

  return Object.freeze({
    getRolls: () => { return rolls; },
    getPrimaryWeapon,
    getSecondaryWeapon,
  });

}