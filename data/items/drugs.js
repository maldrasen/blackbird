
Consumable.register('ale',{
  name: `Ale`,
  description: `A brown earthenware bottle filled with ale of unknown provenance.`,
  category: InventoryCategory.drug,
  tags: ['alcohol'],
  effects:[
    // TODO: Drunk Effect - Getting drunk will need to be a different state from drunk. A single beer shouldn't get
    //       Someone drunk, so we'll need to do somthing like build up a drunk level, and once it passes a certain
    //       threshold they get an actual drunk effect. Drunk could then build to extremely drunk then pass out if more
    //       'alcohol power' is being applied. The Toxic status effect works in a similar way.
  ]
});

Consumable.register('kumis',{
  name: `Kumis`,
  description: `A bottle gourd filled with fermented mare's milk. It's an acquired taste.`,
  category: InventoryCategory.drug,
  tags: ['alcohol'],
  effects:[
    // TODO: About as strong as ale, but may have rare additional effects.
  ]
});

Consumable.register('grog',{
  name: `Grog`,
  description: `A brown earthenware jug filled with a diluted mixture of rum and beer.`,
  category: InventoryCategory.drug,
  tags: ['alcohol'],
  effects:[
    // TODO: I don't know, maybe like 20 proof.
  ]
});

// TODO: Maybe a wine or two.

Consumable.register('absinthe',{
  name: `Absinthe`,
  description: `A bright green spirit made from anise, wormwood, and sweet fennel.`,
  category: InventoryCategory.drug,
  tags: ['alcohol'],
  effects:[
    // TDDO: Drunk: 60 proof, with additional effects. Though it's not really hallucinogenic, we should do something
    //       interesting with it. Maybe it has stronger effects on fae monsters like the nymphs and sylphs.
  ]
});

Consumable.register('rakia',{
  name: `Rakia`,
  description: `A type of sweet brandy made from many of the fruits found growing in the dungeon.`,
  category: InventoryCategory.drug,
  tags: ['alcohol'],
  effects:[
    // TDDO: Drunk: 80 proof
  ]
});

// TODO: A couple strong, >100 proof alcohols.

Consumable.register('powdered-satyrs-horn',{
  name: `Powdered Satyr's Horn`,
  description: `Though the satyrs would tell you otherwise, the Satyr's Horns are mushrooms in the Phallaceae family.
    Dried and powdered, they're often used as alchemical reagents or aphrodisiacs.`,
  category: InventoryCategory.drug,
  tags: ['drug','aphrodisiac','mushroom'],
  effects:[
    // TODO: Lustful status effect
  ]
});
