
const tripePackage = WeaverPackage('consume-tripe');
tripePackage.add(`{A:ActingName} makes a disgusted face as {A:he} forces {A:him}self to eat the leathery, yet slimy...
  "food". Despite the taste, the magic infused lichen does make {A:him} feel a bit better.`);

Consumable.register('dungeon-tripe',{
  name: 'Dungeon Tripe',
  description: `A bright orange lichen commonly found growing in patches along amber seams in the dungeon. By feeding
    on the mana rich amber, the tripe absorbs some of dungeon's latent magical energy. Eating it can heal wounds
    though more potent healing items can be made by refining it further.`,
  category: InventoryCategory.restoreHealth,
  tags: ['mushroom'],
  rarity: Rarity.common,
  usableWhen: UsableWhen.outOfCombat,
  effects: [
    Effect.restoreHealth(5,15),
  ],
  stories: tripePackage,
  sources: [
    { chestGroup:'foods', rarity:Rarity.common },
  ],
});

const applePackage = WeaverPackage('consume-apple');
applePackage.add(`{A:ActingName} bites into the {I.name} with a satisfying crunch. A comfortable warmth spreads though
  {A:his} body as the magic infused fruit starts to heal {A:his} wounds.`);

Consumable.register('rhysh-apple',{
  name: `Rhysh Apple`,
  description: `These small tart apples are sometimes found growing in the dungeon's upper levels.`,
  category: InventoryCategory.restoreHealth,
  tags: ['fruit'],
  rarity: Rarity.common,
  usableWhen: UsableWhen.outOfCombat,
  effects: [
    Effect.restoreHealth(15,25),
  ],
  stories: applePackage,
  sources: [
    { chestGroup:'foods', rarity:Rarity.common },
  ],
});
