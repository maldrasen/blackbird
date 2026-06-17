global.PhysicalAttackRoll = function(attacker, target, attack) {
  const state = BattleSystem.getState();
  const hitLocation = BattleHelper.randomHitLocation();
  const baseWeapon = BaseWeapon.lookup(attack.base);
  const check = SkillCheck(attacker, baseWeapon.getSkill());

  console.log("Roll Attack:",attack);
  console.log("   HitLocation:",hitLocation);
  console.log("   Base:",baseWeapon.getName());
  console.log("Check:",check);

  const attackTextKey = attack.textKey || baseWeapon.getAttackText();
  // const attackText = Random.from(Dialog.lookupTemplate(DialogCategory.attackText, attackTextKey, context));





  return Object.freeze({
    getHitLocation: () => { return hitLocation; },
  });

}