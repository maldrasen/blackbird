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

  // Each equipped slot has to be one the component knows about, and it has to be a slot the item's record allows.
  // An equipped item is owned by the slot holding it, so there's no inventory to check against.
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
