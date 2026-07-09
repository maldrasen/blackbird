
// type should be shield for all these. Unlike other weapons the associated skill is block (see BaseWeapon.getSkill).
// Shields sit in the off hand and deal only modest crush damage from a bash, which no material improves - their real
// worth is defensive. The primary (face) material is what a metal shield's absorption will key off once armor is in.

BaseWeapon.register('buckler', {
  name: 'buckler',
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

BaseWeapon.register('kite-shield', {
  name: 'kite shield',
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

BaseWeapon.register('tower-shield', {
  name: 'tower shield',
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
