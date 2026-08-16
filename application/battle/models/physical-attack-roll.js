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

  // TODO: We'll need to look at this again once we've added some monsters that only have natural attacks. Because all
  //       weapons are real weapons now, there shouldn't ever be a need for a base weapon that exists without a weapon
  //       component.

  function setWeaponData(data) {
    weaponData = data;
    weapon = (weaponData.id) ? Weapon(weaponData.id) : null;
    baseWeapon = (weapon != null) ? weapon.getBaseWeapon() : BaseWeapon.lookup(weaponData.base);
  }

  // A natural attack profile - a punch, a bite, a claw - stands in for the base weapon, so the roll doesn't care
  // that no real weapon is involved.
  function setNaturalAttack(profile) {
    weaponData = { textKey:profile.textKey };
    baseWeapon = NaturalAttack(profile);
    weapon = null;
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
    if (hitLocation == null) { hitLocation = BattleHelper.randomHitLocation(target); }

    check = SkillCheck(attacker, baseWeapon.getSkill());
    finalValue = Math.ceil(check.value);

    Console.log(`Attack Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{ check, finalValue }});
  }

  return {
    setAbility,
    getAbility,
    getAbilityCode: () => { return abilityCode; },

    setHitLocation,
    getHitLocation: () => { return hitLocation; },

    setWeaponData,
    setNaturalAttack,
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
  };
}
