global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type) === false) { throw new Error(`Generator type should be chest or monster.`); }

  // Data could be:
  //   Chest data: { theme, level }
  //   Monster data: { id }

  // Dungeon themes and base monsters have maps of loot groups (used to fine tune rarity). Articles that can be
  // dropped have an array of sources with the groups they can appear in as well as their rarity within that group.
  // The drop table collects every source that lands in one of the listed groups, keyed by group.

  // A roll first picks a group from the frequency map. Monster loot groups include the 'nothing' group which has
  // nothing in it, and the special 'extra' group which rolls twice more (hitting extra again keeps rolling). We then
  // roll a rarity and pick an article of that rarity from the group. If the group has nothing at that rarity we step
  // down through the rarities, and if that finds nothing either we step up instead, so a group that only holds rare
  // articles still drops something. Monsters roll once, while treasure chests roll their theme's lootQuantity range.
  // Creatures without loot groups, like the cockroaches, drop no loot.

  // Monsters also have conditional sources. An article with a withWeapon source drops from monsters using that type
  // of weapon, and one with a castsSpells source drops from monsters casting spells of that color. Both land in the
  // 'gear' group, so a monster has to list gear in its loot groups to ever drop them.

  // A monster's adjustLoot function can add an article that it normally wouldn't drop to the drop table. The tosser
  // adds his grenades to the kobold group, so their overall drop rate remains at a 3/13 and a blasto is a common drop
  // when loot is dropped. A different monster could define their groups as { nothing:100, kobold:30, rare:1 }, and add
  // an article to this rare drop group. Even if no articles normally add things to that group, having that group
  // selected in the first step would return whatever is in that group.

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

  // A monster that has unusual equipment will drop that equipment as loot.

  const source = (type === 'monster') ? monsterSource() : chestSource();
  const table = {};

  function monsterSource() {
    const base = Monster(data.id).getBaseMonster();
    return { key:'monsterGroup', groups:base.getLootGroups(), quality:base.getLootQuality(), base };
  }

  function chestSource() {
    const theme = DungeonTheme.lookup(data.theme);
    return { key:'chestGroup', groups:theme.getLootGroups(), quality:theme.getLootQuality(), quantity:theme.getLootQuantity() };
  }

  function buildTable() {
    Article.getAllCodes().forEach(code => {
      (Article.lookup(code).getSources()).forEach(articleSource => {
        const group = groupForSource(articleSource);
        if (group && source.groups[group] != null) {
          addArticle(code, group, articleSource.rarity, articleSource.quantity);
        }
      });
    });

    if (type === 'monster') { source.base.adjustLoot(generator); }
  }

  function groupForSource(articleSource) {
    if (articleSource[source.key] != null) { return articleSource[source.key]; }
    if (type === 'monster') {
      if (articleSource.withWeapon && hasWeaponType(articleSource.withWeapon)) { return 'gear'; }
      if (articleSource.castsSpells && castsColor(articleSource.castsSpells)) { return 'gear'; }
    }
  }

  function hasWeaponType(weaponType) {
    return Object.values(EquipmentComponent.lookup(data.id) || {}).some(itemId => {
      const weapon = WeaponComponent.lookup(itemId);
      return weapon != null && BaseWeapon.lookup(weapon.base).getType() === weaponType;
    });
  }

  function castsColor(color) {
    return Object.values(Monster(data.id).getAbilityMap()).some(ability => {
      return ability.code === 'monster-cast-spell' && Spell.lookup(ability.spell).getColor() === color;
    });
  }

  function addArticle(code, group, rarity=Rarity.common, quantity) {
    const entry = { code, rarity };
    if (quantity) { entry.quantity = [...quantity]; }
    table[group] = [...(table[group] || []), entry];
  }

  function getDropTable() {
    const copy = {};
    Object.keys(table).forEach(group => { copy[group] = table[group].map(entry => ({ ...entry })); });
    return copy;
  }

  function generateLoot() {
    if (Object.keys(source.groups).length === 0) { return []; }

    const entries = [];
    const rolls = (type === 'chest') ? Random.between(...source.quantity) : 1;
    for (let i=0; i<rolls; i++) { rollGroup(entries); }

    return mergeEntries(entries);
  }

  function rollGroup(entries) {
    const group = Random.fromFrequencyMap(source.groups);
    if (group === 'nothing') { return; }
    if (group === 'extra') {
      rollGroup(entries);
      rollGroup(entries);
      return;
    }

    const entry = pickEntry(table[group] || []);
    if (entry) {
      entries.push({ articleCode:entry.code, quantity:(entry.quantity ? Random.between(...entry.quantity) : 1) });
    }
  }

  function pickEntry(candidates) {
    if (candidates.length === 0) { return null; }

    const order = RarityHelper.getOrder();
    const index = RarityHelper.rollRarityIndex();
    const tiers = [];
    for (let tier=index; tier>=0; tier--) { tiers.push(order[tier]); }
    for (let tier=index+1; tier<order.length; tier++) { tiers.push(order[tier]); }

    for (const rarity of tiers) {
      const matches = candidates.filter(entry => entry.rarity === rarity);
      if (matches.length > 0) { return Random.from(matches); }
    }
  }

  function mergeEntries(entries) {
    const merged = {};
    entries.forEach(entry => { merged[entry.articleCode] = (merged[entry.articleCode] || 0) + entry.quantity; });
    return Object.entries(merged).map(([articleCode, quantity]) => ({ articleCode, quantity }));
  }

  const generator = {
    generateLoot,
    addArticle,
    getDropTable,
  };

  buildTable();

  return generator;
}
