global.InventoryPanel = function(options) {

  let selected;
  let inventoryPanel;
  let characterId;
  let inventoryManager;
  let equipmentManager;

  // I'm anticipating needing inventory panels for non-character inventories. A room like an armory or a container
  // like a chest would have their own inventory. It's also possible that a container would have its own interface,
  // given that the 'verbs' would all be different. There's no equip, there should be a "take all", etc.
  if (options.character) {
    characterId = options.character;
    inventoryManager = InventoryManager(characterId);
    equipmentManager = EquipmentManager(characterId);
  }

  function buildInto(container) {
    X.loadDocument(container,'views/templates/inventory-panel.html');

    inventoryPanel = X.first(container).querySelector('.inventory-panel');
    if (characterId) {
      inventoryPanel.setAttribute('data-character', characterId);
    }

    inventoryPanel.querySelector('.equip-button').addEventListener('click',equipSelected);
    inventoryPanel.querySelector('.use-button').addEventListener('click',useSelected);
    inventoryPanel.querySelector('.drop-button').addEventListener('click',dropSelected);
    inventoryPanel.querySelector('.trade-button').addEventListener('click',toggleTradePanel);

    buildTradePanel();
    update();
  }

  function update() {
    const itemList = inventoryPanel.querySelector('.item-list');
    const items = inventoryManager.listItems();

    X.empty(itemList);
    items.forEach(item => {
      itemList.appendChild(item.articleCode ? buildArticleElement(item) : buildItemElement(item));
    });

    updateTradeTitle()
    updateButtons();
  }

  // The selected row is either an item row (with an itemId) or an article row (with an articleCode).
  function setSelected(row) {
    selected = row;
    updateTradeTitle()
    updateButtons();
  }

  function selectedItemId() {
    return selected ? selected.itemId : null;
  }

  // TODO: We also want to change the text color to represent the rarity of the item, WoW, PoE, etc, style.

  function buildItemElement(item) {
    const itemElement = X.createElement(`<li class='item-row' data-item-id='${item.itemId}'>
      <div class='item-icon'></div>
      <div class='item-name'></div>
    </li>`);

    setRowIcon(itemElement, item);
    itemElement.querySelector('.item-name').textContent = StringHelper.titlecaseName(item.name);
    itemElement.addEventListener('click', clickRowElement(item, itemElement));

    if (item.slot) {
      X.addClass(itemElement,'equipped');
      itemElement.setAttribute('data-slot', item.slot);
    }

    if (selected && selected.itemId === item.itemId) {
      X.addClass(itemElement,'selected');
    }

    return itemElement;
  }

  function buildArticleElement(article) {
    const articleElement = X.createElement(`<li class='item-row article-row' data-article-code='${article.articleCode}'>
      <div class='item-icon'></div>
      <div class='item-name'></div>
      <div class='item-quantity'></div>
    </li>`);

    setRowIcon(articleElement, article);
    articleElement.querySelector('.item-name').textContent = StringHelper.titlecaseName(article.name);
    articleElement.querySelector('.item-quantity').textContent = `×${article.quantity}`;
    articleElement.addEventListener('click', clickRowElement(article, articleElement));

    if (selected && selected.articleCode === article.articleCode) {
      X.addClass(articleElement,'selected');
    }

    return articleElement;
  }

  function setRowIcon(rowElement, row) {
    if (row.icon) {
      rowElement.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${row.icon}`);
    }
  }

  function clickRowElement(row, rowElement) {
    return () => {
      if (X.hasClass(rowElement,`selected`)) {
        X.removeClass(rowElement,`selected`)
        setSelected(null);
      } else {
        X.removeClass(`.item-list .selected`,`selected`);
        X.addClass(rowElement,`selected`);
        setSelected(row);
      }

      updateButtons();
    }
  }

  // === Inventory Button State ===

  function updateButtons() {
    const isEquipped = isSelectionEquipped();

    enabledButton('.equip-button', isEquipped || canEquipSelection());
    enabledButton('.use-button', isSelectionUsable());
    enabledButton('.drop-button', selectedItemId() != null);

    inventoryPanel.querySelector(`.equip-button`).textContent = isEquipped ? 'Unequip' : 'Equip';
  }

  function enabledButton(selector, enabled) {
    enabled ?
      X.removeClass(inventoryPanel.querySelector(selector),'disabled'):
      X.addClass(inventoryPanel.querySelector(selector),'disabled');
  }

  function isSelectionEquipped() {
    return selectedItemId() != null && equipmentManager.getEquippedSlot(selected.itemId) != null;
  }

  function canEquipSelection() {
    return selectedItemId() != null && equipmentManager.getValidSlots(selected.itemId).length > 0;
  }

  // The inventory panel is only reachable outside of battle, so in-combat items can't be used from here.
  function isSelectionUsable() {
    if (selected == null || selected.articleCode == null) { return false; }
    if (selected.type !== ArticleType.consumable) { return false; }

    return [UsableWhen.anyTime, UsableWhen.outOfCombat].includes(selected.usableWhen);
  }

  function getReachableInventories() {
    return InventorySystem.getReachableInventories(characterId);
  }

  function equipSelected() {
    const slots = equipmentManager.getValidSlots(selected.itemId);

    if (isSelectionEquipped()) {
      equipmentManager.unequipItem(selected.itemId);
      return update();
    }

    if (slots.length === 1) {
      equipmentManager.equipItem(selected.itemId, slots[0]);
      return update();
    }

    Select.open({
      anchor: inventoryPanel.querySelector(`.equip-button`),
      items: slots.map(slot => { return { label:StringHelper.titlecase(slot), value:slot } }),
      callback: value => {
        equipmentManager.equipItem(selected.itemId, value);
        update();
      },
    })
  }

  function buildTradePanel() {
    const destinationList = inventoryPanel.querySelector('.destination-list');
    getReachableInventories().forEach(inventory => {
      const destination = X.createElement(`<li class='destination' data-id='${inventory.id}'>${inventory.name}</li>`);
      destination.addEventListener('click', () => { clickDestination(inventory.id); })
      destinationList.appendChild(destination);
    });
  }

  // TODO: Articles can't be traded yet, so an article selection is treated as no selection here.
  function updateTradeTitle() {
    inventoryPanel.querySelector(`.trade-title`).textContent = (selectedItemId() == null) ?
      `Select an item to trade.`:
      `Give ${Item(selected.itemId).getName()} to...`;
  }

  function toggleTradePanel() {
    const frame = inventoryPanel.querySelector('.trade-frame');
    X.hasClass(frame,'hide') ? X.removeClass(frame,'hide') : X.addClass(frame,'hide');
  }

  function clickDestination(inventoryId) {
    if (selectedItemId() != null) {
      InventorySystem.transferItem(selected.itemId, characterId, inventoryId);
      setSelected(null);
      update();
    }
  }

  // TODO: This text will need to differentiate between proper and common names. I could run the text through the
  //       weaver, but then I'd been a different versions for weapons and armor and items. Really need need a version
  //       of getName() that takes a prefix, so that getName('the') becomes "the name" for common names and "name" for
  //       proper names. Then maybe we look at the function loom to see if it can use that function instead. We'll
  //       also need to handle proper armor names at some point..

  function dropSelected() {
    Confirmation.show({
      text: `Drop the ${Item(selected.itemId).getName()}? It will be destroyed`,
      onConfirm: () => {
        inventoryManager.dropItem(selected.itemId);
        selected = null;
        update();
      },
    });
  }

  function useSelected() {
    if (isSelectionUsable() === false) { return; }

    const code = selected.articleCode;
    const response = Consumable.lookup(code).consume(characterId);

    inventoryManager.removeArticle(code, 1);
    if (inventoryManager.getArticleQuantity(code) === 0) { selected = null; }

    CharacterOverviewPanel.fillHealthBars(characterId);
    CharacterOverviewPanel.fillManaBars(characterId);

    ConsumeOverlay.open(response);
    update();
  }

  return {
    buildInto,
    update,
  };
}
