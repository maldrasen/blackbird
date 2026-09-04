global.LootGenerator = function() {

  let monsterId;
  let monsterBase;
  let monster;

  let floor;
  let theme;

  let lootGroups;
  let qualityFactor = 1;
  let quantityFactor = 1;
  let valueRange;

  const dropTable = {};
  const drops = [];

  let used = false;

  // Options:
  //   - groups: A group map to use instead of the default dungeon map.
  //   - quality: An additional quality factor.
  //   - quantity: An additional quantity factor.
  function generateChestLoot(options={}) {
    claim();

    floor = DungeonSystem.getDungeonFloor();
    if (floor == null) { throw new Error(`Chest loot can only be generated on a dungeon floor.`); }

    theme = DungeonTheme.lookup(floor.getTheme());
    lootGroups = options.groups || theme.getLootGroups();
    qualityFactor = theme.getLootQuality() * (options.quality || 1);
    quantityFactor = options.quantity || 1;

    buildDropTable();
    rollValueRange();

    return generateLoot();
  }

  function generateMonsterLoot(id) {
    claim();

    monsterId = id;
    monster = Monster(id);
    monsterBase = monster.getBaseMonster();
    lootGroups = monsterBase.getLootGroups();
    qualityFactor = monsterBase.getLootQuality();

    buildDropTable();
    makeAdjustments();
    rollValueRange();

    return generateLoot();
  }

  // The drop table and the drops accumulate in the generator, so each generator is single use. Generating twice would
  // double up the table and hand back the first generation's drops along with the second.
  function claim() {
    if (used) { throw new Error(`A LootGenerator is single use. Build a new one for each generation.`); }
    used = true;
  }

  // =============================
  //    Building the Drop Table
  // =============================

  function buildDropTable() {
    Article.getAllCodes().forEach(code => {
      (Article.lookup(code).getSources()).forEach(source => {
        const group = groupForSource(source);
        if (group && lootGroups[group] != null) {
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

  function rollValueRange() {
    const max = qualityFactor * ItemConstants.lootValueScale * Math.log(1 + (essenceValue() / ItemConstants.lootEssenceScale));
    const ceiling = max * (Random.between(ItemConstants.lootCeilingLow, 100) / 100);
    valueRange = { floor:ceiling * ItemConstants.lootFloorPercent, ceiling };
  }

  // ===================
  //    Generate Loot
  // ===================

  function generateLoot() {
    if (Object.keys(lootGroups).length > 0) {
      if (floor == null) { rollGroup(); } else {
        const range = theme.getLootQuantity();
        const min = Math.max(1,Math.floor(range[0] * quantityFactor));
        const max = Math.ceil(range[1] * quantityFactor);
        const rolls = Random.between(min,max);
        for (let i=0; i<rolls; i++) { rollGroup(); }
      }
    }

    return mergedDrops();
  }

  function rollGroup() {
    const group = Random.fromFrequencyMap(lootGroups);

    if (group === 'nothing') { return; }
    if (group === 'extra') {
      rollGroup();
      rollGroup();
      return;
    }

    const entry = pickEntry(affordableEntries(dropTable[group] || []));
    if (entry) {
      drops.push({ articleCode:entry.code, quantity:(entry.quantity ? Random.between(...entry.quantity) : 1) });
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

  function affordableEntries(candidates) {
    const affordable = candidates.filter(entry => Article.lookup(entry.code).getValue() <= valueRange.ceiling);
    const inWindow = affordable.filter(entry => Article.lookup(entry.code).getValue() >= valueRange.floor);
    return inWindow.length > 0 ? inWindow : affordable;
  }

  function essenceValue() {
    if (monsterId) { return EssenceSystem.monsterEssenceValue(monsterId); }
    return BattleHelper.getEssenceTarget(floor.getLevel()) * ItemConstants.chestEssencePercent;
  }

  function mergedDrops() {
    const merged = {};
    drops.forEach(drop => { merged[drop.articleCode] = (merged[drop.articleCode] || 0) + drop.quantity; });
    return Object.entries(merged).map(([articleCode, quantity]) => ({ articleCode, quantity }));
  }

  return {
    generateChestLoot,
    generateMonsterLoot,
    getDropTable: () => { return structuredClone(dropTable); },
    getValueRange: () => { return { ...valueRange }; },
  };

};
