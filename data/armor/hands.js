
// Hand and forearm armor. Gloves and bracers are leather (their steel-quality profile is scaled down by leather's
// absorption); vambraces and gauntlets are steel.

BaseArmor.register('gloves', {
  name: 'Gloves',
  slots: [EquipmentSlot.hands],
  reduction: { crush: 14, slash: 23, pierce: 14 },
  materials: {
    body: { material:MaterialType.leather, amount:2 },
  },
  effort: 2,
});

BaseArmor.register('bracers', {
  name: 'Bracers',
  slots: [EquipmentSlot.hands],
  reduction: { crush: 11, slash: 20, pierce: 17 },
  materials: {
    body: { material:MaterialType.leather, amount:2 },
  },
  effort: 2,
});

BaseArmor.register('vambraces', {
  name: 'Vambraces',
  slots: [EquipmentSlot.hands],
  reduction: { crush: 12, slash: 16, pierce: 14 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('gauntlets', {
  name: 'Gauntlets',
  slots: [EquipmentSlot.hands],
  reduction: { crush: 14, slash: 18, pierce: 15 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 4,
});
