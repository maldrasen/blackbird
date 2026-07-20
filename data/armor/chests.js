
// Chest armor carries the most protection of any slot. The reduction profile is authored at steel quality; for the
// padded doublet and the leather-backed cuirass the primary material's absorption scales it down to what the piece
// really turns away. Across all armor, plate turns cuts (slash) best and blunt trauma (crush) worst.

BaseArmor.register('doublet', {
  name: 'Doublet',
  icon: 'armor/coat-01.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 40, slash: 60, pierce: 33 },
  materials: {
    padding: { material:MaterialType.wool, amount:4 },
  },
  effort: 3,
});

BaseArmor.register('hauberk', {
  name: 'Hauberk',
  icon: 'armor/chest-08.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 18, slash: 30, pierce: 20 },
  materials: {
    mail: { material:MaterialType.steel, amount:6 },
  },
  effort: 6,
});

BaseArmor.register('cuirass', {
  name: 'Cuirass',
  icon: 'armor/chest-07.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 25, slash: 35, pierce: 30 },
  materials: {
    plates:  { material:MaterialType.steel, amount:4 },
    backing: { material:MaterialType.leather, amount:4 },
  },
  effort: 5,
});

BaseArmor.register('breastplate', {
  name: 'Breastplate',
  icon: 'armor/chest-04.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 32, slash: 45, pierce: 40 },
  materials: {
    body: { material:MaterialType.steel, amount:8 },
  },
  effort: 6,
});

BaseArmor.register('plate', {
  name: 'Plate',
  icon: 'armor/chest-03.png',
  slot: EquipmentSlot.chest,
  reduction: { crush: 40, slash: 50, pierce: 48 },
  materials: {
    body: { material:MaterialType.steel, amount:12 },
  },
  effort: 8,
});
