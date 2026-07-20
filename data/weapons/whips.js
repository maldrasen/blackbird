
BaseWeapon.register('bullwhip', {
  name: 'bullwhip',
  icon: 'weapons/whip-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.long,
  low: 20,
  high: 50,
  speed: 1000,
  materials: {
    cord:   { material:MaterialType.leather, amount:2 },
    handle: { material:MaterialType.wood, amount:1 },
  },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('chain-whip', {
  name: 'chain whip',
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  low: 30,
  high: 70,
  speed: 1100,
  materials: {
    chain:  { material:MaterialType.steel, amount:2 },
    handle: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

// TODO: Need a better sickle and chain
BaseWeapon.register('sickle-and-chain', {
  name: 'sickle and chain',
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  low: 40,
  high: 90,
  speed: 1200,
  materials: {
    blade:  { material:MaterialType.steel, amount:1 },
    chain:  { material:MaterialType.steel, amount:1 },
    handle: { material:MaterialType.wood, amount:1 },
  },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Need a better ball and chain
BaseWeapon.register('ball-and-chain', {
  name: 'ball and chain',
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.crush,
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  low: 40,
  high: 100,
  speed: 1300,
  materials: {
    ball:   { material:MaterialType.steel, amount:2 },
    chain:  { material:MaterialType.steel, amount:1 },
    handle: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});

BaseWeapon.register('flail', {
  name: 'flail',
  icon: 'weapons/flail-01.png',
  type: 'whip',
  damageType: DamageType.crush,
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  low: 35,
  high: 90,
  speed: 1200,
  materials: {
    head:  { material:MaterialType.steel, amount:2 },
    chain: { material:MaterialType.steel, amount:1 },
    haft:  { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'heavy-mace',
});

// TODO: Needs a better icon.
BaseWeapon.register('cat-o-nine-tails', {
  name: "cat o' nine tails",
  icon: 'weapons/whip-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  low: 15,
  high: 45,
  speed: 1000,
  materials: {
    cords:  { material:MaterialType.leather, amount:2 },
    handle: { material:MaterialType.wood, amount:1 },
  },
  effort: 3,
  textKey: 'basic-swing',
});
