
// Shields are all metal-faced for now. The targe, round shield, and kite shield were wood-faced, but no MaterialType
// offers wood to a rigid piece, so their profiles read as steel quality until wood has somewhere to live.

BaseArmor.register('buckler', {
  nameFunction: names => { return `${names[0]} Buckler`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:3, slash:5, pierce:4 },
  materials: { hard:1 },
  effort: 2,
});

BaseArmor.register('targe', {
  nameFunction: names => { return `${names[0]} Targe`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:10, slash:15, pierce:13 },
  materials: { hard:2 },
  effort: 2,
});

BaseArmor.register('round-shield', {
  nameFunction: names => { return `${names[0]} Round Shield`; },
  icon: 'weapons/shield-04.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:15, slash:20, pierce:18 },
  materials: { hard:3 },
  effort: 3,
});

// TODO: Kite shield icon.
BaseArmor.register('kite-shield', {
  nameFunction: names => { return `${names[0]} Kite Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:20, slash:25, pierce:23 },
  materials: { hard:3 },
  effort: 4,
});

BaseArmor.register('heater-shield', {
  nameFunction: names => { return `${names[0]} Heater Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:8, slash:11, pierce:10 },
  materials: { hard:2 },
  effort: 5,
});

// TODO: Tower shield icon.
BaseArmor.register('tower-shield', {
  nameFunction: names => { return `${names[0]} Tower Shield`; },
  icon: 'weapons/shield-01.png',
  type: 'shield',
  slot: EquipmentSlot.secondary,
  reduction: { crush:12, slash:16, pierce:14 },
  materials: { hard:4 },
  effort: 5,
});
