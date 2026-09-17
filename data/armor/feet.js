
// Foot armor. Boots and buskins are soft goods (their steel-quality profile is scaled down by the primary material's
// absorption); sabatons and sollerets are metal.

BaseArmor.register('boots', {
  nameFunction: names => { return `${names[0]} Boots`; },
  icon: 'armor/feet-01.png',
  slot: EquipmentSlot.feet,
  reduction: { crush: 11, slash: 20, pierce: 14 },
  materials: { pliable:3 },
  effort: 2,
});

BaseArmor.register('buskins', {
  nameFunction: names => { return `${names[0]} Buskins`; },
  icon: 'armor/feet-02.png',
  slot: EquipmentSlot.feet,
  reduction: { crush: 9, slash: 17, pierce: 11 },
  materials: { pliable:2 },
  effort: 2,
});

BaseArmor.register('sabatons', {
  nameFunction: names => { return `${names[0]} Sabatons`; },
  icon: 'armor/feet-03.png',
  slot: EquipmentSlot.feet,
  reduction: { crush: 12, slash: 16, pierce: 14 },
  materials: { hard:2 },
  effort: 4,
});

BaseArmor.register('sollerets', {
  nameFunction: names => { return `${names[0]} Sollerets`; },
  icon: 'armor/feet-03.png',
  slot: EquipmentSlot.feet,
  reduction: { crush: 13, slash: 17, pierce: 15 },
  materials: { hard:3 },
  effort: 4,
});
