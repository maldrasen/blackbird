Ability.VenomousBite = function(options) {
  const { strength, damage, ...remaining } = options;

  if (strength == null) { throw `Ability.VenomousBite requires a poisonStrength.`; }
  if (damage == null) { throw `Ability.VenomousBite requires a poisonDamage.`; }

  return Ability.NaturalAttack({
    name:'Venomous Bite',
    skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    cooldown: 2500,
    effects: [
      Effect.poison({ strength, damage })
    ],
    messageForEntity: (target, results) => { return results.poison ? `Venom burns through {T:targetName's} veins!` : null; },
    ...remaining
  });
}
