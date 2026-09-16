global.PhysicalAttackContest = function(attacker, target) {
  const maxAttempts = 5;

  let weaponId = null;
  let naturalAttack = null;
  let ability = null;
  let hitLocation = null;

  let attackRoll;
  let defendRoll;

  function setWeapon(itemId) { weaponId = itemId; }
  function setNaturalAttack(profile) { naturalAttack = profile; }
  function setAbility(model) { ability = model; }
  function setHitLocation(location) { hitLocation = location; }

  function buildAttackRoll() {
    const attack = PhysicalAttackRoll(attacker, target);
    naturalAttack ? attack.setNaturalAttack(naturalAttack) : attack.setWeapon(weaponId);
    attack.setAbility(ability);
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

  // The weaver context for describing the strike: who was involved, what was swung at where, and how both rolls went.
  function getContext() {
    if (attackRoll == null) { throw new Error(`The contest hasn't been rolled. Call roll() before getContext().`); }

    return {
      A: attacker,
      T: target,
      hitLocation: attackRoll.getHitLocation(),
      weaponName: attackRoll.getWeaponName(),
      baseWeapon: attackRoll.getBaseWeaponCode(),
      weapon: attackRoll.getWeaponId(),
      attack: BattleHelper.getRollType(attackRoll),
      defend: BattleHelper.getRollType(defendRoll),
    };
  }

  return {
    setWeapon,
    setNaturalAttack,
    setAbility,
    setHitLocation,
    roll,
    getAttackRoll: () => { return attackRoll; },
    getDefendRoll: () => { return defendRoll; },
    getContext,
    isHit,
  };
}
