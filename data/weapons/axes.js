
BaseWeapon.register('hatchet', {
  name: 'hatchet',
  icon: 'weapons/axe-06.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 20,
  high: 40,
  speed: 1000,
  materials: {
    head: { material:MaterialType.steel, amount:1 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 2,
  textKey: 'basic-swing',
});

BaseWeapon.register('cleaver', {
  name: 'cleaver',
  icon: 'weapons/cleaver-01.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 30,
  high: 60,
  speed: 1000,
  materials: {
    head: { material:MaterialType.steel, amount:1 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('hand-axe', {
  name: 'hand axe',
  icon: 'weapons/axe-07.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 40,
  high: 80,
  speed: 1000,
  materials: {
    head: { material:MaterialType.steel, amount:1 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

BaseWeapon.register('broad-axe', {
  name: 'broad axe',
  icon: 'weapons/axe-04.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  low: 60,
  high: 120,
  speed: 1200,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

BaseWeapon.register('war-axe', {
  name: 'war axe',
  icon: 'weapons/axe-03.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  low: 80,
  high: 160,
  speed: 1200,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:1 },
  },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Need a better goosewing icon.
BaseWeapon.register('goosewing', {
  name: 'goosewing',
  icon: 'weapons/axe-01.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 200,
  speed: 1800,
  materials: {
    head: { material:MaterialType.steel, amount:2 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 6,
  textKey: 'heavy-axe',
});

BaseWeapon.register('battle-axe', {
  name: 'battle axe',
  icon: 'weapons/axe-02.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 300,
  speed: 1800,
  materials: {
    head: { material:MaterialType.steel, amount:3 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 5,
  textKey: 'heavy-axe',
});

BaseWeapon.register('labrys', {
  name: 'labrys',
  icon: 'weapons/axe-05.png',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 400,
  speed: 2000,
  materials: {
    head: { material:MaterialType.steel, amount:3 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 7,
  textKey: 'heavy-axe',
});
