
NaturalAttackAbility.register('beast-bite', {
  name: 'Bite',
  essence: 10,
  attack: {
    skill: 'daggers',
    name: 'teeth',
    textKey: 'bite',
    damageType: DamageType.pierce,
    low: 20,
    high: 40,
    speed: 1000,
    reach: WeaponReach.short,
  },
});
