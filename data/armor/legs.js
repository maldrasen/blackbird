
// Leg armor. Leggings and chaps are soft goods (their steel-quality profiles are scaled down by the primary material's
// absorption); greaves, chainmail, and plate-mail are metal.

BaseEquipment.register('leggings', {
  nameFunction: names => { return `${names[0]} Leggings`; },
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 33, slash: 53, pierce: 27 },
  materials: { pliable:4 },
  effort: 2,
});

BaseEquipment.register('chaps', {
  nameFunction: names => { return `${names[0]} Chaps`; },
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 23, slash: 34, pierce: 23 },
  materials: { pliable:4 },
  effort: 3,
});

BaseEquipment.register('greaves', {
  nameFunction: names => { return `${names[0]} Greaves`; },
  icon: 'armor/legs-01.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 14, slash: 18, pierce: 16 },
  materials: { hard:4 },
  effort: 4,
});

// TODO: Need a better chainmail icon.
BaseEquipment.register('chainmail', {
  nameFunction: names => { return `${names[0]} Chainmail`; },
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 16, slash: 28, pierce: 20 },
  materials: { hard:6 },
  effort: 5,
});

// TODO: Need a better plate legs icon.
BaseEquipment.register('plate-mail', {
  nameFunction: names => { return `${names[0]} Plate Mail`; },
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 26, slash: 38, pierce: 34 },
  materials: { hard:10 },
  effort: 6,
});
