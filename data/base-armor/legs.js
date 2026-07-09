
// Leg armor. Leggings are padded wool and chaps are leather (their steel-quality profiles are scaled down by the
// soft material's absorption); greaves, chainmail, and plate-mail are steel.

BaseArmor.register('leggings', {
  name: 'Leggings',
  slots: [EquipmentSlot.legs],
  reduction: { crush: 33, slash: 53, pierce: 27 },
  materials: {
    padding: { material:MaterialType.wool, amount:4 },
  },
  effort: 2,
});

BaseArmor.register('chaps', {
  name: 'Chaps',
  slots: [EquipmentSlot.legs],
  reduction: { crush: 23, slash: 34, pierce: 23 },
  materials: {
    body: { material:MaterialType.leather, amount:4 },
  },
  effort: 3,
});

BaseArmor.register('greaves', {
  name: 'Greaves',
  slots: [EquipmentSlot.legs],
  reduction: { crush: 14, slash: 18, pierce: 16 },
  materials: {
    body: { material:MaterialType.steel, amount:4 },
  },
  effort: 4,
});

BaseArmor.register('chainmail', {
  name: 'Chainmail',
  slots: [EquipmentSlot.legs],
  reduction: { crush: 16, slash: 28, pierce: 20 },
  materials: {
    mail: { material:MaterialType.steel, amount:6 },
  },
  effort: 5,
});

BaseArmor.register('plate-mail', {
  name: 'Plate Mail',
  slots: [EquipmentSlot.legs],
  reduction: { crush: 26, slash: 38, pierce: 34 },
  materials: {
    body: { material:MaterialType.steel, amount:10 },
  },
  effort: 6,
});
