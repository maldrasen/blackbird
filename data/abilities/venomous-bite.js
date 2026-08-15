
// TODO: The venom power should eventually come from the base monster's ability definition.
const venomPower = 25;

NaturalAttackAbility.register('venomous-bite', {
  name: 'Venomous Bite',
  essence: 25,
  attack: {
    skill: 'daggers',
    name: 'fangs',
    textKey: 'bite',
    damageType: DamageType.pierce,
    low: 25,
    high: 50,
    speed: 500,
    reach: WeaponReach.short,
  },

  onHit: (acting, target) => { addVenomEffect(target); },
});

// The venom takes hold when the target fails to resist it.
function addVenomEffect(target) {
  const resist = ResistRoll(target, DamageType.nature, venomPower);
  if (resist === ResistResult.fail) {
    BattleSystem.getRound().addMessage({ text:`Venom burns through {T:targetName's} veins.` });
    BattleSystem.addStatus(target, 'poison', { strength:venomPower });
  }
}
