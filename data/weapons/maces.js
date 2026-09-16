
BaseWeapon.register('hammer', {
  name: 'hammer',
  icon: 'weapons/hammer-02.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [10,50],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: {
    head: { material:MaterialType.steel, amount:1 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 2,
  textKey: 'basic-swing',
});


BaseWeapon.register('mace', {
  name: 'mace',
  icon: 'weapons/mace-01.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [20,100],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('warhammer', {
  name: 'warhammer',
  icon: 'weapons/hammer-04.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [30,150],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});

// TODO: Need an icon with more spikes.
BaseWeapon.register('morning-star', {
  name: 'morning star',
  icon: 'weapons/mace-01.png',
  type: 'mace',
  damageTypes: [
    { type:DamageType.crush, percent:50 },
    { type:DamageType.pierce, percent:50 }
  ],
  damageRange: [50,200],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});

BaseWeapon.register('maul', {
  name: 'maul',
  icon: 'weapons/hammer-03.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [100,500],
  hands: WeaponHandedness.two,
  speed: 2400,
  materials: {
    head: { material:MaterialType.steel, amount:4 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});
