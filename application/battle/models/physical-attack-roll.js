
// An attack roll is configured with its setters before roll() executes it. Weapon data should include
// { base, id, name, textKey } with everything but the base property being optional as most monsters won't be using
// actual weapons with weapon components. The ability is the code of the ability making the attack, and the hit
// location is rolled randomly when one isn't set.

global.PhysicalAttackRoll = function(attacker, target) {
  let weaponData = {};
  let ability = null;
  let hitLocation = null;

  let baseWeapon;
  let weapon;
  let textKey;
  let check;
  let finalValue;

  function setWeaponData(data) { weaponData = data; }
  function setAbility(code) { ability = (code) ? Ability.lookup(code) : null; }
  function setHitLocation(location) { hitLocation = location; }

  // TODO: The attack roll will need to take all of the status effects and feats and whatever into consideration
  //       to turn the check value into a final value.

  // TODO: We'll also need to take weapon enchantments that add to the accuracy of the weapon into account as well
  //       which we can get from attack.weapon if the attack is using a real weapon.

  function roll() {
    baseWeapon = BaseWeapon.lookup(weaponData.base);
    weapon = (weaponData.id) ? Weapon(weaponData.id) : null;

    if (hitLocation == null) {
      hitLocation = BattleHelper.randomHitLocation();
    }

    textKey = weaponData.textKey;
    if (textKey == null) {
      textKey = (weapon != null) ? weapon.getTextKey() : baseWeapon.getTextKey();
    }

    check = SkillCheck(attacker, baseWeapon.getSkill());
    finalValue = Math.ceil(check.value);

    Console.log(`Attack Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{ check, finalValue }});
  }

  // An ability that can target any enemy attacks at long range no matter what weapon is in hand. When the ability
  // targets within weapon range - or the roll is a plain weapon attack - the weapon's reach decides instead.
  function isRangedAttack() {
    if (ability != null && ability.getTargetingMode() === TargetingMode.anyEnemy) { return true; }
    return baseWeapon.getReach() === WeaponReach.long;
  }

  return Object.freeze({
    setWeaponData,
    setAbility,
    setHitLocation,
    roll,
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
