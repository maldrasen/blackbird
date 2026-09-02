global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type)) { throw new Error(`Generator type should be chest or monster.`); }

  // TODO, build a table from the source, then generate loot from that table.
  //   Chest data: { theme, level }
  //   Monster data: { id }

  // We first build a table from all the items with a matching source. Dungeon themes and base monsters have maps of
  // loot groups (used to fine tune rarity). Articles that can be dropped have an array of sources with the groups they
  // can appear in as well as their rarity within that group. The loot table is kind of a join table, here with the
  // combined rarity from the source rarity and the group rarity.

  // We also need to filter the items by value so that random items fall within a range, derived somehow from an
  // essence value. The level can give us an average essence value for an encounter, while a monster can get us an
  // actual essence value. An encounter though should have more essence than an average monster in an encounter, so
  // the chest essence should be some percentage of the average floor encounter average, or chests will be too good,
  // but a chest should still be more valuable of a find than an average encounter, so the chest essence should
  // probably be something around 30% maybe of the floor's encounter essence.

  // An encounter could potentially generate loot 10 times, one for each monster, though with a smaller value range
  // for each chance. That sounds correct though.

  // Before any of this can be done though, we need a way to determine the absolute value of an article.

  // data:{ code, rarity }
  function addArticle(data) {}

  function generateLoot() {}

  return {
    generateLoot,
    addArticle
  }

}