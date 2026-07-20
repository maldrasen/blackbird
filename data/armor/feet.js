
// Foot armor. Boots and buskins are leather (steel-quality profile scaled down by leather's absorption); sabatons
// and sollerets are steel.

BaseArmor.register('boots', {
  name: 'Boots',
  slot: EquipmentSlot.feet,
  reduction: { crush: 11, slash: 20, pierce: 14 },
  materials: {
    body: { material:MaterialType.leather, amount:3 },
  },
  effort: 2,
});

BaseArmor.register('buskins', {
  name: 'Buskins',
  slot: EquipmentSlot.feet,
  reduction: { crush: 9, slash: 17, pierce: 11 },
  materials: {
    body: { material:MaterialType.leather, amount:2 },
  },
  effort: 2,
});

BaseArmor.register('sabatons', {
  name: 'Sabatons',
  slot: EquipmentSlot.feet,
  reduction: { crush: 12, slash: 16, pierce: 14 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 4,
});

BaseArmor.register('sollerets', {
  name: 'Sollerets',
  slot: EquipmentSlot.feet,
  reduction: { crush: 13, slash: 17, pierce: 15 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 4,
});
