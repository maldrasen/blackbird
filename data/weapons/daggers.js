
BaseWeapon.register('knife', {
  name: 'knife',
  icon: 'weapons/dagger-02.png',
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
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 2,
  textKey: 'quick-stab',
});

BaseWeapon.register('dirk', {
  name: 'dirk',
  icon: 'weapons/dagger-02.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 40,
  high: 60,
  speed: 500,
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 3,
  textKey: 'quick-stab',
});

BaseWeapon.register('dagger', {
  name: 'dagger',
  icon: 'weapons/dagger-02.png',
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
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 3,
  textKey: 'quick-stab',
});

BaseWeapon.register('poignard', {
  name: 'poignard',
  icon: 'weapons/dagger-07.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 70,
  high: 90,
  speed: 500,
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 4,
  textKey: 'quick-stab',
});

BaseWeapon.register('baselard', {
  name: 'baselard',
  icon: 'weapons/dagger-05.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 80,
  high: 100,
  speed: 500,
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 4,
  textKey: 'quick-stab',
});

BaseWeapon.register('stiletto', {
  name: 'stiletto',
  icon: 'weapons/dagger-07.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  low: 100,
  high: 120,
  speed: 500,
  materials: {
    blade: { material:MaterialType.steel, amount:1 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 5,
  textKey: 'quick-stab',
});
