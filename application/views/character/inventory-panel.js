global.InventoryPanel = function(options) {

  let selected;
  let inventoryPanel;
  let itemScrollingPanel;
  let tradeScrollingPanel;
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
    X.loadDocument(container,'views/inventory-panel.html');

    inventoryPanel = X.first(container).querySelector('.inventory-panel');
    if (characterId) {
      inventoryPanel.setAttribute('data-character', characterId);
    }

    inventoryPanel.querySelector('.equip-button').addEventListener('click',equipSelected);
    inventoryPanel.querySelector('.use-button').addEventListener('click',useSelected);
    inventoryPanel.querySelector('.drop-button').addEventListener('click',dropSelected);
    inventoryPanel.querySelector('.trade-button').addEventListener('click',toggleTradePanel);

    itemScrollingPanel = ScrollingPanel({ element:inventoryPanel.querySelector('.item-list') });
    tradeScrollingPanel = ScrollingPanel({ element:inventoryPanel.querySelector('.destination-list') });

    buildTradePanel();
    update();
  }

  function update() {
    const itemList = inventoryPanel.querySelector('.item-list');
    const items = inventoryManager.listItems();

    X.empty(itemList);
    items.forEach(item => {
      itemList.appendChild(buildItemElement(item));
    });

    updateTradeTitle()
    updateButtons();
    resize();
  }

  function setSelected(id) {
    selected = id;
    updateTradeTitle()
    updateButtons();
  }

  function resize() {
    setTimeout(() => {
      itemScrollingPanel.resize();
      tradeScrollingPanel.resize();
    },0);
  }

  // TODO: We also want to change the text color to represent the rarity of the item, WoW, PoE, etc, style.
  function buildItemElement(item) {
    const itemElement = X.createElement(`<li class='item-row' data-item-id='${item.itemId}'>
      <div class='item-icon'></div>
      <div class='item-name'></div>
    </li>`);

    itemElement.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${item.icon}`);
    itemElement.querySelector('.item-name').textContent = item.name;
    itemElement.addEventListener('click', clickItemElement(item, itemElement));

    if (item.slot) {
      X.addClass(itemElement,'equipped');
      itemElement.setAttribute('data-slot', item.slot);
    }

    if (item.itemId === selected) {
      X.addClass(itemElement,'selected');
    }

    return itemElement;
  }

  function clickItemElement(item, itemElement) {
    return () => {
      if (X.hasClass(itemElement,`selected`)) {
        X.removeClass(itemElement,`selected`)
        setSelected(null);
      } else {
        X.removeClass(`.item-list .selected`,`selected`);
        X.addClass(itemElement,`selected`);
        setSelected(item.itemId);
      }

      // Chooser should close itself on mouseout.
      // closeSlotPicker();
      // hideTradePanel();

      updateButtons();
    }
  }

  // === Inventory Button State ===

  function updateButtons() {
    const isEquipped = isSelectionEquipped();

    enabledButton('.equip-button', isEquipped || canEquipSelection());
    enabledButton('.use-button', false);
    enabledButton('.drop-button', selected != null);

    inventoryPanel.querySelector(`.equip-button`).textContent = isEquipped ? 'Unequip' : 'Equip';
  }

  function enabledButton(selector, enabled) {
    enabled ?
      X.removeClass(inventoryPanel.querySelector(selector),'disabled'):
      X.addClass(inventoryPanel.querySelector(selector),'disabled');
  }

  function isSelectionEquipped() {
    return selected && equipmentManager.getEquippedSlot(selected) != null;
  }

  function canEquipSelection() {
    return selected && equipmentManager.getValidSlots(selected).length > 0;
  }

  function getReachableInventories() {
    return InventorySystem.getReachableInventories(characterId);
  }


  // === Equip ===

  function equipSelected() {
    const slots = equipmentManager.getValidSlots(selected);

    if (isSelectionEquipped()) {
      equipmentManager.unequipItem(selected);
      return update();
    }

    if (slots.length === 1) {
      equipmentManager.equipItem(selected, slots[0]);
      return update();
    }

    console.log("TODO: Open Chooser :",slots)
  }

  // === Trade ===

  function buildTradePanel() {
    const destinationList = inventoryPanel.querySelector('.destination-list');
    getReachableInventories().forEach(inventory => {
      destinationList.appendChild(X.createElement(`
        <li class='destination' data-id='${inventory.id}'>${inventory.name}</li>
      `));
    });
  }

  function updateTradeTitle() {
    inventoryPanel.querySelector(`.trade-title`).textContent = (selected == null) ?
      `Select an item to trade.`:
      `Give ${Item(selected).getName()} to…`;
  }

  function toggleTradePanel() {
    const frame = inventoryPanel.querySelector('.trade-frame');
    X.hasClass(frame,'hide') ? X.removeClass(frame,'hide') : X.addClass(frame,'hide');
  }

  function destinationClicked(destinationId) {
    InventorySystem.transferItem(selected, characterId, destinationId);
    setSelected(null);
    update();
  }






  // === Drop ===

  // TODO: This text will need to differentiate between proper and common names. I could run the text through the
  //       weaver, but then I'd been a different versions for weapons and armor and items. Really need need a version
  //       of getName() that takes a prefix, so that getName('the') becomes "the name" for common names and "name" for
  //       proper names. Then maybe we look at the function loom to see if it can use that function instead. We'll
  //       also need to handle proper armor names at some point..

  function dropSelected() {
    Confirmation.show({
      text: `Drop the ${Item(selected).getName()}? It will be destroyed`,
      onConfirm: () => {
        inventoryManager.dropItem(selected);
        selected = null;
        update();
      },
    });
  }

  function useSelected() { throw new Error(`TODO: How do I shoop whoop?`) }

  return Object.freeze({
    buildInto,
    resize,
    update,
  });
}


/*
  function openSlotPicker(slots) {
    closeSlotPicker();

    const equipment = EquipmentManager(characterId);
    slotPicker = X.createElement(`<div class='item-select-window slot-picker'></div>`);

    slots.forEach(slot => {
      const occupantId = equipment.getSlot(slot);
      const slotElement = X.createElement(`<div class='item-element' data-slot='${slot}'>
        <div class='name'>${StringHelper.titlecaseAll(slot)}</div>
        <div class='${occupantId ? 'occupant' : 'empty'}'></div>
      </div>`);

      slotElement.querySelector(occupantId ? '.occupant' : '.empty').textContent =
        occupantId ? Item(occupantId).getName() : 'empty';

      slotPicker.appendChild(slotElement);
    });

    const anchor = X.getPosition(element.querySelector(`[data-verb='equip']`));
    slotPicker.style['left'] = `${anchor.left}px`;
    slotPicker.style['top'] = `${anchor.bottom + 5}px`;

    element.appendChild(slotPicker);

    // Deferred so the click that opened the picker doesn't immediately close it.
    setTimeout(() => window.addEventListener('click', closeSlotPicker, { once:true }), 0);
  }

  function closeSlotPicker() {
    window.removeEventListener('click', closeSlotPicker);
    if (slotPicker) {
      slotPicker.remove();
      slotPicker = null;
    }
  }

  function slotPicked(slot) {
    EquipmentManager(characterId).equipItem(selectedItemId, slot);
    closeSlotPicker();
    refresh();
  }

*/
