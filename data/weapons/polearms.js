
BaseWeapon.register('spear', {
  name: 'spear',
  icon: 'weapons/spear-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 50,
  high: 100,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  low: 40,
  high: 90,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 80,
  high: 160,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 70,
  high: 140,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 60,
  high: 130,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 55,
  high: 120,
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
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 60,
  high: 120,
  speed: 1300,
  materials: {
    head:  { material:MaterialType.steel, amount:1 },
    shaft: { material:MaterialType.wood, amount:2 },
  },
  effort: 3,
  textKey: 'basic-thrust',
});
