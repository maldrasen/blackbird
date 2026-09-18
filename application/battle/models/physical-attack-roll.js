global.PhysicalAttackRoll = function(attacker, target) {
  let ability = null;
  let hitLocation = null;

  let weapon = null;
  let attackSource;
  let check;
  let finalValue;

  function setAbility(model) { ability = model; }
  function getAbility() { return ability; }
  function setHitLocation(location) { hitLocation = location; }

  // The attack source answers for the shape of the attack: its skill, reach, text key, and damage types. For a real
  // weapon that's the weapon's base record.
  function setWeapon(itemId) {
    weapon = Item(itemId);
    attackSource = weapon.getBase();
  }

  // A natural attack profile - a punch, a bite, a claw - stands in for the base record, so the roll doesn't care
  // that no real weapon is involved.
  function setNaturalAttack(profile) {
    weapon = null;
    attackSource = NaturalAttack(profile);
  }

  // An ability that can target any enemy is always long range. Otherwise, the weapon's reach determines the range.
  function isRangedAttack() {
    if (ability && ability.getTargetingMode() === TargetingMode.anyEnemy) { return true; }
    return attackSource.getReach() === WeaponReach.long;
  }

  // A real weapon can carry its own text key over its base record's.
  function getTextKey() {
    return weapon ? weapon.getTextKey() : attackSource.getTextKey();
  }

  // A real weapon's damage range scales with what it was made from, which only the item knows.
  function getDamageRange() {
    return weapon ? weapon.getDamageRange() : attackSource.getDamageRange();
  }

  function getRollMode() {
    const statusEffects = StatusEffects(attacker);
    const poised = statusEffects.hasPoised();
    const blind = statusEffects.hasBlind();
    const offBalance = statusEffects.hasOffBalance();

    if (poised && blind) { return RollMode.normal; }
    if (poised) { return RollMode.advantage; }
    if (blind || offBalance) { return RollMode.disadvantage; }

    return RollMode.normal;
  }

  // TODO: We'll also need to take weapon enchantments that add to the accuracy of the weapon into account as well
  //       which we can get from attack.weapon if the attack is using a real weapon.

  function roll() {
    if (attackSource == null) { throw new Error(`A PhysicalAttackRoll must have an attack source. Call setWeapon() or setNaturalAttack() before roll().`); }
    if (hitLocation == null) { hitLocation = BattleHelper.randomHitLocation(target); }

    check = SkillCheck(attacker, attackSource.getSkill(), getRollMode());
    finalValue = Math.ceil(check.value);

    Console.log(`Attack Roll [${attacker}]`,{ system:'BattleSystem', level:3, data:{ check, finalValue }});
  }

  return {
    setAbility,
    getAbility,

    setHitLocation,
    getHitLocation: () => { return hitLocation; },

    setWeapon,
    setNaturalAttack,
    getWeapon: () => { return weapon; },
    getWeaponId: () => { return weapon ? weapon.getId() : null; },
    getWeaponName: () => { return weapon ? weapon.getName() : null; },
    isRangedAttack,
    getTextKey,
    getDamageRange,
    getDamageTypes: () => { return attackSource.getDamageTypes(); },

    roll,
    getRollValue: () => { return check.value; },
    getRollMode: () => { return check.mode; },
    isCrit: () => { return check.crit === true; },
    isFumble: () => { return check.fumble === true; },
    getFinalValue: () => { return finalValue },
  };
}
