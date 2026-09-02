
Article.register('yeek-gland',{
  name: 'Yeek Venom Gland',
  description: `A venom gland, extracted from a yeek. The small fleshy sack contains a cocktail of highly potent 
    neurotoxins. An alchemist may have a use for such a thing.`,
  category: InventoryCategory.alchemy,
  tags: ['organ'],
  rarity: Rarity.common,

  sources: [
    { monsterGroup:'yeeks', rarity:Rarity.common },
  ],
});
