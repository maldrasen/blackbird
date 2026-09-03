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

  // The articles are also capped by value. The cap is derived from an essence value: a monster's actual essence
  // value, or for a chest a percentage of the floor's encounter essence target (a chest holding a whole encounter's
  // worth would be far too valuable). The essence is put through a logarithmic curve so that value tapers off at
  // higher levels, multiplied by the source's lootQuality (you'd expect better loot in a temple or a crypt than a
  // prison or a sewer), then randomly lowered to a percentage of that maximum for each generation. Candidates must be
  // under this ceiling and above a floor that's a percentage of it. When nothing sits in that window anything under
  // the ceiling will do, and when everything is over the ceiling the roll drops nothing.

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
    const range = rollValueRange();
    const rolls = (type === 'chest') ? Random.between(...source.quantity) : 1;
    for (let i=0; i<rolls; i++) { rollGroup(entries, range); }

    return mergeEntries(entries);
  }

  function essenceValue() {
    if (type === 'monster') { return EssenceSystem.monsterEssenceValue(data.id); }
    return BattleHelper.getEssenceTarget(data.level) * ItemConstants.chestEssencePercent;
  }

  function rollValueRange() {
    const max = source.quality * ItemConstants.lootValueScale * Math.log(1 + (essenceValue() / ItemConstants.lootEssenceScale));
    const ceiling = max * (Random.between(ItemConstants.lootCeilingLow, 100) / 100);
    return { floor:ceiling * ItemConstants.lootFloorPercent, ceiling };
  }

  function rollGroup(entries, range) {
    const group = Random.fromFrequencyMap(source.groups);
    if (group === 'nothing') { return; }
    if (group === 'extra') {
      rollGroup(entries, range);
      rollGroup(entries, range);
      return;
    }

    const entry = pickEntry(affordableEntries(table[group] || [], range));
    if (entry) {
      entries.push({ articleCode:entry.code, quantity:(entry.quantity ? Random.between(...entry.quantity) : 1) });
    }
  }

  function affordableEntries(candidates, range) {
    const affordable = candidates.filter(entry => Article.lookup(entry.code).getValue() <= range.ceiling);
    const inWindow = affordable.filter(entry => Article.lookup(entry.code).getValue() >= range.floor);
    return inWindow.length > 0 ? inWindow : affordable;
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
    rollValueRange,
    addArticle,
    getDropTable,
  };

  buildTable();

  return generator;
}
