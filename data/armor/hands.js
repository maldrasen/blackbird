
// Hand and forearm armor. Gloves and bracers are leather (their steel-quality profile is scaled down by leather's
// absorption); vambraces and gauntlets are steel.

BaseArmor.register('gloves', {
  name: 'gloves',
  icon: 'armor/hands-02.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 14, slash: 23, pierce: 14 },
  materials: {
    body: { material:MaterialType.leather, amount:2 },
  },
  effort: 2,
});

// TODO: Need an icon for bracers and these are obviously gloves.
BaseArmor.register('bracers', {
  name: 'bracers',
  icon: 'armor/hands-03.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 11, slash: 20, pierce: 17 },
  materials: {
    body: { material:MaterialType.leather, amount:2 },
  },
  effort: 2,
});

// TODO: Could use the same bracers icon, but these are gloves.
BaseArmor.register('vambraces', {
  name: 'vambraces',
  icon: 'armor/hands-03.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 12, slash: 16, pierce: 14 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('gauntlets', {
  name: 'gauntlets',
  icon: 'armor/hands-01.png',
  slot: EquipmentSlot.hands,
  reduction: { crush: 14, slash: 18, pierce: 15 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 4,
});
