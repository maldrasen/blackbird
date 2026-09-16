
BaseWeapon.register('spear', {
  name: 'spear',
  icon: 'weapons/spear-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [50,100],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1200,
  materials: {
    tip:   { material:MaterialType.steel, amount:1 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 2,
  textKey: 'basic-thrust',
});

BaseWeapon.register('pike', {
  name: 'pike',
  icon: 'weapons/spear-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [40,90],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: {
    tip:   { material:MaterialType.steel, amount:1 },
    shaft: { material:MaterialType.wood, amount:3 },
  },
  effort: 2,
  textKey: 'basic-thrust',
});

BaseWeapon.register('halberd', {
  name: 'halberd',
  icon: 'weapons/halberd-01.png',
  type: 'polearm',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  damageRange: [80,160],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1500,
  materials: {
    head:  { material:MaterialType.steel, amount:2 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 4,
  textKey: 'heavy-axe',
});

BaseWeapon.register('glaive', {
  name: 'glaive',
  icon: 'weapons/glaive-01.png',
  type: 'polearm',
  damageType: DamageType.slash,
  damageRange: [70,140],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: {
    head:  { material:MaterialType.steel, amount:2 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

BaseWeapon.register('scythe', {
  name: 'scythe',
  icon: 'weapons/scythe-01.png',
  type: 'polearm',
  damageType: DamageType.slash,
  damageRange: [60,130],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: {
    head:  { material:MaterialType.steel, amount:2 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('trident', {
  name: 'trident',
  icon: 'weapons/trident-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [55,120],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1300,
  materials: {
    head:  { material:MaterialType.steel, amount:2 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 3,
  textKey: 'basic-thrust',
});

// TODO: We need an actual ranseur icon.
BaseWeapon.register('ranseur', {
  name: 'ranseur',
  icon: 'weapons/trident-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [60,120],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1300,
  materials: {
    head:  { material:MaterialType.steel, amount:1 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 3,
  textKey: 'basic-thrust',
});
