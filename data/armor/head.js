
// Head armor. The coif is a steel mail hood; the rest are steel helms of increasing coverage. All are steel, so
// their reduction profile is what they actually turn away.

BaseArmor.register('coif', {
  name: 'Coif',
  slots: [EquipmentSlot.head],
  reduction: { crush: 10, slash: 20, pierce: 14 },
  materials: {
    mail: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('helm', {
  name: 'Helm',
  slots: [EquipmentSlot.head],
  reduction: { crush: 14, slash: 20, pierce: 16 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('bascinet', {
  name: 'Bascinet',
  slots: [EquipmentSlot.head],
  reduction: { crush: 16, slash: 24, pierce: 20 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 4,
});

BaseArmor.register('sallet', {
  name: 'Sallet',
  slots: [EquipmentSlot.head],
  reduction: { crush: 16, slash: 25, pierce: 21 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 4,
});

BaseArmor.register('armet', {
  name: 'Armet',
  slots: [EquipmentSlot.head],
  reduction: { crush: 20, slash: 28, pierce: 24 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 5,
});

BaseArmor.register('heaume', {
  name: 'Heaume',
  slots: [EquipmentSlot.head],
  reduction: { crush: 22, slash: 30, pierce: 26 },
  materials: {
    body: { material:MaterialType.steel, amount:4 },
  },
  effort: 5,
});
