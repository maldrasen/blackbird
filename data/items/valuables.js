
const churchNote = `While not something that would normally be valuable, the Holy Church pays well for the return of human remains.`;

Article.register('string-of-teeth',{
  name: 'String of Teeth',
  description: `A set of thirty two human teeth worn as a talisman. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  sources: [
    { chestGroup:'valuables', rarity:Rarity.common },
    { monsterGroup:'kobolds', rarity:Rarity.common },
  ],
});

Article.register('grim-totem',{
  name: 'Grim Totem',
  description: `A crude talisman made from human bones and preserved organs. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  sources: [
    { chestGroup:'valuables', rarity:Rarity.common },
    { monsterGroup:'kobolds', rarity:Rarity.common },
  ],
});
