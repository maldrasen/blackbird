
const tearPackage = WeaverPackage('consume-tear');
tearPackage.add(`{A:ActingName} swallows the {I.name} whole.`);

Consumable.register('crimson-tear',{
  name: 'Crimson Tear',
  description: `A small hardened droplet of condensed red mana. It feels warm in your hand and throbs softly with some internal heartbeat.`,
  category: InventoryCategory.restoreMana,
  tags: ['tear'],
  usableWhen: UsableWhen.anyTime,
  effects:[
    ConsumableEffect.restoreMana(Mana.red, 5, 15)
  ],
  stories: tearPackage,
});

Consumable.register('aureolin-tear',{
  name: 'Aureolin Tear',
  description: `A small hardened droplet of condensed yellow mana. It could easily be mistaken for gold, if it didn't faintly glow.`,
  category: InventoryCategory.restoreMana,
  tags: ['tear'],
  usableWhen: UsableWhen.anyTime,
  effects:[
    ConsumableEffect.restoreMana(Mana.yellow, 5, 15)
  ],
  stories: tearPackage,
});

Consumable.register('celadon-tear',{
  name: 'Celadon Tear',
  description: `A small hardened droplet of condensed green mana. Its surface is an intricate web of fingerprint like whorls that shift when you're not looking.`,
  category: InventoryCategory.restoreMana,
  tags: ['tear'],
  usableWhen: UsableWhen.anyTime,
  effects:[
    ConsumableEffect.restoreMana(Mana.green, 5, 15)
  ],
  stories: tearPackage,
});

Consumable.register('cerulean-tear',{
  name: 'Cerulean Tear',
  description: `A small hardened droplet of condensed blue mana. It feels almost weightless in your hand, like it could float away if you're not careful with it.`,
  category: InventoryCategory.restoreMana,
  tags: ['tear'],
  usableWhen: UsableWhen.anyTime,
  effects:[
    ConsumableEffect.restoreMana(Mana.blue, 5, 15)
  ],
  stories: tearPackage,
});

Consumable.register('ebony-tear',{
  name: 'Ebony Tear',
  description: `A small hardened droplet of condensed black mana. Its surface is so dark that looking at it is like looking through a hole in reality.`,
  category: InventoryCategory.restoreMana,
  tags: ['tear'],
  usableWhen: UsableWhen.anyTime,
  effects:[
    ConsumableEffect.restoreMana(Mana.blue, 5, 15)
  ],
  stories: tearPackage,
});
