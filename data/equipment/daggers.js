
// TODO: Rather than scaling with strength, most daggers should only have flat damage. (This would help reduce the
//       insane Poignard damage). Instead a player can have abilities that increase dagger crit range and multipliers,
//       so that overall DPS scales with dex, but it's more random, whereas the strength weapons do more consistent
//       damage without the need for much skill. Swords, because they're the hybrid dex/str weapons will scale with
//       strength (but not as much) and also adjust crit chance and magnitude (though also by not as much)

BaseEquipment.register('knife', {
  nameFunction: names => { return `${names[0]} Knife`; },
  icon: 'weapons/dagger-02.png',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  damageRange: [20,30],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:1 },
  effort: 2,
  textKey: 'quick-stab',
});

BaseEquipment.register('dirk', {
  nameFunction: names => { return `${names[0]} Dirk`; },
  icon: 'weapons/dagger-02.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  damageRange: [40,60],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:1 },
  effort: 3,
  textKey: 'quick-stab',
});

BaseEquipment.register('dagger', {
  nameFunction: names => { return `${names[0]} Dagger`; },
  icon: 'weapons/dagger-02.png',
  type: 'dagger',
  damageTypes: [
    { type:DamageType.slash, percent:60 },
    { type:DamageType.pierce, percent:40 }
  ],
  damageRange: [50,75],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:1 },
  effort: 3,
  textKey: 'quick-stab',
});

BaseEquipment.register('poignard', {
  nameFunction: names => { return `${names[0]} Poignard`; },
  icon: 'weapons/dagger-07.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  damageRange: [70,90],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:2 },
  effort: 4,
  textKey: 'quick-stab',
});

BaseEquipment.register('baselard', {
  nameFunction: names => { return `${names[0]} Baselard`; },
  icon: 'weapons/dagger-05.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  damageRange: [80,100],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:2 },
  effort: 4,
  textKey: 'quick-stab',
});

BaseEquipment.register('stiletto', {
  nameFunction: names => { return `${names[0]} Stiletto`; },
  icon: 'weapons/dagger-07.png',
  type: 'dagger',
  damageType: DamageType.pierce,
  damageRange: [100,120],
  hands: WeaponHandedness.one,
  reach: WeaponReach.short,
  speed: 500,
  materials: { sharp:2 },
  effort: 5,
  textKey: 'quick-stab',
});
