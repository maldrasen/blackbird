
// The smaller shields come in leather, wood, and metal builds registered as separate records. Every reduction profile
// is authored at steel quality, so the leather and wood builds are scaled down by their material's absorption.

const buckler = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Buckler` : `${names[0]} Buckler`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:3, slash:5, pierce:4 },
  effort: 2,
}
BaseEquipment.register('leather-buckler', { ...buckler, materials:{ leather:1 }});
BaseEquipment.register('wood-buckler', { ...buckler, materials:{ wood:1 }});
BaseEquipment.register('buckler', { ...buckler, materials: { hard:1 }});

const targe = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Targe` : `${names[0]} Targe`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:10, slash:15, pierce:13 },
  effort: 2,
};
BaseEquipment.register('leather-targe', { ...targe, materials:{ leather:3 }});
BaseEquipment.register('wood-targe', { ...targe, materials:{ wood:3 }});
BaseEquipment.register('targe', { ...targe, materials:{ hard:3 }});

const round = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Round Shield` : `${names[0]} Round Shield`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:15, slash:20, pierce:18 },
  effort: 3,
}
BaseEquipment.register('wood-round-shield', { ...round, materials:{ wood:4 }});
BaseEquipment.register('round-shield', { ...round, materials:{ hard:4 }});

// TODO: Kite shield icon.
const kite = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Kite Shield` : `${names[0]} Kite Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:20, slash:25, pierce:23 },
  effort: 4,
}
BaseEquipment.register('wood-kite-shield', { ...kite, materials: { wood:5 }});
BaseEquipment.register('kite-shield', { ...kite, materials: { hard:5 }});

BaseEquipment.register('heater-shield', {
  nameFunction: names => { return `${names[0]} Heater Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:25, slash:28, pierce:22 },
  materials: { hard:6 },
  effort: 5,
});

// TODO: Tower shield icon.
BaseEquipment.register('tower-shield', {
  nameFunction: names => { return `${names[0]} Tower Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  hands: WeaponHandedness.off,
  reduction: { crush:28, slash:30, pierce:25 },
  materials: { hard:8 },
  effort: 5,
});
