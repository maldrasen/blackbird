
BaseWeapon.register('hatchet', {
  name: 'hatchet',
  icon: 'weapons/axe-06.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [20,40],
  hands: WeaponHandedness.one,
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
  damageRange: [30,60],
  hands: WeaponHandedness.one,
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
  damageRange: [40,80],
  hands: WeaponHandedness.one,
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
  damageRange: [60,120],
  hands: WeaponHandedness.main,
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
  damageRange: [80,160],
  hands: WeaponHandedness.main,
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
  damageRange: [100,200],
  hands: WeaponHandedness.two,
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
  damageRange: [100,300],
  hands: WeaponHandedness.two,
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
  damageRange: [100,400],
  hands: WeaponHandedness.two,
  speed: 2000,
  materials: {
    head: { material:MaterialType.steel, amount:3 },
    haft: { material:MaterialType.wood, amount:2 },
  },
  effort: 7,
  textKey: 'heavy-axe',
});
