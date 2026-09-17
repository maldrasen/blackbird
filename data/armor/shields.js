
// Shields are all metal-faced for now. The targe, round shield, and kite shield were wood-faced, but no MaterialType
// offers wood to a rigid piece, so their profiles read as steel quality until wood has somewhere to live.

const bucker = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Buckler` : `${names[0]} Buckler`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:3, slash:5, pierce:4 },
  effort: 2,
}
BaseArmor.register('leather-buckler', { ...bucker, materials:{ leather:1 }});
BaseArmor.register('wood-buckler', { ...bucker, materials:{ wood:1 }});
BaseArmor.register('buckler', { ...bucker, materials: { hard:1 }});

const targe = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Targe` : `${names[0]} Targe`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:10, slash:15, pierce:13 },
  effort: 2,
};
BaseArmor.register('leather-targe', { ...targe, materials:{ leather:3 }});
BaseArmor.register('wood-targe', { ...targe, materials:{ wood:3 }});
BaseArmor.register('targe', { ...targe, materials:{ hard:3 }});

const round = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Round Shield` : `${names[0]} Round Shield`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:15, slash:20, pierce:18 },
  effort: 3,
}
BaseArmor.register('wood-round-shield', { ...round, materials:{ wood:4 }});
BaseArmor.register('round-shield', { ...round, materials:{ hard:4 }});

// TODO: Kite shield icon.
const kite = {
  nameFunction: (names,materials) => { return materials.wood ? `Wooden Kite Shield` : `${names[0]} Kite Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:20, slash:25, pierce:23 },
  effort: 4,
}
BaseArmor.register('wood-kite-shield', { ...kite, materials: { wood:5 }});
BaseArmor.register('kite-shield', { ...kite, materials: { hard:5 }});

BaseArmor.register('heater-shield', {
  nameFunction: names => { return `${names[0]} Heater Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:25, slash:28, pierce:22 },
  materials: { hard:6 },
  effort: 5,
});

// TODO: Tower shield icon.
BaseArmor.register('tower-shield', {
  nameFunction: names => { return `${names[0]} Tower Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:28, slash:30, pierce:25 },
  materials: { hard:8 },
  effort: 5,
});
