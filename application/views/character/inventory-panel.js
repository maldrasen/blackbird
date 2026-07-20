global.InventoryPanel = function(characterId) {

  let selectedItemId = null;
  let slotPicker = null;

  const element = X.createElement(`<div class='inventory-panel'>
    <div class='inventory-main'>
      <div class='item-list-frame'>
        <div class='item-list'></div>
      </div>
      <div class='verb-row button-row'>
        <a href='#' class='button' data-verb='equip'>Equip</a>
        <a href='#' class='button disabled' data-verb='use'>Use</a>
        <a href='#' class='button' data-verb='drop'>Drop</a>
        <a href='#' class='button' data-verb='trade'>Trade</a>
      </div>
    </div>
    <div class='trade-panel hide'>
      <div class='trade-title'>Give to...</div>
      <div class='trade-destinations'></div>
    </div>
  </div>`);

  const itemList = element.querySelector('.item-list');
  const scrollingPanel = ScrollingPanel({ element:itemList });

  // A single delegated listener on the panel root. The panel is rebuilt every time the overlay opens, so window
  // level listeners (X.onClick) would stack up a new listener on each open.
  element.addEventListener('click', event => {
    if (event.target.closest('.disabled')) { return; }

    const slot = event.target.closest('[data-slot]');
    if (slot) { return slotPicked(slot.dataset.slot); }

    const row = event.target.closest('[data-item-id]');
    if (row) { return rowClicked(row.dataset.itemId); }

    const verb = event.target.closest('[data-verb]');
    if (verb) { return verbClicked(verb.dataset.verb); }

    const destination = event.target.closest('[data-destination-id]');
    if (destination) { return destinationClicked(destination.dataset.destinationId); }
  });

  // === Item List =============================================================

  function refresh() {
    const rows = InventoryManager(characterId).listItems();

    if (rows.find(row => row.itemId === selectedItemId) == null) { selectedItemId = null; }

    X.empty(itemList);
    rows.forEach(row => itemList.appendChild(buildRow(row)));

    updateVerbs();
    scrollingPanel.resize();
  }

  function buildRow(row) {
    const rowElement = X.createElement(`<div class='item-row' data-item-id='${row.itemId}'>
      <div class='item-icon'></div>
      <div class='item-name'></div>
    </div>`);

    rowElement.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${row.icon}`);
    rowElement.querySelector('.item-name').textContent = row.name;

    if (row.slot) { X.addClass(rowElement,'equipped'); }
    if (row.itemId === selectedItemId) { X.addClass(rowElement,'selected'); }

    return rowElement;
  }

  function rowClicked(itemId) {
    selectedItemId = (selectedItemId === itemId) ? null : itemId;

    closeSlotPicker();
    hideTradePanel();

    element.querySelectorAll('.item-row').forEach(row => {
      (row.dataset.itemId === selectedItemId) ? X.addClass(row,'selected') : X.removeClass(row,'selected');
    });

    updateVerbs();
  }

  // === Verbs =================================================================

  function updateVerbs() {
    setVerbEnabled('use', false);
    setVerbEnabled('drop', selectedItemId != null);
    setVerbEnabled('trade', selectedItemId != null && getReachableInventories().length > 0);
    updateEquipVerb();
  }

  function updateEquipVerb() {
    const button = element.querySelector(`[data-verb='equip']`);
    const equipped = isSelectionEquipped();

    button.textContent = equipped ? 'Unequip' : 'Equip';
    setVerbEnabled('equip', equipped || canEquipSelection());
  }

  function isSelectionEquipped() {
    if (selectedItemId == null) { return false; }
    return EquipmentManager(characterId).getEquippedSlot(selectedItemId) != null;
  }

  function canEquipSelection() {
    if (selectedItemId == null) { return false; }
    return EquipmentManager(characterId).getValidSlots(selectedItemId).length > 0;
  }

  function setVerbEnabled(verb, enabled) {
    const button = element.querySelector(`[data-verb='${verb}']`);
    if (enabled) { X.removeClass(button,'disabled'); }
    if (enabled === false) { X.addClass(button,'disabled'); }
  }

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
