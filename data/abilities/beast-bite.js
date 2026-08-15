
NaturalAttackAbility.register('beast-bite', {
  name: 'Bite',
  essence: 10,
  attack: {
    skill: 'daggers',
    name: 'teeth',
    textKey: 'bite',
    damageType: DamageType.pierce,
    low: 25,
    high: 50,
    speed: 500,
    reach: WeaponReach.short,
  },
});
