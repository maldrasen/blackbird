
// Hand and forearm armor. Gloves and bracers are soft goods (their steel-quality profile is scaled down by the primary
// material's absorption); vambraces and gauntlets are metal.

BaseEquipment.register('gloves', {
  nameFunction: names => { return `${names[0]} Gloves`; },
  icon: 'armor/hands-02.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 14, slash: 23, pierce: 14 },
  materials: { pliable:2 },
  effort: 2,
});

// TODO: Need an icon for bracers and these are obviously gloves.
BaseEquipment.register('bracers', {
  nameFunction: names => { return `${names[0]} Bracers`; },
  icon: 'armor/hands-03.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 11, slash: 20, pierce: 17 },
  materials: { pliable:2 },
  effort: 2,
});

// TODO: Could use the same bracers icon, but these are gloves.
BaseEquipment.register('vambraces', {
  nameFunction: names => { return `${names[0]} Vambraces`; },
  icon: 'armor/hands-03.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 12, slash: 16, pierce: 14 },
  materials: { hard:2 },
  effort: 3,
});

BaseEquipment.register('gauntlets', {
  nameFunction: names => { return `${names[0]} Gauntlets`; },
  icon: 'armor/hands-01.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 14, slash: 18, pierce: 15 },
  materials: { hard:3 },
  effort: 4,
});
