
// Leg armor. Leggings are padded wool and chaps are leather (their steel-quality profiles are scaled down by the
// soft material's absorption); greaves, chainmail, and plate-mail are steel.

BaseArmor.register('leggings', {
  name: 'leggings',
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 33, slash: 53, pierce: 27 },
  materials: {
    padding: { material:MaterialType.wool, amount:4 },
  },
  effort: 2,
});

BaseArmor.register('chaps', {
  name: 'chaps',
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 23, slash: 34, pierce: 23 },
  materials: {
    body: { material:MaterialType.leather, amount:4 },
  },
  effort: 3,
});

BaseArmor.register('greaves', {
  name: 'greaves',
  icon: 'armor/legs-01.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 14, slash: 18, pierce: 16 },
  materials: {
    body: { material:MaterialType.steel, amount:4 },
  },
  effort: 4,
});

// TODO: Need a better chainmail icon.
BaseArmor.register('chainmail', {
  name: 'chainmail',
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 16, slash: 28, pierce: 20 },
  materials: {
    mail: { material:MaterialType.steel, amount:6 },
  },
  effort: 5,
});

// TODO: Need a better plate legs icon.
BaseArmor.register('plate-mail', {
  name: 'plate mail',
  icon: 'armor/legs-03.png',
  slot: EquipmentSlot.legs,
  reduction: { crush: 26, slash: 38, pierce: 34 },
  materials: {
    body: { material:MaterialType.steel, amount:10 },
  },
  effort: 6,
});
