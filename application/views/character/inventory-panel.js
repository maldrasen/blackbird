global.InventoryPanel = function(options) {

  let selected;
  let slotChooser;

  let inventoryPanel;
  let scrollingPanel;
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

    const itemList = inventoryPanel.querySelector('.item-list');
    scrollingPanel = ScrollingPanel({ element:itemList });

    update();
  }

  function resize() {
    setTimeout(() => { scrollingPanel.resize(); },0);
  }

  // TODO: call a deselect function after move instead
  // if (items.find(row => row.itemId === selected) == null) { selected = null; }

  function update() {
    const itemList = inventoryPanel.querySelector('.item-list');

    X.empty(itemList);
    inventoryManager.listItems().forEach(item => {
      itemList.appendChild(buildItemElement(item));
    });

    updateButtons();
    scrollingPanel.resize();
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
        selected = null;
      } else {
        X.removeClass(`.item-list .selected`,`selected`);
        X.addClass(itemElement,`selected`);
        selected = { item:item, element:itemElement };
      }
      updateButtons();
    }
  }

  // === Inventory Button State ===

  function updateButtons() {
    const isEquipped = isSelectionEquipped();

    enabledButton('.equip-button', isEquipped || canEquipSelection());
    enabledButton('.use-button', false);
    enabledButton('.drop-button', selected != null);
    enabledButton('.trade-button', selected != null && getReachableInventories().length > 0);

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
    return selected && equipmentManager.getValidSlots(selected.item.itemId).length > 0;
  }

  function getReachableInventories() {
    return [];
  }





  return Object.freeze({
    buildInto,
    resize,
    update,
  });

}

InventoryPanel.init = function() {
  X.onClick('.inventory-panel .item-row', selectItem);
  X.onClick('.inventory-panel .equip-button', equipSelected);
  X.onClick('.inventory-panel .use-button', useSelected);
  X.onClick('.inventory-panel .drop-button', dropSelected);
  X.onClick('.inventory-panel .trade-button', tradeSelected);
}

function selectItem(event) {
  // selectedItemId = (selectedItemId === itemId) ? null : itemId;
  //
  // closeSlotPicker();
  // hideTradePanel();
  //
  // element.querySelectorAll('.item-row').forEach(row => {
  //   (row.dataset.itemId === selectedItemId) ? X.addClass(row,'selected') : X.removeClass(row,'selected');
  // });
  //
  // updateVerbs();
}

function equipSelected(event) { console.log("Equip") }
function useSelected(event) { console.log("Use") }
function dropSelected(event) { console.log("Drop") }
function tradeSelected(event) { console.log("Trade") }

// We'd need to find selected.


/*
    const slot = event.target.closest('[data-slot]');
    if (slot) { return slotPicked(slot.dataset.slot); }
    const row = event.target.closest('[data-item-id]');
    if (row) { return rowClicked(row.dataset.itemId); }
    const destination = event.target.closest('[data-destination-id]');
    if (destination) { return destinationClicked(destination.dataset.destinationId); }


  // === Item List =============================================================

  function rowClicked(itemId) {
  }

  // === Verbs =================================================================

  function verbClicked(verb) {
    if (selectedItemId == null) { return; }
    if (verb === 'equip') { return equipClicked(); }
    if (verb === 'drop') { return dropClicked(); }
    if (verb === 'trade') { return tradeClicked(); }
  }

  // === Equipping =============================================================

  function equipClicked() {
    const equipment = EquipmentManager(characterId);

    if (isSelectionEquipped()) {
      equipment.unequipItem(selectedItemId);
      return refresh();
    }

    const slots = equipment.getValidSlots(selectedItemId);
    if (slots.length === 0) { return; }
    if (slots.length === 1) {
      equipment.equipItem(selectedItemId, slots[0]);
      return refresh();
    }

    openSlotPicker(slots);
  }

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

  // === Dropping ==============================================================

  function dropClicked() {
    Confirmation.show({
      text: `Drop the ${Item(selectedItemId).getName()}? It will be destroyed.`,
      onConfirm: () => {
        InventoryManager(characterId).dropItem(selectedItemId);
        selectedItemId = null;
        refresh();
      },
    });
  }

  // === Trading ===============================================================

  function getReachableInventories() {
    return InventorySystem.getReachableInventories(characterId);
  }

  function tradeClicked() {
    if (X.hasClass(element.querySelector('.trade-panel'),'hide') === false) { return hideTradePanel(); }

    const destinationList = element.querySelector('.trade-destinations');
    X.empty(destinationList);

    getReachableInventories().forEach(destination => {
      const destinationElement = X.createElement(
        `<div class='trade-destination' data-destination-id='${destination.id}'></div>`);
      destinationElement.textContent = destination.name;
      destinationList.appendChild(destinationElement);
    });

    X.removeClass(element.querySelector('.trade-panel'),'hide');
  }

  function hideTradePanel() {
    X.addClass(element.querySelector('.trade-panel'),'hide');
  }

  function destinationClicked(destinationId) {
    InventorySystem.transferItem(selectedItemId, characterId, destinationId);
    selectedItemId = null;
    hideTradePanel();
    refresh();
  }

  // ===========================================================================

  refresh();

  return Object.freeze({
    getElement: () => { return element; },
    refresh,
    resize: () => { scrollingPanel.resize(); },
  });

}
*/
