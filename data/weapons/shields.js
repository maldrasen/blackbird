
// Shields are classified as weapons because they take up a weapon slot. Unlike armor, a shield's reduction is a small
// whole-body bonus added to every hit location.

BaseWeapon.register('buckler', {
  name: 'buckler',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:3, slash:5, pierce:4 },
  materials: {
    face: { material:MaterialType.steel, amount:1 },
  },
  effort: 2,
});

BaseWeapon.register('targe', {
  name: 'targe',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:10, slash:15, pierce:13 },
  materials: {
    face: { material:MaterialType.wood, amount:2 },
    rim:  { material:MaterialType.iron, amount:1 },
  },
  effort: 2,
});

BaseWeapon.register('round-shield', {
  name: 'round shield',
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:15, slash:20, pierce:18 },
  materials: {
    face: { material:MaterialType.wood, amount:3 },
    boss: { material:MaterialType.iron, amount:1 },
  },
  effort: 3,
});

// TODO: Kite shield icon.
BaseWeapon.register('kite-shield', {
  name: 'kite shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:20, slash:25, pierce:23 },
  materials: {
    face: { material:MaterialType.wood, amount:3 },
    rim:  { material:MaterialType.steel, amount:1 },
  },
  effort: 4,
});

BaseWeapon.register('heater-shield', {
  name: 'heater shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:8, slash:11, pierce:10 },
  materials: {
    face: { material:MaterialType.steel, amount:2 },
  },
  effort: 5,
});

// TODO: Tower shield icon.
BaseWeapon.register('tower-shield', {
  name: 'tower shield',
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:12, slash:16, pierce:14 },
  materials: {
    face:  { material:MaterialType.steel, amount:2 },
    frame: { material:MaterialType.wood, amount:2 },
  },
  effort: 5,
});
