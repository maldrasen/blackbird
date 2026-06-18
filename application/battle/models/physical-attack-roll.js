global.PhysicalAttackRoll = function(attacker, target, attack) {
  const hitLocation = BattleHelper.randomHitLocation();
  const baseWeapon = BaseWeapon.lookup(attack.base);
  const check = SkillCheck(attacker, baseWeapon.getSkill());

  // TODO: The attack roll will need to take all of the status effects and feats and whatever into consideration
  //       to turn the check value into a final value. We need to save all the modifiers as they're applied in case
  //       we want to show them in the text panel or in the log at the very least.

  let modifiers = [];
  let finalValue = Math.ceil(check.value);

  return Object.freeze({
    getHitLocation: () => { return hitLocation; },
    getBaseWeapon: () => { return baseWeapon; },
    getRollValue: () => { return check.value; },
    isCrit: () => { return check.crit === true; },
    isFumble: () => { return check.fumble === true; },
    getFinalValue: () => { return finalValue },
    getModifiers: () => { return modifiers },
    getTextKey: () => { return attack.textKey },
    getWeaponName: () => { return attack.name },
  });

}
