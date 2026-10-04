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
    partySelect.hide();

    if (selected && selected.code) {
      const article = Article.lookup(selected.code);
      if (isUsableNow(article)) { partySelect.show(); }
      panelElement.appendChild(buildArticleDetails(article));
    }

    if (selected && selected.id) {
      panelElement.appendChild(buildItemDetails(Item(selected.id)));
    }
  }

  function isUsableNow(article) {
    return [UsableWhen.outOfCombat, UsableWhen.anyTime].includes(article.getUsableWhen());
  }

  function buildDetails(thing) {
    const details = X.createElement(`<div class='details'>
      <div class='name'>${thing.getName()}</div>
      <div class='description'>${thing.getDescription()}</div>
      <div class='value'><span class='label'>Value</span></div>
      <div class='actions button-row'></div>
    </div>`);

    details.querySelector('.value').appendChild(CurrencyDisplay.build(thing.getValue()));

    return details;
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
    return X.createElement(`<li><span class='label'>${property.label}</span><span>${property.text}</span></li>`);
  }

  // The damage range and the absorption both come from the item rather than its base, because they scale with the
  // material the item was made from.
  function weaponProperties(item) {
    const base = item.getBase();
    const range = item.getDamageRange();

    return [
      { label:'Damage', text:`${range.low} – ${range.high} ${damageTypesText(base.getDamageTypes())}` },
      { label:'Speed', text:`${base.getSpeed() / 1000} sec` },
      { label:'Hands', text:handsText(base.getHands()) },
      { label:'Reach', text:StringHelper.titlecase(base.getReach()) },
    ];
  }

  // A weapon with a single damage type doesn't need to show that it does 100% of it.
  function damageTypesText(damageTypes) {
    if (damageTypes.length === 1) { return damageTypes[0].type; }
    return `(${damageTypes.map(entry => `${entry.percent}% ${entry.type}`).join(', ')})`;
  }

  function handsText(hands) {
    switch (hands) {
      case WeaponHandedness.one: return 'Either hand';
      case WeaponHandedness.main: return 'Main hand';
      case WeaponHandedness.off: return 'Off hand';
      case WeaponHandedness.two: return 'Two-handed';
    }
  }

  // A shield's absorption applies to hits anywhere on the body, while armor only protects where it's worn.
  function armorProperties(item) {
    const base = item.getBase();
    const absorption = [DamageType.crush, DamageType.slash, DamageType.pierce].
      map(type => `${item.getReduction(type)}% ${type}`).join(', ');

    return [
      { label:'Absorbs', text:absorption },
      { label:'Protects', text:(base.isShield() ? 'Whole body' : StringHelper.titlecase(base.getSlot())) },
    ];
  }

  return {
    build,
    update,
    setPartySelect: select => { partySelect = select; },
    setItemPanel: panel => { itemPanel = panel; },
  }
}
