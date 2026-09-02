global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type)) { throw new Error(`Generator type should be chest or monster.`); }

  // TODO, build a table from the source, then generate loot from that table.
  //   Chest data: { theme, level }
  //   Monster data: { id }

  // We first build a table from all the items with a matching source. Dungeon themes and base monsters have maps of
  // loot groups (used to fine tune rarity). Articles that can be dropped have an array of sources with the groups they
  // can appear in as well as their rarity within that group. The loot table is kind of a join table, here with the
  // combined rarity from the source rarity and the group rarity.

  // >   We may not build an actual table. A monster's loot groups include the 'nothing' group which has nothing in it.
  //     When rolling loot it might work best to first pick the group as a frequency map, then pick rarity, and get an
  //     item from that group with the chosen rarity.

  // We also need to filter the items by value so that random items fall within a range, derived somehow from an
  // essence value. The level can give us an average essence value for an encounter, while a monster can get us an
  // actual essence value. An encounter though should have more essence than an average monster in an encounter, so
  // the chest essence should be some percentage of the average floor encounter average, or chests will be too good,
  // but a chest should still be more valuable of a find than an average encounter, so the chest essence should
  // probably be something around 30% maybe of the floor's encounter essence.

  // >   Rather than a value band though we should probably have a loot budget. We start with the essence, convert the
  //     essence into a value (probably a logarithmic curve to that value tapers off at higher levels). We randomize
  //     the value a bit, probably only lowering it to a percentage of the max possible value. Base monsters and
  //     themes could also have a richness factor to move the value of their loot up or done. Finally, we generate loot
  //     by randomly selecting items from the table (with value below the remaining value budget), and subtracting
  //     their value from the budget.

  // An encounter could potentially generate loot 10 times, one for each monster, though with a smaller value budget
  // for each chance. That sounds correct though. 10 kobolds aren't going to be carrying around one really expensive
  // item. They'll have 10 shitty items.

  // Creatures without loot groups, like the cockroaches, drop no loot.

  // A monster that has unusual equipment will drop that equipment as loot.

  // Before any of this can be done though, we need a way to determine the absolute value of an article.

  function addArticle(code, rarity) {}

  function generateLoot() {}

  return {
    generateLoot,
    addArticle
  }

}