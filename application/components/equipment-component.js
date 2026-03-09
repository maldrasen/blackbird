global.EquipmentComponent = (function() {
  const $properties = Object.keys(EquipmentSlot);

  function create(id) {
    Registry.createComponent(id,ComponentType.equipment,{});
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.equipment,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.equipment);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.equipment);
  }

  function validate(id) {
    const equipmentComponent = lookup(id);

    Object.keys(equipmentComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Equipment component does not have a ${key} property.`
      }
    });

    $properties.forEach(slot => {
      if (equipmentComponent[slot]) {
        const itemId = equipmentComponent[slot];
        const equippedItem = ItemComponent.lookup(itemId);

        if (InventoryComponent.hasItem(id, itemId) === false) {
          throw `Item:${itemId} is equipped, but isn't in Character:${id}'s inventory.`;
        }
        if (equippedItem.slots.includes(slot) === false) {
          throw `Item:${itemId} cannot be equipped in Slot:${slot}`;
        }
      }
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
