
// Chest armor carries the most protection of any slot. The reduction profile is authored at steel quality; for the
// padded doublet and the leather-backed cuirass the primary material's absorption scales it down to what the piece
// really turns away. Across all armor, plate turns cuts (slash) best and blunt trauma (crush) worst.

BaseEquipment.register('doublet', {
  icon: 'armor/coat-01.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 40, slash: 60, pierce: 33 },

  effort: 3,
  materials: { pliable:4 },
  nameFunction: names => { return `${names[0]} Doublet`; },
});

BaseEquipment.register('hauberk', {
  icon: 'armor/chest-08.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 18, slash: 30, pierce: 20 },

  effort: 6,
  materials: { hard:6 },
  nameFunction: names => { return `${names[0]} Hauberk` },
});

BaseEquipment.register('cuirass', {
  icon: 'armor/chest-07.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 25, slash: 35, pierce: 30 },

  effort: 5,
  materials: { hard:4, pliable:4 },
  nameFunction: names => { return `${names[0]} Cuirass` },
});

BaseEquipment.register('breastplate', {
  icon: 'armor/chest-04.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 32, slash: 45, pierce: 40 },

  effort: 6,
  materials: { hard:8 },
  nameFunction: names => { return `${names[0]} Breastplate` },
});

BaseEquipment.register('plate', {
  icon: 'armor/chest-03.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 40, slash: 50, pierce: 48 },

  effort: 8,
  materials: { hard:12 },
  nameFunction: names => { return `${names[0]} Plate` },
});
