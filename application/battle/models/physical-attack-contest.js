global.PhysicalAttackContest = function(attacker, target, weaponData, hitLocation=null) {
  const maxAttempts = 5;

  let attackRoll;
  let defendRoll;

  for (let i=0; i<maxAttempts; i++) {
    attackRoll = PhysicalAttackRoll(attacker, target, weaponData, hitLocation);
    defendRoll = DefendRoll(target, attacker, attackRoll);
    if ((attackRoll.isCrit() && defendRoll.isCrit()) === false) { break; }
  }

  // Extremely rare case when crit is around 3%, but what if there are modifiers that raise the crit chances? There may
  // be future abilities that guarantee a crit when attacking or defending. In this case we negate both crits.
  if (attackRoll.isCrit() && defendRoll.isCrit()) {
    attackRoll = Object.freeze({ ...attackRoll, isCrit:() => false });
    defendRoll = Object.freeze({ ...defendRoll, isCrit:() => false });
  }

  return Object.freeze({
    getAttackRoll: () => { return attackRoll; },
    getDefendRoll: () => { return defendRoll; },
    isHit: (accuracyFactor=1) => { return attackRoll.getFinalValue() * accuracyFactor > defendRoll.getFinalValue(); },
  });
}
