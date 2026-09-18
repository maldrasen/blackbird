
BaseEquipment.register('hatchet', {
  nameFunction: names => { return `${names[0]} Hatchet`; },
  icon: 'weapons/axe-06.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [20,40],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: { sharp:1 },
  effort: 2,
  textKey: 'basic-swing',
});

BaseEquipment.register('cleaver', {
  nameFunction: names => { return `${names[0]} Cleaver`; },
  icon: 'weapons/cleaver-01.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [30,60],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: { sharp:1 },
  effort: 3,
  textKey: 'basic-swing',
});

BaseEquipment.register('hand-axe', {
  nameFunction: names => { return `${names[0]} Hand Axe`; },
  icon: 'weapons/axe-07.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [40,80],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: { sharp:2 },
  effort: 4,
  textKey: 'basic-swing',
});

BaseEquipment.register('broad-axe', {
  nameFunction: names => { return `${names[0]} Broad Axe`; },
  icon: 'weapons/axe-04.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [60,120],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: { sharp:3 },
  effort: 4,
  textKey: 'basic-swing',
});

BaseEquipment.register('war-axe', {
  nameFunction: names => { return `${names[0]} War Axe`; },
  icon: 'weapons/axe-03.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [80,160],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: { sharp:4 },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Need a better goosewing icon.
BaseEquipment.register('goosewing', {
  nameFunction: names => { return `${names[0]} Goosewing`; },
  icon: 'weapons/axe-01.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [100,200],
  hands: WeaponHandedness.two,
  speed: 1800,
  materials: { sharp:6 },
  effort: 6,
  textKey: 'heavy-axe',
});

BaseEquipment.register('battle-axe', {
  nameFunction: names => { return `${names[0]} Battle Axe`; },
  icon: 'weapons/axe-02.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [100,300],
  hands: WeaponHandedness.two,
  speed: 1800,
  materials: { sharp:7 },
  effort: 5,
  textKey: 'heavy-axe',
});

BaseEquipment.register('labrys', {
  nameFunction: names => { return `${names[0]} Labrys`; },
  icon: 'weapons/axe-05.png',
  type: 'axe',
  damageType: DamageType.slash,
  damageRange: [100,400],
  hands: WeaponHandedness.two,
  speed: 2000,
  materials: { sharp:8 },
  effort: 7,
  textKey: 'heavy-axe',
});
