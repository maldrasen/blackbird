Ability.VenomousBite = function(options) {
  const { poisonStrength, poisonDamage, ...remaining } = options;

  Validate.isNumber('VenomousBite.poisonStrength', poisonStrength);
  Validate.isDiceRoll('VenomousBite.poisonDamage', poisonDamage);

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
