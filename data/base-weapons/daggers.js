
BaseWeapon.register('knife', {
  name: 'Knife',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  hands: WeaponHandedness.one,
  low: 20,
  high: 30,
  speed: 500,
  textKey: 'basic-thrust',
});

BaseWeapon.register('dirk', {
  name: 'Dirk',
  type: 'dagger',
  damageTypes: DamageType.pierce,
  hands: WeaponHandedness.one,
  low: 40,
  high: 60,
  speed: 500,
  textKey: 'basic-thrust',
});

BaseWeapon.register('dagger', {
  name: 'Dagger',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  hands: WeaponHandedness.one,
  low: 50,
  high: 75,
  speed: 500,
  textKey: 'basic-thrust',
});

BaseWeapon.register('poignard', {
  name: 'Poignard',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  low: 70,
  high: 90,
  speed: 500,
  textKey: 'basic-thrust',
});

BaseWeapon.register('baselard', {
  name: 'Baselard',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  low: 80,
  high: 100,
  speed: 500,
  textKey: 'basic-thrust',
});

BaseWeapon.register('stiletto', {
  name: 'Stiletto',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  low: 100,
  high: 120,
  speed: 500,
  textKey: 'basic-thrust',
});
