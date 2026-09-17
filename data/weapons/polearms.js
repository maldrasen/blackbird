
BaseEquipment.register('spear', {
  nameFunction: names => { return `${names[0]} Spear`; },
  icon: 'weapons/spear-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [50,100],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1200,
  materials: { pointy:1 },
  effort: 2,
  textKey: 'basic-thrust',
});

BaseEquipment.register('pike', {
  nameFunction: names => { return `${names[0]} Pike`; },
  icon: 'weapons/spear-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [40,90],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: { pointy:1 },
  effort: 2,
  textKey: 'basic-thrust',
});

BaseEquipment.register('halberd', {
  nameFunction: names => { return `${names[0]} Halberd`; },
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
  materials: { sharp:3 },
  effort: 4,
  textKey: 'heavy-axe',
});

BaseEquipment.register('glaive', {
  nameFunction: names => { return `${names[0]} Glaive`; },
  icon: 'weapons/glaive-01.png',
  type: 'polearm',
  damageType: DamageType.slash,
  damageRange: [70,140],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: { sharp:2 },
  effort: 4,
  textKey: 'basic-swing',
});

BaseEquipment.register('scythe', {
  nameFunction: names => { return `${names[0]} Scythe`; },
  icon: 'weapons/scythe-01.png',
  type: 'polearm',
  damageType: DamageType.slash,
  damageRange: [60,130],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1400,
  materials: { sharp:2 },
  effort: 3,
  textKey: 'basic-swing',
});

BaseEquipment.register('trident', {
  nameFunction: names => { return `${names[0]} Trident`; },
  icon: 'weapons/trident-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [55,120],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1300,
  materials: { pointy:2 },
  effort: 3,
  textKey: 'basic-thrust',
});

// TODO: We need an actual ranseur icon.
BaseEquipment.register('ranseur', {
  nameFunction: names => { return `${names[0]} Ranseur`; },
  icon: 'weapons/trident-01.png',
  type: 'polearm',
  damageType: DamageType.pierce,
  damageRange: [60,120],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1300,
  materials: { pointy:2 },
  effort: 3,
  textKey: 'basic-thrust',
});
