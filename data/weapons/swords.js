
// TODO: We need better sword icons across the board really.

BaseWeapon.register('short-sword', {
  nameFunction: names => { return `${names[0]} Short Sword`; },
  icon: 'weapons/sword-04.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [30,60],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  speed: 800,
  materials: { sharp:2 },
  effort: 4,
  textKey: 'basic-swing',
});

// TODO: Better cutlass icon.
BaseWeapon.register('cutlass', {
  nameFunction: names => { return `${names[0]} Cutlass`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [40,80],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  speed: 900,
  materials: { sharp:2 },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Better saber icon.
BaseWeapon.register('saber', {
  nameFunction: names => { return `${names[0]} Saber`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [45,90],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  speed: 850,
  materials: { sharp:2 },
  effort: 6,
  textKey: 'basic-swing',
});

// TODO: Better scimitar icon. Why do I have no curved sword icons?
BaseWeapon.register('scimitar', {
  nameFunction: names => { return `${names[0]} Scimitar`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [50,100],
  hands: WeaponHandedness.one,
  reach: WeaponReach.close,
  speed: 900,
  materials: { sharp:3 },
  effort: 5,
  textKey: 'basic-swing',
});

BaseWeapon.register('rapier', {
  nameFunction: names => { return `${names[0]} Rapier`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.pierce,
  damageRange: [40,90],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 700,
  materials: { sharp:3 },
  effort: 8,
  textKey: 'basic-thrust',
});

BaseWeapon.register('estoc', {
  nameFunction: names => { return `${names[0]} Estoc`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.pierce,
  damageRange: [55,110],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 900,
  materials: { sharp:3 },
  effort: 7,
  textKey: 'basic-thrust',
});

BaseWeapon.register('longsword', {
  nameFunction: names => { return `${names[0]} Longsword`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [50,100],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1000,
  materials: { sharp:3 },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('broadsword', {
  nameFunction: names => { return `${names[0]} Broadsword`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [60,130],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1100,
  materials: { sharp:4 },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('falchion', {
  nameFunction: names => { return `${names[0]} Falchion`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [65,120],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1000,
  materials: { sharp:3 },
  effort: 6,
  textKey: 'basic-swing',
});

BaseWeapon.register('bastard-sword', {
  nameFunction: names => { return `${names[0]} Bastard Sword`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [70,150],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1300,
  materials: { sharp:4 },
  effort: 7,
  textKey: 'basic-swing',
});

BaseWeapon.register('claymore', {
  nameFunction: names => { return `${names[0]} Claymore`; },
  icon: 'weapons/sword-03.png',
  type: 'sword',
  damageType: DamageType.slash,
  damageRange: [100,200],
  hands: WeaponHandedness.two,
  reach: WeaponReach.close,
  speed: 1700,
  materials: { sharp:6 },
  effort: 8,
  textKey: 'basic-swing',
});
