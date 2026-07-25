
// Weapon data should include { base, code, id, name, textKey } with everything but the base property being optional
// as most monsters won't be using actual weapons with weapon components. The code is the ability making the attack.

global.PhysicalAttackRoll = function(attacker, target, weaponData, hitLocation=null) {
  const baseWeapon = BaseWeapon.lookup(weaponData.base);
  const weapon = (weaponData.id) ? Weapon(weaponData.id) : null;
  const ability = (weaponData.code) ? Ability.lookup(weaponData.code) : null;
  const attackSkill = baseWeapon.getSkill();

  // An ability that can target any enemy attacks at long range no matter what weapon is in hand. When the ability
  // targets within weapon range - or the roll is a plain weapon attack - the weapon's reach decides instead.
  function isRangedAttack() {
    if (ability != null && ability.getTargetingMode() === TargetingMode.anyEnemy) { return true; }
    return baseWeapon.getReach() === WeaponReach.long;
  }

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
    getAbility: () => { return ability; },
    isRangedAttack,
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
