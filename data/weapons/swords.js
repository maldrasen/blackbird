
// TODO: We need better sword icons across the board really.

BaseWeapon.register('short-sword', {
  name: 'short sword',
  icon: 'weapons/sword-04.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  low: 30,
  high: 60,
  speed: 800,
  materials: {
    blade: { material:MaterialType.steel, amount:2 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

// TODO: Better cutlass icon.
BaseWeapon.register('cutlass', {
  name: 'cutlass',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  low: 40,
  high: 80,
  speed: 900,
  materials: {
    blade: { material:MaterialType.steel, amount:2 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Better saber icon.
BaseWeapon.register('saber', {
  name: 'saber',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  low: 45,
  high: 90,
  speed: 850,
  materials: {
    blade: { material:MaterialType.steel, amount:2 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 6,
  textKey: 'basic-swing',
});

// TODO: Better scimitar icon. Why do I have no curved sword icons?
BaseWeapon.register('scimitar', {
  name: 'scimitar',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  low: 50,
  high: 100,
  speed: 900,
  materials: {
    blade: { material:MaterialType.steel, amount:3 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 5,
  textKey: 'basic-swing',
});

BaseWeapon.register('rapier', {
  name: 'rapier',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 40,
  high: 90,
  speed: 700,
  materials: {
    blade: { material:MaterialType.steel, amount:3 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 8,
  textKey: 'basic-thrust',
});

BaseWeapon.register('estoc', {
  name: 'estoc',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 55,
  high: 110,
  speed: 900,
  materials: {
    blade: { material:MaterialType.steel, amount:3 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 7,
  textKey: 'basic-thrust',
});

BaseWeapon.register('longsword', {
  name: 'longsword',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 50,
  high: 100,
  speed: 1000,
  materials: {
    blade: { material:MaterialType.steel, amount:3 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('broadsword', {
  name: 'broadsword',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 60,
  high: 130,
  speed: 1100,
  materials: {
    blade: { material:MaterialType.steel, amount:4 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('falchion', {
  name: 'falchion',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 65,
  high: 120,
  speed: 1000,
  materials: {
    blade: { material:MaterialType.steel, amount:3 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('bastard-sword', {
  name: 'bastard sword',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 70,
  high: 150,
  speed: 1300,
  materials: {
    blade: { material:MaterialType.steel, amount:4 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 7,
  textKey: 'basic-swing',
});

BaseWeapon.register('claymore', {
  name: 'claymore',
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  reach: WeaponReach.close,
  low: 100,
  high: 200,
  speed: 1700,
  materials: {
    blade: { material:MaterialType.steel, amount:6 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 8,
  textKey: 'basic-swing',
});
