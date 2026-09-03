global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type) === false) { throw new Error(`Generator type should be chest or monster.`); }

  // Data could be:
  //   Chest data: { theme, level }
  //   Monster data: { id }

  // Dungeon themes and base monsters have maps of loot groups (used to fine tune rarity). Articles that can be
  // dropped have an array of sources with the groups they can appear in as well as their rarity within that group.
  // The drop table collects every source that lands in one of the listed groups, keyed by group. Monster loot groups
  // include the 'nothing' group which has nothing in it, and the special 'extra' group which rolls again.

  // Monsters also have conditional sources. An article with a withWeapon source drops from monsters using that type
  // of weapon, and one with a castsSpells source drops from monsters casting spells of that color. Both land in the
  // 'gear' group, so a monster has to list gear in its loot groups to ever drop them.

  // A monster's adjustLoot function can add an article that it normally wouldn't drop to the drop table. The tosser
  // adds his grenades to the kobold group, so their overall drop rate remains at a 3/13 and a blasto is a common drop
  // when loot is dropped. A different monster could define their groups as { nothing:100, kobold:30, rare:1 }, and add
  // an article to this rare drop group. Even if no articles normally add things to that group, having that group
  // selected in the first step would return whatever is in that group.

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

  // A monster that has unusual equipment will drop that equipment as loot.

  const source = (type === 'monster') ? monsterSource() : chestSource();
  const table = {};

  function monsterSource() {
    const base = Monster(data.id).getBaseMonster();
    return { key:'monsterGroup', groups:base.getLootGroups(), quality:base.getLootQuality(), base };
  }

  function chestSource() {
    const theme = DungeonTheme.lookup(data.theme);
    return { key:'chestGroup', groups:theme.getLootGroups(), quality:theme.getLootQuality() };
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

  function generateLoot() {}

  const generator = {
    generateLoot,
    addArticle,
    getDropTable,
  };

  buildTable();

  return generator;
}
