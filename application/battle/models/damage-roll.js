
// The rolled damage value is rather complex because we need to divide the base damage into it's damage type
// components so that additional damage from enchantments can be added or so that damage values can be resisted. We
// could also increase damage within this function depending on the attack and defense crit and fumble states.
//   - attacker: Attacker entity id.
//   - baseWeapon: BaseWeapon record
//   - attack: ['crit','fumble','normal'] (We can also pass an attack roll, rather than a string here)
//   - defend: ['crit','fumble','normal'] (We can also pass a defend roll, rather than a string here)

global.DamageRoll = function(attacker, attackRoll, defendRoll, options={}) {
  const baseWeapon = attackRoll.getBaseWeapon();
  const strength = AttributesComponent.lookup(attacker).strength;
  const attackType = BattleHelper.getRollType(attackRoll);
  const defendType = BattleHelper.getRollType(defendRoll);
  const damageRoll = Random.between(baseWeapon.getHigh(), baseWeapon.getLow());
  const damageTypes = {};

  let rawDamage = Math.round((damageRoll / 100) * strength);
  if (options.damageFactor) { rawDamage = rawDamage * options.damageFactor; }
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
    if (defendType === 'fumble') { message = `(SUPER CRIT) Seeing an opening, {A:baseName} struck {D:baseName} a decisive blow!`; }
    if (defendType === 'normal') { message = `(Attack Crit) The attack caught {T:him} by surprise!`; }
  }
  if (attackType === 'fumble') {
    if (defendType === 'crit') { message = `(SUPER DEFEND) {T:baseName} shrugs off {A:his} clumsy attack.` }
    if (defendType === 'fumble') { message = `(EVERYONE SUCKED) {A:baseName's} attack was clumsy, but {T:baseName} was too distracted to properly defend against it.`; }
    if (defendType === 'normal') { message = `(Attack Fumble) It was only a glancing blow.`; }
  }
  if (attackType === 'normal') {
    if (defendType === 'crit') { message = `(Defend Crit) {S/tar}{T:baseName}{/S} was almost able to avoid it.` }
    if (defendType === 'fumble') { message = `(Defend Fumble) {S/tar}{T:baseName}{/S} was left wide open!`; }
  }

  return Object.freeze({
    getDamageTypes: () => { return damageTypes },
    hasMessage: () => { return message != null; },
    getMessage: () => { return { text:message }; }
  });
}
