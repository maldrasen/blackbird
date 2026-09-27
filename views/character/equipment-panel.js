global.EquipmentPanel = function(options) {

  const characterId = options.character;
  const equipmentManager = EquipmentManager(characterId);

  let panel;

  // TODO: This is fine for now, but is going to need a lot of polish. For now it's fine for this panel to simply be
  //       functional and I'll worry about making it look good once we have the accessories implemented and we do more
  //       work on the equipment graphics. I think we'll also want more of a split panel interface. Selecting an item
  //       by name works, but what would really be useful is after selecting a slot you see a list of equipment that
  //       can go into that slot. Then selecting one of the equippable items shows you its stats. What would change if
  //       you equip it. When nothing is selected we should show the current effects that the equipment is giving you.

  function buildInto(container) {
    X.loadDocument(container,'views/templates/equipment-panel.html');
    panel = X.first(container).querySelector('.equipment-panel');
    update();
  }

  function update() {
    const slotList = panel.querySelector('.slot-list');
    X.empty(slotList);
    Object.values(EquipmentSlot).forEach(slot => slotList.appendChild(buildSlotRow(slot)));
  }

  function buildSlotRow(slot) {
    const itemId = equipmentManager.getSlot(slot);
    const row = X.createElement(`<li class='slot-row' data-slot='${slot}'>
      <div class='slot-name'>${StringHelper.titlecase(slot)}</div>
      <div class='slot-item'>
        <div class='item-icon'></div>
        <div class='item-name'></div>
      </div>
    </li>`);
    const slotItem = row.querySelector('.slot-item');

    if (itemId) {
      const item = Item(itemId);
      row.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${item.getIcon()}`);
      row.querySelector('.item-name').textContent = StringHelper.titlecaseName(item.getName());
      X.addClass(row,'filled');
    } else {
      row.querySelector('.item-name').textContent = 'Empty';
    }

    slotItem.addEventListener('click', () => openSlotSelect(slot, slotItem));
    return row;
  }

  // The select lists whatever could go in the slot, with an unequip entry when something's already there. A slot
  // with nothing to offer still opens the select so that clicking it doesn't feel broken. The select closes on mouse
  // leave, so it's anchored to the inline item element rather than the full width row to keep it under the mouse.
  function openSlotSelect(slot, anchor) {
    const items = InventorySystem.getEquipmentForSlot(characterId, slot).map(entry => ({
      label: StringHelper.titlecaseName(entry.name),
      value: { equip:entry.itemId },
    }));

    if (equipmentManager.getSlot(slot) != null) { items.push({ label:'Unequip', value:{ unequip:true } }); }
    if (items.length === 0) { items.push({ label:'Nothing to equip', value:{} }); }

    Select.open({
      anchor: anchor,
      items: items,
      callback: choice => {
        if (choice.equip) { InventorySystem.equip(characterId, choice.equip, slot); }
        if (choice.unequip) { InventorySystem.unequip(characterId, slot); }
        update();
      },
    });
  }

  return {
    buildInto,
    update,
  };
}
