
// TODO: We need better sword icons across the board really.

BaseWeapon.register('short-sword', {
  name: 'short sword',
  icon: 'weapons/sword-04.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [30,60],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
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
  damageRange: [40,80],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
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
  damageRange: [45,90],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
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
  damageRange: [50,100],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
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
  damageRange: [40,90],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [55,110],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [50,100],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [60,130],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [65,120],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [70,150],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
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
  damageRange: [100,200],
  hands: WeaponHandedness.two,
  reach: WeaponReach.close,
  speed: 1700,
  materials: {
    blade: { material:MaterialType.steel, amount:6 },
    grip:  { material:MaterialType.leather, amount:1 },
  },
  effort: 8,
  textKey: 'basic-swing',
});
