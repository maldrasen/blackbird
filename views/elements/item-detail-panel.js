global.ItemDetailPanel = function() {
  let panelElement;
  let itemPanel;
  let partySelect;

  // Create and return a panel element;
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

  // TODO: Items and articles will also need a canDrop() function because some items may not be droppable. Quest items
  //       and such.

  function buildDetails(thing, onDrop) {
    const details = X.createElement(`<div class='details'>
      <div class='top'>
        <div class='name'>${thing.getName()}</div>
        <div class='description'>${thing.getDescription()}</div>
        <div class='value'><span class='label'>Value</span></div>
      </div>
      <div class='actions button-row'>
        <a href='#' class='button button-danger drop-button'>Drop</a>
      </div>
    </div>`);

    details.querySelector('.value').appendChild(CurrencyDisplay.build(thing.getValue()));
    details.querySelector('.drop-button').addEventListener('click', onDrop);

    return details;
  }

  function buildArticleDetails(article) {
    const code = article.getCode();
    const details = buildDetails(article, () => {
      const name = article.getNameWithQuantity(Inventory().getArticleQuantity(code));
      confirmDrop(name, () => Inventory().setArticleQuantity(code, 0));
    });

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

  // TODO: Actually use the article, then update this panel, the item panel, and the party select.
  function useArticle(article, characterId) {
    console.log("Use:",article.getName(),"on",Character(characterId).getName());
  }

  // TODO: We'll need to add more sections to the top panel for weapon and armor properties like damage and absorption.
  //       We'll need another section for enchantment details as well. We also need to display rarity somehow as well.

  function buildItemDetails(item) {
    return buildDetails(item, () => {
      confirmDrop(item.getName(), () => Inventory().dropItem(item.getId()));
    });
  }

  // Dropping an item or an article needs to update this and the item panel after the item has been dropped.
  function confirmDrop(name, drop) {
    Confirmation.show({ text:`Drop ${name}?`, onConfirm:() => {
      drop();
      update(null);
      if (itemPanel) { itemPanel.update(); }
    }});
  }

  return {
    build,
    update,
    setPartySelect: select => { partySelect = select; },
    setItemPanel: panel => { itemPanel = panel; },
  }
}
