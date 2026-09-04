global.LootGenerator = function() {

  let monsterId;
  let monsterBase;
  let monster;
  let floor;
  let theme;

  const dropTable = {};

  // Options:
  //   - groups: A group map to use instead of the default dungeon map.
  //   - quality: An additional quality factor.
  //   - quantity: An additional quantity factor.
  function generateChestLoot(options={}) {
    floor = DungeonSystem.getDungeonFloor();
    theme = DungeonTheme.lookup(floor.getTheme());

    const quality = theme.getLootQuality() * (options.quality || 1)

    buildDropTable(options.groups || theme.getLootGroups());

    return [];
  }

  function generateMonsterLoot(id) {
    monsterId = id
    monster = Monster(id);
    monsterBase = monster.getBaseMonster();

    const quality = monsterBase.getLootQuality()

    buildDropTable(monsterBase.getLootGroups());
    makeAdjustments();

    return [];
  }

  // =============================
  //    Building the Drop Table
  // =============================

  function buildDropTable(groups) {
    Article.getAllCodes().forEach(code => {
      (Article.lookup(code).getSources()).forEach(source => {
        const group = groupForSource(source);
        if (group && groups[group] != null) {
          addArticle(code, group, source.rarity, source.quantity);
        }
      });
    });
  }

  function groupForSource(source) {
    if (monsterId) {
      if (source.withWeapon && hasWeaponType(source.withWeapon)) { return 'gear'; }
      if (source.castsSpells && castsColor(source.castsSpells)) { return 'gear'; }
    }
    return source.group;
  }

  function hasWeaponType(weaponType) {
    return Object.values(EquipmentComponent.lookup(monsterId) || {}).some(itemId => {
      const weapon = WeaponComponent.lookup(itemId);
      return weapon != null && BaseWeapon.lookup(weapon.base).getType() === weaponType;
    });
  }

  function castsColor(color) {
    return Object.values(monster.getAbilityMap()).some(ability => {
      return ability.code === 'monster-cast-spell' && Spell.lookup(ability.spell).getColor() === color;
    });
  }

  function addArticle(code, group, rarity=Rarity.common, quantity) {
    const entry = { code, rarity };
    if (quantity) { entry.quantity = [...quantity]; }
    dropTable[group] = [...(dropTable[group] || []), entry];
  }

  // A monster can have an array of loot adjustments to adjust the drop table for that base monster. Only adding items
  // is currently implemented, but we may also want to remove an item or adjust an item's rarity or quantity at some
  // point. Adjustments have the form:
  //   { addArticle:code, group:group, rarity:rarity, quantity:[min,max]|null }
  function makeAdjustments() {
    monsterBase.getLootAdjustments().forEach(adjustment => {
      if (adjustment.addArticle) {
        addArticle(adjustment.addArticle, adjustment.group, adjustment.rarity, adjustment.quantity)
      }
    });
  }

  // ===================
  //    Generate Loot
  // ===================


  /*
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
*/
  return {
    generateChestLoot,
    generateMonsterLoot,
    getDropTable: () => { return structuredClone(dropTable); },
  };

};
