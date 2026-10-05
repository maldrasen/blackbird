global.ItemDetailPanel = function() {
  let panelElement;
  let itemPanel;
  let partySelect;

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

    if (selected?.characterId) {
      panelElement.appendChild(buildSummary(selected.characterId));
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

    return details;
  }

  function buildProperty(property) {
    return X.createElement(`<li><span class='label'>${property.label}</span><div class='content'>${property.content}</div></li>`);
  }

  function weaponProperties(item) {
    const base = item.getBase();
    const range = item.getDamageRange();

    return [
      { label:'Attack Power', content:`${range.low} – ${range.high} ${damageTypesText(base.getDamageTypes())}` },
      { label:'Attack Time', content:`${base.getSpeed()}` },
      { label:'Hands', content:handsText(base.getHands()) },
      { label:'Range', content:StringHelper.titlecase(base.getReach()) },
    ];
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
    const reduction = [DamageType.crush, DamageType.slash, DamageType.pierce].
      map(type => `<div>${item.getReduction(type)}% ${type}</div>`).join('');

    return [
      { label:'Type', content:(base.isShield() ? 'Whole body' : StringHelper.titlecase(base.getSlot())) },
      { label:'Reduction', content:reduction },
    ];
  }

  function buildSummary(characterId) {
    const summary = X.createElement(`<div class='details summary'>
      <div class='name title'>Equipment Summary</div>
    </div>`);

    summary.appendChild(buildProtection(characterId));

    return summary;
  }

  // The protection table shows the effective reduction at each hit location, the equipment and the character's innate
  // resistance together. A damage type only gets a column when something actually affects it.
  function buildProtection(characterId) {
    const locations = [EquipmentSlot.head, EquipmentSlot.chest, EquipmentSlot.hands, EquipmentSlot.legs, EquipmentSlot.feet];
    const types = Object.values(DamageType).filter(type => {
      return locations.some(location => effectiveReduction(characterId, location, type) !== 0);
    });

    const section = X.createElement(`<div class='section protection'>
      <div class='section-title'>Protection</div>
    </div>`);

    if (types.length === 0) {
      section.appendChild(X.createElement(`<div class='empty'>No protection</div>`));
      return section;
    }

    const headings = types.map(type => `<div class='heading'>${StringHelper.titlecase(type)}</div>`).join('');

    const rows = locations.map(location => {
      const amounts = types.map(type => buildAmount(effectiveReduction(characterId, location, type))).join('');
      return `<div class='label'>${StringHelper.titlecase(location)}</div>${amounts}`;
    }).join('');

    section.appendChild(X.createElement(`<div class='protection-grid' style='--columns:${types.length}'>
      <div></div>${headings}${rows}
    </div>`));

    return section;
  }

  function buildAmount(reduction) {
    if (reduction === 0) { return `<div class='amount none'>0%</div>`; }
    if (reduction < 0) { return `<div class='amount vulnerable'>${reduction}%</div>`; }
    return `<div class='amount'>${reduction}%</div>`;
  }

  // TODO: This mirrors BattleDamageSystem.getReductionPercent(), which can't be used here because it needs a battle
  //       state. Only physical damage is reduced by the armor at the hit location; everything else is reduced by the
  //       innate resistance alone until equipment carries elemental resistances.
  function effectiveReduction(characterId, location, type) {
    const innate = Character(characterId).getResistance(type);
    const isPhysical = [DamageType.crush, DamageType.slash, DamageType.pierce].includes(type);
    const equipped = isPhysical ? EquipmentManager(characterId).getDamageReduction(location, type) : 0;
    return Math.min(equipped + innate, BattleConstants.maxReduction);
  }

  return {
    build,
    update,
    setPartySelect: select => { partySelect = select; },
    setItemPanel: panel => { itemPanel = panel; },
  }
}
