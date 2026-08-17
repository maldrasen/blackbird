global.PhysicalAttackContest = function(attacker, target) {
  const maxAttempts = 5;

  let weaponData = null;
  let naturalAttack = null;
  let abilityCode = null;
  let hitLocation = null;

  let attackRoll;
  let defendRoll;

  function setWeaponData(data) { weaponData = data; }
  function setNaturalAttack(profile) { naturalAttack = profile; }
  function setAbility(code) { abilityCode = code; }
  function setHitLocation(location) { hitLocation = location; }

  function buildAttackRoll() {
    const attack = PhysicalAttackRoll(attacker, target);
    naturalAttack ? attack.setNaturalAttack(naturalAttack) : attack.setWeaponData(weaponData);
    attack.setAbility(abilityCode);
    attack.setHitLocation(hitLocation);
    attack.roll();
    return attack;
  }

  function roll() {
    for (let i=0; i<maxAttempts; i++) {
      attackRoll = buildAttackRoll();
      defendRoll = DefendRoll(target, attacker, attackRoll);
      if ((attackRoll.isCrit() && defendRoll.isCrit()) === false) { break; }
    }

    // Extremely rare case when crit is around 3%, but what if there are modifiers that raise the crit chances? There
    // may be future abilities that guarantee a crit when attacking or defending. In this case we negate both crits.
    if (attackRoll.isCrit() && defendRoll.isCrit()) {
      attackRoll = { ...attackRoll, isCrit:() => false };
      defendRoll = { ...defendRoll, isCrit:() => false };
    }
  }

  function isHit() {
    if (attackRoll == null) { throw new Error(`The contest hasn't been rolled. Call roll() before isHit().`); }

    const ability = attackRoll.getAbility();
    const accuracyFactor = (ability == null) ? 1 : ability.getAccuracyBonus();
    return attackRoll.getFinalValue() * accuracyFactor > defendRoll.getFinalValue();
  }

  return {
    setWeaponData,
    setNaturalAttack,
    setAbility,
    setHitLocation,
    roll,
    getAttackRoll: () => { return attackRoll; },
    getDefendRoll: () => { return defendRoll; },
    isHit,
  };
}
