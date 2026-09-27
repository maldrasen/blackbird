global.EquipmentPanel = function(options) {

  const characterId = options.character;
  const equipmentManager = EquipmentManager(characterId);

  let panel;

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
      <div class='item-icon'></div>
      <div class='item-name'></div>
    </li>`);

    if (itemId) {
      const item = Item(itemId);
      row.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${item.getIcon()}`);
      row.querySelector('.item-name').textContent = StringHelper.titlecaseName(item.getName());
      X.addClass(row,'filled');
    } else {
      row.querySelector('.item-name').textContent = 'Empty';
    }

    row.addEventListener('click', () => openSlotSelect(slot, row));
    return row;
  }

  // The select lists whatever could go in the slot, with an unequip entry when something's already there. A slot
  // with nothing to offer still opens the select so that clicking it doesn't feel broken.
  function openSlotSelect(slot, row) {
    const items = InventorySystem.getEquipmentForSlot(characterId, slot).map(entry => ({
      label: StringHelper.titlecaseName(entry.name),
      value: { equip:entry.itemId },
    }));

    if (equipmentManager.getSlot(slot) != null) { items.push({ label:'Unequip', value:{ unequip:true } }); }
    if (items.length === 0) { items.push({ label:'Nothing to equip', value:{} }); }

    Select.open({
      anchor: row,
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
