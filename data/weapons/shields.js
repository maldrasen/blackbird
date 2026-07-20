
// TODO: Shield damage reduction should apply to the entire body, adding a small amount of reduction to every slot.
//       We need to add reduction to all of these just like the armor has. They're really only classified as weapons
//       because they take up a weapon slot. The shields all have damage data for an eventual shield bash ability,
//       though that hasn't been written yet.

BaseWeapon.register('buckler', {
  name: 'buckler',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 5,
  high: 15,
  speed: 800,
  materials: {
    face: { material:MaterialType.steel, amount:1 },
  },
  effort: 2,
  textKey: 'basic-swing',
});

BaseWeapon.register('targe', {
  name: 'targe',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 8,
  high: 20,
  speed: 900,
  materials: {
    face: { material:MaterialType.wood, amount:2 },
    rim:  { material:MaterialType.iron, amount:1 },
  },
  effort: 2,
  textKey: 'basic-swing',
});

BaseWeapon.register('round-shield', {
  name: 'round shield',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 10,
  high: 25,
  speed: 1000,
  materials: {
    face: { material:MaterialType.wood, amount:3 },
    boss: { material:MaterialType.iron, amount:1 },
  },
  effort: 3,
  textKey: 'basic-swing',
});

// TODO: Kite shield icon.
BaseWeapon.register('kite-shield', {
  name: 'kite shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 12,
  high: 30,
  speed: 1100,
  materials: {
    face: { material:MaterialType.wood, amount:3 },
    rim:  { material:MaterialType.steel, amount:1 },
  },
  effort: 4,
  textKey: 'basic-swing',
});

BaseWeapon.register('heater-shield', {
  name: 'heater shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 12,
  high: 30,
  speed: 1100,
  materials: {
    face: { material:MaterialType.steel, amount:2 },
  },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Tower shield icon.
BaseWeapon.register('tower-shield', {
  name: 'tower shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  damageType: DamageType.crush,
  hands: WeaponHandedness.off,
  reach: WeaponReach.close,
  low: 15,
  high: 40,
  speed: 1300,
  materials: {
    face:  { material:MaterialType.steel, amount:2 },
    frame: { material:MaterialType.wood, amount:2 },
  },
  effort: 5,
  textKey: 'basic-swing',
});
