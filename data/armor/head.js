
// Head armor. The coif is a steel mail hood; the rest are steel helms of increasing coverage. All are steel, so
// their reduction profile is what they actually turn away.

// TODO: For now we're using the same head armor icon for all the helmet types, though styles like a bascinet,
//       sallet, or armet all have distinct styles. Before devoting too much time to this though, we may eventually
//       have real graphics for all the equipment pieces, so a generic head armor icon is fine.

BaseArmor.register('coif', {
  name: 'coif',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 10, slash: 20, pierce: 14 },
  materials: {
    mail: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('helm', {
  name: 'helm',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 14, slash: 20, pierce: 16 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 3,
});

BaseArmor.register('bascinet', {
  name: 'bascinet',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 16, slash: 24, pierce: 20 },
  materials: {
    body: { material:MaterialType.steel, amount:2 },
  },
  effort: 4,
});

BaseArmor.register('sallet', {
  name: 'sallet',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 16, slash: 25, pierce: 21 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 4,
});

BaseArmor.register('armet', {
  name: 'armet',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 20, slash: 28, pierce: 24 },
  materials: {
    body: { material:MaterialType.steel, amount:3 },
  },
  effort: 5,
});

BaseArmor.register('heaume', {
  name: 'heaume',
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 22, slash: 30, pierce: 26 },
  materials: {
    body: { material:MaterialType.steel, amount:4 },
  },
  effort: 5,
});
