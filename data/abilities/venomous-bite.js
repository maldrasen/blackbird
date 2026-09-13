NaturalAttackAbility.register('venomous-bite', {
  attack: {
    skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    reach: WeaponReach.short,
  },

  cooldown: 2500,
  getEffects: entry => { return [venom(entry)]; },
  messageForEntity: (target, results) => { return results.poison ? `Venom burns through {T:targetName's} veins!` : null; },
});

// The venom takes hold when the target fails to resist it. Strength is how hard the venom is to shrug off, damage is
// what it does once it has, and the poison effect only carries the damage because it can't look back at the bite.
function venom(entry) {
  if (entry.poisonStrength == null) { throw `The Ability[venomous-bite] should have a poisonStrength property.`; }
  if (entry.poisonDamage == null) { throw `The Ability[venomous-bite] should have a poisonDamage property.`; }

  return Effect.poison({ strength:entry.poisonStrength, damage:entry.poisonDamage });
}
