
// Weapon data should include { base, id, name, textKey } with everything but the base property being optional as most
// monsters won't be using actual weapons with weapon components.

global.PhysicalAttackRoll = function(attacker, target, weaponData, hitLocation=null) {
  const baseWeapon = BaseWeapon.lookup(weaponData.base);
  const weapon = (weaponData.id) ? Weapon(weaponData.id) : null;
  const attackSkill = baseWeapon.getSkill();

  if (hitLocation== null) {
    hitLocation = BattleHelper.randomHitLocation();
  }

  let textKey = weaponData.textKey;
  if (textKey == null) {
    textKey = (weapon != null) ? weapon.getTextKey() : baseWeapon.getTextKey();
  }

  // TODO: The attack roll will need to take all of the status effects and feats and whatever into consideration
  //       to turn the check value into a final value.

  // TODO: We'll also need to take weapon enchantments that add to the accuracy of the weapon into account as well
  //       which we can get from attack.weapon if the attack is using a real weapon.

  const check = SkillCheck(attacker, attackSkill);
  const finalValue = Math.ceil(check.value);

  Console.log(`Attack Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{ check, finalValue }});

  return Object.freeze({
    getWeaponName: () => { return weaponData.name; },
    getBaseWeapon: () => { return baseWeapon; },
    getBaseWeaponCode: () => { return weaponData.base },
    getWeapon: () => { return weapon; },
    getWeaponId: () => { return weaponData.id || null },
    getHitLocation: () => { return hitLocation; },
    getRollValue: () => { return check.value; },
    isCrit: () => { return check.crit === true; },
    isFumble: () => { return check.fumble === true; },
    getFinalValue: () => { return finalValue },
    getTextKey: () => { return textKey; },
  });

}
