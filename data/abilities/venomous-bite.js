
NaturalAttackAbility.register('venomous-bite', {
  name: 'Venomous Bite',
  essence: 25,
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

// The venom takes hold when the target fails to resist it.
function addVenomEffect(acting, target) {
  const ability = Monster(acting).getAbility('venomous-bite');
  const strength = ability.poisonStrength;

  if (strength == null) {
    throw `The Ability[venomous-bite] should have a poisonStrength property.`;
  }

  const resist = ResistRoll(target, DamageType.nature, strength);
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`Venom burns through {T:targetName's} veins.` });
    BattleSystem.addStatus(target, 'poison', { strength:strength });
  }
}
