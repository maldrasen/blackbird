global.ItemDetailPanel = function() {
  let panelElement;
  let itemPanel;
  let partySelect;
  let buildActions;
  let characterId;
  let comparisonId;

  function build() {
    panelElement = X.createElement(`<div class='item-detail-panel'></div>`);
    return panelElement;
  }

  // This details panel is used in the inventory overlay and will be used in the character overlay equipment tab. In
  // both cases we know we're out of combat, so non-combat items and items that can be used at any time are usable from
  // this panel.
  function update(selected) {
    X.empty(panelElement);

    if (partySelect) {
      partySelect.hide();
    }

    if (selected?.code) {
      const article = Article.lookup(selected.code);
      if (isUsableNow(article)) { partySelect.show(); }
      panelElement.appendChild(buildArticleDetails(article));
    }

    if (selected?.id) {
      panelElement.appendChild(buildItemDetails(Item(selected.id)));
    }
  }

  function isUsableNow(article) {
    return [UsableWhen.outOfCombat, UsableWhen.anyTime].includes(article.getUsableWhen());
  }

  function buildDetails(thing) {
    const details = X.createElement(`<div class='details'>
      <div class='name'>${nameFor(thing)}</div>
      <div class='description'>${thing.getDescription()}</div>
      <div class='value'><span class='label'>Value</span></div>
      <div class='actions button-row'></div>
    </div>`);

    details.querySelector('.value').appendChild(CurrencyDisplay.build(thing.getValue()));

    return details;
  }

  function nameFor(thing) {
    const nameOptions = (typeof thing.getCode === 'function') ? { articleCode:thing.getCode() } : { itemId:thing.getId() };
    return ItemName({ ...nameOptions, size:'large', showIcon:true }).asString();
  }

  function buildArticleDetails(article) {
    const details = buildDetails(article);

    if (isUsableNow(article)) {
      const useButton = X.createElement(`<a href='#' class='button button-primary use-button'>Use</a>`);
      useButton.addEventListener('click', () => { clickUse(article); });
      details.querySelector('.button-row').appendChild(useButton);
    }

    return details;
  }

  // Using an article with no one selected puts the party select into target mode, and the article is used on
  // whoever gets clicked.
  function clickUse(article) {
    const target = partySelect.getSelected();
    if (target == null) { return partySelect.startTargeting(id => useArticle(article, id)); }
    useArticle(article, target);
  }

  // The article stays selected while there are more of them, so that several can be used in a row.
  function useArticle(article, characterId) {
    const code = article.getCode();

    UsageSystem.useArticle(characterId, code);
    if (GameStateFrame.isVisible()) { GameStateFrame.update(); }
    if (GameSystem.isDungeonMode()) { DungeonControls.refreshHealth(); }

    partySelect.update();

    if (itemPanel) { itemPanel.update(); }
    if (itemPanel && Inventory().getArticleQuantity(code) > 0) { return itemPanel.selectArticle(code); }

    update(null);
  }

  // TODO: We'll need another section for enchantment details. We also need to display rarity somehow as well.

  // TODO: Some items, like a wand, could be usable. We would make a usable item if that item needs to carry data, like
  //       wand charges, or an sword that has an ability that can be activated out of combat.

  function buildItemDetails(item) {
    const details = buildDetails(item);
    const base = item.getBase();
    const properties = X.createElement(`<ul class='properties'></ul>`);

    if (base.isWeapon()) { weaponProperties(item).forEach(property => properties.appendChild(buildProperty(property))); }
    if (base.hasReduction()) { armorProperties(item).forEach(property => properties.appendChild(buildProperty(property))); }

    details.insertBefore(properties, details.querySelector('.value'));

    if (buildActions) {
      buildActions(item).forEach(button => details.querySelector('.button-row').appendChild(button));
    }

    return details;
  }

  function buildProperty(property) {
    return X.createElement(`<li><span class='label'>${property.label}</span><div class='content'>${property.content}</div></li>`);
  }

  // Attack power is the weapon's own range. When the panel knows who would wield it, the damage that character really
  // deals with it is shown as well.
  function weaponProperties(item) {
    const base = item.getBase();
    const range = item.getDamageRange();
    const diffs = compareWeapons(item);

    return [
      ...damageProperty(item, diffs),
      { label:'Attack Power', content:`${rangeText(range, diffs?.attackPower)} ${damageTypesText(base.getDamageTypes())}` },
      { label:'Attack Time', content:`${base.getSpeed()}${diffText(diffs?.speed, { lowerIsBetter:true })}` },
      { label:'Hands', content:handsText(base.getHands()) },
      { label:'Range', content:StringHelper.titlecase(base.getReach()) },
    ];
  }

  function damageProperty(item, diffs) {
    if (characterId == null) { return []; }
    const damage = EquipmentManager(characterId).summarizeWeapon(item.getId());
    return [{ label:'Damage', content:rangeText(damage, diffs) }];
  }

  // The diffs are against the item set with setComparison(), the equipped item when the equipment tab shows a
  // candidate. They need a character, and there are none when the two items aren't the same kind of thing.
  function compareWeapons(item) {
    if (characterId == null || comparisonId == null) { return null; }
    return EquipmentManager(characterId).compareWeapons(item.getId(), comparisonId);
  }

  function compareArmor(item) {
    if (characterId == null || comparisonId == null) { return null; }
    return EquipmentManager(characterId).compareArmor(item.getId(), comparisonId);
  }

  function rangeText(range, diffs) {
    return `${range.low}${diffText(diffs?.low)} – ${range.high}${diffText(diffs?.high)}`;
  }

  // A zero diff is left out so that only the numbers that would change draw the eye.
  function diffText(amount, options={}) {
    if (amount == null || amount === 0) { return ''; }
    const better = options.lowerIsBetter ? (amount < 0) : (amount > 0);
    const sign = (amount > 0) ? '+' : '';
    return `<span class='diff ${better ? 'better' : 'worse'}'>${sign}${amount}</span>`;
  }

  function damageTypesText(damageTypes) {
    if (damageTypes.length === 1) { return damageTypes[0].type; }
    return `(${damageTypes.map(entry => `${entry.percent}% ${entry.type}`).join(', ')})`;
  }

  function handsText(hands) {
    switch (hands) {
      case WeaponHandedness.one: return 'Either Hand';
      case WeaponHandedness.main: return 'Main Hand';
      case WeaponHandedness.off: return 'Off Hand';
      case WeaponHandedness.two: return 'Double Fisted';
    }
  }

  // TODO: Can some armors absorb other damage types, even without an enchantment?
  function armorProperties(item) {
    const base = item.getBase();
    const diffs = compareArmor(item);
    const reduction = [DamageType.crush, DamageType.slash, DamageType.pierce].
      map(type => `<div>${item.getReduction(type)}% ${type}${diffText(diffs?.[type])}</div>`).join('');

    return [
      { label:'Type', content:(base.isShield() ? 'Whole body' : StringHelper.titlecase(base.getSlot())) },
      { label:'Reduction', content:reduction },
    ];
  }

  return {
    build,
    update,
    setPartySelect: select => { partySelect = select; },
    setItemPanel: panel => { itemPanel = panel; },
    setActions: builder => { buildActions = builder; },
    setCharacter: id => { characterId = id; },
    setComparison: id => { comparisonId = id; },
  }
}
