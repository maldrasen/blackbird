
Consumable.register('horse-juice',{
  name: `Horse Juice`,
  description: `To get orange juice, one must squeeze the juice out of an orange. Horse juice is harvested in a… 
    similar way.`,
  category: InventoryCategory.mutagen,
  tags: ['manly','juice'],
  rarity: Rarity.unusual,
  usableWhen: UsableWhen.outOfCombat,

  effects:[
    Effect.increasePotency(1),
  ],

  sources: [
    { group:'potions', rarity:Rarity.unusual },
    { group:'equians', rarity:Rarity.common },
  ],
});

Consumable.register('goats-milk',{
  name: `Hoary Goat's Milk`,
  description: `It's disgustingly thick and tastes terrible, but it's age has given it potency.`,
  category: InventoryCategory.mutagen,
  tags: ['manly','milk'],
  rarity: Rarity.unusual,
  usableWhen: UsableWhen.outOfCombat,

  effects:[
    Effect.increasePotency(3),
  ],

  sources: [
    { group:'potions', rarity:Rarity.unusual },
    { group:'capriens', rarity:Rarity.common },
  ],
});

Consumable.register('minotaur-milk',{
  name: `Minotaur's Milk`,
  description: `Given its value as a commodity, many farms have made minotaur milking their sole source of income. The 
    minotaurs themselves are quite happy with the arrangement.`,
  category: InventoryCategory.mutagen,
  tags: ['manly','milk'],
  rarity: Rarity.unusual,
  usableWhen: UsableWhen.outOfCombat,

  effects:[
    Effect.increasePotency(10),
  ],

  sources: [
    { group:'potions', rarity:Rarity.rare },
    { group:'minotaurs', rarity:Rarity.unusual },
  ],
});

Consumable.register('centaur-milk',{
  name: `Centaur's Milk`,
  description: `A centaur's milk is more potent than even a minotaur's, though rarer, given the difficulty of finding 
    a centaur who wants to be milked.`,
  category: InventoryCategory.mutagen,
  tags: ['manly','milk'],
  rarity: Rarity.unusual,
  usableWhen: UsableWhen.outOfCombat,

  effects:[
    Effect.increasePotency(12),
  ],

  sources: [
    { group:'potions', rarity:Rarity.rare },
    { group:'centaurs', rarity:Rarity.unusual },
  ],
});

Consumable.register('milk-of-kindness',{
  name: `The Milk of Human Kindness`,
  description: `This rare milk may have named ironically, given the painful nature of the extraction process.`,
  category: InventoryCategory.mutagen,
  tags: ['milk'],
  rarity: Rarity.unusual,
  usableWhen: UsableWhen.outOfCombat,

  effects:[
    // TODO: Revert most mutations down to a human level baseline.
  ],

  sources: [
    { group:'potions', rarity:Rarity.unusual },
  ],
});
