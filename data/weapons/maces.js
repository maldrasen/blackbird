
BaseWeapon.register('hammer', {
  nameFunction: names => { return `${names[0]} Hammer`; },
  icon: 'weapons/hammer-02.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [10,50],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: { hard:1 },
  effort: 2,
  textKey: 'basic-swing',
});

BaseWeapon.register('mace', {
  nameFunction: (names,materials) => {
    if (materials.bone) { return `Skullhead Mace`; }
    if (materials.stone) { return `Stonehead Mace`; }
    return `${names[0]} Mace`;
  },
  icon: 'weapons/mace-01.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [20,100],
  hands: WeaponHandedness.one,
  speed: 1000,
  materials: { heavy:2 },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('warhammer', {
  nameFunction: (names,materials) => {
    if (materials.bone) { return 'Jawbone' }
    if (materials.stone) { return 'Stonehead Warhammer' }
    return `${names[0]} Warhammer`;
  },
  icon: 'weapons/hammer-04.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [30,150],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: { heavy:3 },
  effort: 4,
  textKey: 'heavy-mace',
});

// TODO: Need an icon with more spikes.
BaseWeapon.register('morning-star', {
  nameFunction: names => { return `${names[0]} Morning Star`; },
  icon: 'weapons/mace-01.png',
  type: 'mace',
  damageTypes: [
    { type:DamageType.crush, percent:50 },
    { type:DamageType.pierce, percent:50 }
  ],
  damageRange: [50,200],
  hands: WeaponHandedness.main,
  speed: 1200,
  materials: { hard:4 },
  effort: 4,
  textKey: 'heavy-mace',
});

BaseWeapon.register('maul', {
  nameFunction: names => {
    if (materials.bone) { return 'Oxskull Maul' }
    if (materials.stone) { return 'Boulderhead Maul' }
    return `${names[0]} Maul`;
  },
  icon: 'weapons/hammer-03.png',
  type: 'mace',
  damageType: DamageType.crush,
  damageRange: [100,500],
  hands: WeaponHandedness.two,
  speed: 2400,
  materials: { heavy:5 },
  effort: 4,
  textKey: 'heavy-mace',
});
