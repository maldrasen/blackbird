global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type)) { throw new Error(`Generator type should be chest or monster.`); }

  // Data could be:
  //   Chest data: { theme, level }
  //   Monster data: { id }

  // Dungeon themes and base monsters have maps of loot groups (used to fine tune rarity). Articles that can be
  // dropped have an array of sources with the groups they can appear in as well as their rarity within that group.

  // Monster loot groups include the 'nothing' group which has nothing in it. When rolling we should first pick the
  // group as a frequency map, then we find all the articles that belong in that group. We then pick rarity, and get
  // an item from that group with the chosen rarity. If there's nothing that matches the picked rarity we need to find
  // something that does. Normally we'd step down through the rarities, until we get something common, but that might
  // not work if a group only has rare items. We should probably plan to step down first, and if that doesn't work,
  // step up through the rarities instead.

  // Monsters also have a special 'extra' group. If we pick the extra group we can roll for two items. (Hitting extra
  // again in the second roll will roll a third time, etc.) Some monsters, like a yeek, couldn't support an extra roll.
  // They can only ever drop a venom gland, and they only have one of them.

  // While monsters generally have a single roll (with multiple defeated monsters rolling after the battle) treasure
  // chests will have a lootQuantity range that will determine how many items are in a chest. They probably won't have
  // an extra group, but there's no reason they couldn't.

  // We also need to filter the items by value so that random items are capped. The maximum value is derived from an
  // essence value. The level can give us an average essence value for an encounter, while a monster can get us an
  // actual essence value. A treasure chest though should have more valuables than an average monster in an encounter,
  // so the chest essence should be some percentage of the average floor encounter average. Chests would be too
  // valuable if we used the full encounter essence value, so the chest essence should probably be something around
  // 30% of the floor's encounter essence.

  // We then take this essence value and use it to determine the maximum value cap. (Probably a logarithmic curve so
  // that value tapers off at higher levels). We randomize this value a bit, lowering it to a percentage of this max
  // possible value. Base monsters and themes could also have a lootQuality factor to move the value of their loot up
  // or down. You'd expect to find better loot in a temple or a crypt than a prison or a sewer. Finally, we generate
  // loot by randomly selecting items that are under this loot ceiling, but also above some percentage of this max.

  // An encounter could potentially generate loot 10 times, one for each monster, though with a smaller value budget
  // for each chance. That sounds correct though. 10 kobolds aren't going to be carrying around one really expensive
  // item. They'll have 10 shitty items.

  // Creatures without loot groups, like the cockroaches, drop no loot.

  // A monster that has unusual equipment will drop that equipment as loot.

  // ---

  // Monsters have an adjustLoot function that can add an article that it normally wouldn't drop to the drop table.
  // I'm assuming we'll go with the "select group -> select rarity -> select item" strategy here, so when adding an
  // article, we need to know what group it belongs in. The tosser adds his grenades to the kobold group, so their
  // overall drop rate remains at a 3/13 and a blasto is a common drop when loot is dropped. A different monster could
  // define their groups as { nothing:100, kobold:30, rare:1 }, and add an article to this rare drop group. Even if no
  // articles normally add things to that group, having that group selected in the first step would return whatever is
  // in that group.
  function addArticle(code, group, rarity) {}

  function generateLoot() {}

  return {
    generateLoot,
    addArticle
  }

}