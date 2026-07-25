global.DamageRoll = function(attacker, attackRoll, defendRoll) {
  const baseWeapon = attackRoll.getBaseWeapon();
  const strength = AttributesComponent.lookup(attacker).strength;
  const attackType = BattleHelper.getRollType(attackRoll);
  const defendType = BattleHelper.getRollType(defendRoll);
  const damageRoll = Random.between(baseWeapon.getLow(), baseWeapon.getHigh());
  const ability = attackRoll.getAbility();
  const damageFactor = (ability == null) ? 1 : ability.getDamageBonus(attacker);
  const damageTypes = {};

  let rawDamage = Math.round((damageRoll / 100) * strength * damageFactor);
  if (attackType === 'crit') { rawDamage = rawDamage*2; }
  if (attackType === 'fumble') { rawDamage = Math.ceil(rawDamage/2); }
  if (defendType === 'crit') { rawDamage = Math.ceil(rawDamage/2); }
  if (defendType === 'fumble') { rawDamage = rawDamage*2; }

  baseWeapon.getDamageTypes().forEach(damageType => {
    damageTypes[damageType.type] = Math.round(rawDamage * (damageType.percent/100));
  });

  // TODO: Consider adding more variety to the crit and fumble messages.

  let message;
  if (attackType === 'crit') {
    if (defendType === 'crit') { throw new Error(`The attack and defend cannot both be crits. This should have been rerolled.`); }
    if (defendType === 'fumble') { message = `Seeing an opening, {A:actingName} strikes {T:targetName} with a decisive blow!`; }
    if (defendType === 'normal') { message = `The attack catches {T:targetName} by surprise!`; }
  }
  if (attackType === 'fumble') {
    if (defendType === 'crit') { message = `{T:TargetName} shrugs off {A:actingName's} clumsy attack.` }
    if (defendType === 'fumble') { message = `{A:ActingName's} attack was clumsy, but {T:targetName} was too distracted to properly defend against it.`; }
    if (defendType === 'normal') { message = `It was only a glancing blow.`; }
  }
  if (attackType === 'normal') {
    if (defendType === 'crit') { message = `{T:TargetName} was almost able to avoid it.` }
    if (defendType === 'fumble') { message = `{T:TargetName} was left wide open!`; }
  }

  return Object.freeze({
    getDamageTypes: () => { return damageTypes },
    hasMessage: () => { return message != null; },
    getMessage: () => { return { text:message }; }
  });
}
