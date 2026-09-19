
// Head armor. The coif is a mail hood; the rest are helms of increasing coverage. All are metal, so the steel-quality
// profile is only scaled by the metal's absorption.

// TODO: For now we're using the same head armor icon for all the helmet types, though styles like a bascinet,
//       sallet, or armet all have distinct styles. Before devoting too much time to this though, we may eventually
//       have real graphics for all the equipment pieces, so a generic head armor icon is fine.

BaseEquipment.register('coif', {
  nameFunction: names => { return `${names[0]} Coif`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 10, slash: 20, pierce: 14 },
  materials: { hard:2 },
  effort: 3,
});

BaseEquipment.register('helm', {
  nameFunction: names => { return `${names[0]} Helm`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 14, slash: 20, pierce: 16 },
  materials: { hard:2 },
  effort: 3,
});

BaseEquipment.register('bascinet', {
  nameFunction: names => { return `${names[0]} Bascinet`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 16, slash: 24, pierce: 20 },
  materials: { hard:2 },
  effort: 4,
});

BaseEquipment.register('sallet', {
  nameFunction: names => { return `${names[0]} Sallet`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 16, slash: 25, pierce: 21 },
  materials: { hard:3 },
  effort: 4,
});

BaseEquipment.register('armet', {
  nameFunction: names => { return `${names[0]} Armet`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 20, slash: 28, pierce: 24 },
  materials: { hard:3 },
  effort: 5,
});

BaseEquipment.register('heaume', {
  nameFunction: names => { return `${names[0]} Heaume`; },
  icon: 'armor/head-01.png',
  slot: EquipmentSlot.head,
  reduction: { crush: 22, slash: 30, pierce: 26 },
  materials: { hard:4 },
  effort: 5,
});
