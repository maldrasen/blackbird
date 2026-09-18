global.EquipmentComponent = (function() {
  const properties = Object.keys(EquipmentSlot);

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

  // Equipment validation is rather involved. We need to check that each equipped slot can actually hold the equipped
  // item. We also make sure that each equipped item is actually in the character's inventory.
  function validate(id) {
    const equipmentComponent = lookup(id);

    Object.keys(equipmentComponent).forEach(slot => {

      if (properties.includes(slot) === false) {
        throw new Error(`Equipment component does not have a ${slot} slot.`);
      }

      if (equipmentComponent[slot]) {
        const itemId = equipmentComponent[slot];
        const base = BaseEquipment.lookup(ItemComponent.lookup(itemId).base);

        if (base.getSlots().includes(slot) === false) {
          throw new Error(`Item:${itemId} (${base.getCode()}) cannot be equipped in ${slot}`);
        }

        if (InventoryManager(id).hasItem(itemId) === false) {
          throw new Error(`Item:${itemId} is equipped, but isn't in Character:${id}'s inventory.`);
        }
      }
    });
  }

  return {
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  };

})();
