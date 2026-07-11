
// Maces are a steel head on a wooden haft. They deal crush damage, which no material improves - a heavier head just
// means a bigger, more expensive lump of steel. Value comes from that head size plus the effort to make it.

BaseWeapon.register('hammer', {
  name: 'hammer',
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.one,
  low: 10,
  high: 50,
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
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.one,
  low: 20,
  high: 100,
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
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.main,
  low: 30,
  high: 150,
  speed: 1200,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});

BaseWeapon.register('morning-star', {
  name: 'morning star',
  type: 'mace',
  damageTypes: [
    { type:DamageType.crush, percent:50 },
    { type:DamageType.pierce, percent:50 }
  ],
  hands: WeaponHandedness.main,
  low: 50,
  high: 200,
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
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.two,
  low: 100,
  high: 500,
  speed: 2400,
  materials: {
    head: { material:MaterialType.steel, amount:4 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});
