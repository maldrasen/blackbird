
BaseWeapon.register('knife', {
  name: 'knife',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 20,
  high: 30,
  speed: 500,
  textKey: 'quick-stab',
});

BaseWeapon.register('dirk', {
  name: 'dirk',
  type: 'dagger',
  damageTypes: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 40,
  high: 60,
  speed: 500,
  textKey: 'quick-stab',
});

BaseWeapon.register('dagger', {
  name: 'dagger',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 50,
  high: 75,
  speed: 500,
  textKey: 'quick-stab',
});

BaseWeapon.register('poignard', {
  name: 'poignard',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 70,
  high: 90,
  speed: 500,
  textKey: 'quick-stab',
});

BaseWeapon.register('baselard', {
  name: 'baselard',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 80,
  high: 100,
  speed: 500,
  textKey: 'quick-stab',
});

BaseWeapon.register('stiletto', {
  name: 'stiletto',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 100,
  high: 120,
  speed: 500,
  textKey: 'quick-stab',
});
