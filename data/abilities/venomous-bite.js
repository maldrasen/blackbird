
NaturalAttackAbility.register('venomous-bite', {
  name: 'Venomous Bite',
  essence: 75,
  attack: {
    skill: 'daggers',
    name: 'fangs',
    textKey: 'bite',
    damageType: DamageType.pierce,
    low: 10,
    high: 20,
    speed: 1000,
    reach: WeaponReach.short,
    cooldown: 2000,
  },

  onHit: (acting, target) => { addVenomEffect(acting, target); },
});

// The venom takes hold when the target fails to resist it. Strength is how hard the venom is to shrug off, damage is
// what it does once it has, and the poison effect only carries the damage because it can't look back at the bite.
function addVenomEffect(acting, target) {
  const { poisonStrength, poisonDamage } = Monster(acting).getAbility('venomous-bite');

  if (poisonStrength == null) { throw `The Ability[venomous-bite] should have a poisonStrength property.`; }
  if (poisonDamage == null) { throw `The Ability[venomous-bite] should have a poisonDamage property.`; }

  const resist = ResistRoll(target, DamageType.nature, poisonStrength);
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`Venom burns through {T:targetName's} veins!` });
    BattleSystem.addStatus(target, 'poison', { strength:poisonStrength, damage:poisonDamage });
  }
}
