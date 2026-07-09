
// Swords are a worked steel blade with a leather-wrapped grip. The low/high numbers describe the damage for each
// blade shape at steel quality; the amount of steel a blade needs plus the smith effort to forge and temper it is
// what gives swords a premium over axes or spears of comparable damage.

BaseWeapon.register('short-sword', {
  name: 'short sword',
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

BaseWeapon.register('cutlass', {
  name: 'cutlass',
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

BaseWeapon.register('saber', {
  name: 'saber',
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

BaseWeapon.register('scimitar', {
  name: 'scimitar',
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
