
BaseWeapon.register('shortbow', {
  nameFunction: (names, materials) => { return materials.wood ? `Shortbow` : `${names[0]} Banded Shortbow`; },
  icon: 'weapons/bow-02.png',
  type: 'bow',
  damageType: DamageType.pierce,
  damageRange: [40,80],
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  speed: 1000,
  materials: { bendy:2 },
  effort: 3,
  textKey: 'shoot',
});

BaseWeapon.register('longbow', {
  nameFunction: (names, materials) => { return materials.wood ? `Longbow` : `${names[0]} Banded Longbow`; },
  icon: 'weapons/bow-02.png',
  type: 'bow',
  damageType: DamageType.pierce,
  damageRange: [60,120],
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  speed: 1300,
  materials: { bendy:3 },
  effort: 4,
  textKey: 'shoot',
});

BaseWeapon.register('recursive-bow', {
  nameFunction: () => { return `Recursive Bow`; },
  icon: 'weapons/bow-01.png',
  type: 'bow',
  damageType: DamageType.pierce,
  damageRange: [70,140],
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  speed: 1200,
  materials: { bendy:3 },
  effort: 5,
  textKey: 'shoot',
});

BaseWeapon.register('crossbow', {
  nameFunction: (names,materials) => { return materials.wood ? `Crossbow` : `${names[0]} Crossbow`; },
  icon: 'weapons/crossbow-01.png',
  type: 'bow',
  damageType: DamageType.pierce,
  damageRange: [80,160],
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  speed: 1600,
  materials: { bendy:3 },
  effort: 6,
  textKey: 'shoot',
});

BaseWeapon.register('arbalest', {
  nameFunction: (names,materials) => { return materials.wood ? `Arbalest` : `${names[0]} Arbalest`; },
  icon: 'weapons/crossbow-01.png',
  type: 'bow',
  damageType: DamageType.pierce,
  damageRange: [100,220],
  hands: WeaponHandedness.two,
  reach: WeaponReach.long,
  speed: 2000,
  materials: { bendy:4 },
  effort: 7,
  textKey: 'shoot',
});
