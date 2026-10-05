global.EquipmentPanel = (function() {
  let character;
  let equipmentManager;

  let rootElement;
  let detailPanel;

  function init() {}

  function build(id) {
    character = Character(id);
    equipmentManager = EquipmentManager(id);

    rootElement = X.createElement(`<div class='equipment-root'>
      <div class='slots-panel'><ul class='slots-list'></ul></div>
      <div class='item-panel hide'></div>
      <div class='detail-area'></div>
    </div>`);

    X.fill('#equipmentTab', rootElement);

    detailPanel = ItemDetailPanel();
    rootElement.querySelector('.detail-area').appendChild(detailPanel.build());

    update();
  }

  function update() {

    // ---When no slots are selected---
    detailPanel.update({ characterId:character.getEntity() });

    X.empty('#characterOverlay .slots-list');
    character.getEquipmentSlots().forEach(slot => {
      X.append('#characterOverlay .slots-list', buildEquipmentSlot(slot));
    });

  }

  function buildEquipmentSlot(slot) {
    const equipped = equipmentManager.getSlot(slot);

    console.log(equipped)

    const item = X.createElement(`<li class='slot'>
      <div class='slot-name'>${StringHelper.titlecase(slot)}</div>
      <div class='item-display'>${equipped}</div>
    </li>`);

    return item;
  }

  return {
    init,
    build,
    update,
  };

})();


  // function update() {
  //   const slotList = panel.querySelector('.slot-list');
  //   X.empty(slotList);
  //   Object.values(EquipmentSlot).forEach(slot => slotList.appendChild(buildSlotRow(slot)));
  // }
  //
  // function buildSlotRow(slot) {
  //   const itemId = equipmentManager.getSlot(slot);
  //   const row = X.createElement(`<li class='slot-row' data-slot='${slot}'>
  //     <div class='slot-name'>${StringHelper.titlecase(slot)}</div>
  //     <div class='slot-item'>
  //       <div class='item-icon'></div>
  //       <div class='item-name'></div>
  //     </div>
  //   </li>`);
  //   const slotItem = row.querySelector('.slot-item');
  //
  //   if (itemId) {
  //     const item = Item(itemId);
  //     row.querySelector('.item-icon').style['background-image'] = X.assetURL(`icons/${item.getIcon()}`);
  //     row.querySelector('.item-name').textContent = StringHelper.titlecaseName(item.getName());
  //     X.addClass(row,'filled');
  //   } else {
  //     row.querySelector('.item-name').textContent = 'Empty';
  //   }
  //
  //   slotItem.addEventListener('click', () => openSlotSelect(slot, slotItem));
  //   return row;
  // }
  //
  // // The select lists whatever could go in the slot, with an unequip entry when something's already there. A slot
  // // with nothing to offer still opens the select so that clicking it doesn't feel broken. The select closes on mouse
  // // leave, so it's anchored to the inline item element rather than the full width row to keep it under the mouse.
  // function openSlotSelect(slot, anchor) {
  //   const items = InventorySystem.getEquipmentForSlot(characterId, slot).map(entry => ({
  //     label: StringHelper.titlecaseName(entry.name),
  //     value: { equip:entry.itemId },
  //   }));
  //
  //   if (equipmentManager.getSlot(slot) != null) { items.push({ label:'Unequip', value:{ unequip:true } }); }
  //   if (items.length === 0) { items.push({ label:'Nothing to equip', value:{} }); }
  //
  //   Select.open({
  //     anchor: anchor,
  //     items: items,
  //     callback: choice => {
  //       if (choice.equip) { InventorySystem.equip(characterId, choice.equip, slot); }
  //       if (choice.unequip) { InventorySystem.unequip(characterId, slot); }
  //       update();
  //     },
  //   });
  // }
