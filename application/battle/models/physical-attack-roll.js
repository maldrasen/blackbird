global.PhysicalAttackRoll = function(attacker, target) {
  let weaponData = {};
  let abilityCode = null;
  let hitLocation = null;

  let baseWeapon;
  let weapon;
  let check;
  let finalValue;

  function setAbility(code) { abilityCode = code; }
  function getAbility() { return (abilityCode == null) ? null : Ability.lookup(abilityCode); }
  function setHitLocation(location) { hitLocation = location; }

  // Weapon data should include { base, id, name, textKey } with everything but the base property being optional as
  // some monsters won't be using actual weapons with weapon components.
  function setWeaponData(data) {
    weaponData = data;
    baseWeapon = BaseWeapon.lookup(weaponData.base);
    weapon = (weaponData.id) ? Weapon(weaponData.id) : null;
  }

  // An ability that can target any enemy is always long range. Otherwise, the weapon's reach determines the range.
  function isRangedAttack() {
    if (abilityCode != null && getAbility().getTargetingMode() === TargetingMode.anyEnemy) { return true; }
    return baseWeapon.getReach() === WeaponReach.long;
  }

  function getTextKey() {
    if (weaponData.textKey) { return weaponData.textKey; }
    return (weapon != null) ? weapon.getTextKey() : baseWeapon.getTextKey();
  }

  // TODO: The attack roll will need to take all of the status effects and feats and whatever into consideration
  //       to turn the check value into a final value.

  // TODO: We'll also need to take weapon enchantments that add to the accuracy of the weapon into account as well
  //       which we can get from attack.weapon if the attack is using a real weapon.

  function roll() {
    if (baseWeapon == null) { throw new Error(`A PhysicalAttackRoll must have a base weapon. Call setWeaponData() before roll().`); }
    if (hitLocation == null) { hitLocation = BattleHelper.randomHitLocation(); }

    check = SkillCheck(attacker, baseWeapon.getSkill());
    finalValue = Math.ceil(check.value);

    Console.log(`Attack Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{ check, finalValue }});
  }

  return Object.freeze({
    setAbility,
    getAbility,
    getAbilityCode: () => { return abilityCode; },

    setHitLocation,
    getHitLocation: () => { return hitLocation; },

    setWeaponData,
    getBaseWeapon: () => { return baseWeapon; },
    getWeaponName: () => { return weaponData.name; },
    getBaseWeaponCode: () => { return weaponData.base },
    getWeaponId: () => { return weaponData.id || null },
    getWeapon: () => { return weapon; },
    isRangedAttack,
    getTextKey,

    roll,
    getRollValue: () => { return check.value; },
    isCrit: () => { return check.crit === true; },
    isFumble: () => { return check.fumble === true; },
    getFinalValue: () => { return finalValue },
  });
}
