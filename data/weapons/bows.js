
// Type should be bow, even for crossbows. Bows are ranged, so they use the long reach and the 'shoot' attack text.
// A bow's damage rides on the tension of its stave (or a crossbow's steel prod), which is the primary part. Bows are
// defined without their arrows - ammunition is a separate item with its own properties, added on top of the bow.

BaseWeapon.register('shortbow', {
  name: 'shortbow',
  type: 'bow',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 40,
  high: 80,
  speed: 1000,
  materials: {
    stave:  { material:MaterialType.wood, amount:2 },
    string: { material:MaterialType.leather, amount:1 },
  },
  effort: 3,
  textKey: 'shoot',
});

BaseWeapon.register('longbow', {
  name: 'longbow',
  type: 'bow',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 60,
  high: 120,
  speed: 1300,
  materials: {
    stave:  { material:MaterialType.wood, amount:3 },
    string: { material:MaterialType.leather, amount:1 },
  },
  effort: 4,
  textKey: 'shoot',
});

BaseWeapon.register('recursive-bow', {
  name: 'recursive bow',
  type: 'bow',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 70,
  high: 140,
  speed: 1200,
  materials: {
    stave:  { material:MaterialType.wood, amount:3 },
    string: { material:MaterialType.leather, amount:1 },
  },
  effort: 5,
  textKey: 'shoot',
});

BaseWeapon.register('crossbow', {
  name: 'crossbow',
  type: 'bow',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 80,
  high: 160,
  speed: 1600,
  materials: {
    prod:   { material:MaterialType.steel, amount:1 },
    stock:  { material:MaterialType.wood, amount:2 },
    string: { material:MaterialType.leather, amount:1 },
  },
  effort: 6,
  textKey: 'shoot',
});

BaseWeapon.register('arbalest', {
  name: 'arbalest',
  type: 'bow',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 100,
  high: 220,
  speed: 2000,
  materials: {
    prod:   { material:MaterialType.steel, amount:2 },
    stock:  { material:MaterialType.wood, amount:2 },
    string: { material:MaterialType.leather, amount:1 },
  },
  effort: 7,
  textKey: 'shoot',
});
