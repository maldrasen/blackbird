Consumable.register('dungeon-tripe',{
  name: 'Dungeon Tripe',
  description: `A bright orange lichen commonly found growing in patches along amber seams in the dungeon. By feeding
    on the mana rich amber, the tripe absorbs some of dungeon's latent magical energy. Eating it can heal wounds
    though more potent healing items can be made by refining it further.`,
  category: InventoryCategory.restoreHealth,
  tags: ['mushroom'],
  rarity: Rarity.common,

  usableWhen: UsableWhen.outOfCombat,
  onUse: { storyInAlert:true },
  effects: [
    Effect.restoreHealth(5,15),
  ],

  sources: [
    { group:'foods', rarity:Rarity.common },
  ],
});

Consumable.register('rhysh-apple',{
  name: `Rhysh Apple`,
  description: `These small tart apples are sometimes found growing in the dungeon's upper levels.`,
  category: InventoryCategory.restoreHealth,
  tags: ['fruit'],
  rarity: Rarity.common,

  usableWhen: UsableWhen.outOfCombat,
  onUse: { storyInAlert:true },
  effects: [
    Effect.restoreHealth(15,25),
  ],

  sources: [
    { group:'foods', rarity:Rarity.common },
  ],
});
