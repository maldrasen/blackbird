
Consumable.register('blasto',{
  name: 'Blasto',
  description: `These loosely stitched hide bags are covered with a pungent, flammable grease and filled with dried
    puffball mushrooms. First lit aflame then quickly tossed in an opponent's general direction, they burst open on
    impact releasing a cloud of explosive spores.`,
  category: InventoryCategory.grenades,
  tags: ['mushroom'],
  target: 'position',    //                                               []        [][][]
  areaOfEffect: 'small', // 1 center position + 3 neighbor positions.   [][][]  or    []
  effects: [
    // TODO: Damage, Blind and Stun effect against targets in area.
  ],
});
