global.LootGenerator = function(type, data) {
  if (['chest','monster'].includes(type) === false) { throw new Error(`Generator type should be chest or monster.`); }

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
