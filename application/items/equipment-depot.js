global.EquipmentDepot = function(code) {
  const parameters = EquipmentParameters.lookup(code);
  const depotId = GameSystem.getState().manifestEquipmentDepot(code);

  function fetch() { return InventoryComponent.lookup(depotId); }
  function update(inventory) { Registry.updateComponent(depotId, ComponentType.inventory, inventory); }

  // Remove oldest items and fill with new items.
  // How is oldest determined? Auto increment id? System time at creation?
  function restock() {

  }

  function getStock() {
    restock();
    return fetch().items;
  }

  function removeItem(itemId) {
    const inventory = fetch();
    inventory.items = inventory.items.filter(id => id !== itemId);
    update(inventory);
  }

  return {
    getId: () => { return depotId },
    getParameters: () => { return parameters },
    getStock,
    removeItem,
  }

}
