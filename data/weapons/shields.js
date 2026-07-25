
// Shields are classified as weapons because they take up a weapon slot, and their damage data feeds an eventual
// shield bash ability. Unlike armor, a shield's reduction is a small whole-body bonus added to every hit location.
// Profiles are authored at steel quality and scaled by the primary (face) material's absorption, same as armor:
// slash is turned best and crush worst.

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
  reduction: { crush:3, slash:5, pierce:4 },
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
  reduction: { crush:10, slash:15, pierce:13 },
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
  reduction: { crush:15, slash:20, pierce:18 },
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
  reduction: { crush:20, slash:25, pierce:23 },
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
  reduction: { crush:8, slash:11, pierce:10 },
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
  reduction: { crush:12, slash:16, pierce:14 },
  materials: {
    face:  { material:MaterialType.steel, amount:2 },
    frame: { material:MaterialType.wood, amount:2 },
  },
  effort: 5,
  textKey: 'basic-swing',
});
