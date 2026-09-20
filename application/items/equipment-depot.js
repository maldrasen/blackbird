global.EquipmentDepot = function(code) {
  const stockSize = 50;

  const parameters = EquipmentParameters.lookup(code);
  const stocks = GameSystem.getState().manifestEquipmentDepot(code);

  function fetch(id) { return InventoryComponent.lookup(id); }
  function update(id, inventory) { Registry.updateComponent(id, ComponentType.inventory, inventory); }

  // TODO: The equipment parameters should include an enchantment chance. When building a new item, we should roll to
  //       see if there should be an enchantment, then create random enchantment options to send to the factory. Other
  //       options, like the name or text key may be used by unique weapons. The depot won't be building unique
  //       weapons, and I'm not sure the factory would either honestly.

  // Every item picked since the last restock pushes the oldest item out of the stock as well, so the depot can't clog
  // with expensive equipment that no monster can afford within their budget. Items are stocked in the order they're
  // built, which keeps the oldest at the front. The eviction happens here rather than in pickItem() so that a list of
  // stock stays valid while a character picks several things from it.
  function restock(id, equipment) {
    if (Object.keys(equipment).length === 0) { return; }

    const factory = EquipmentFactory(parameters.getMaterials());
    const inventory = fetch(id);
    const picked = stockSize - inventory.items.length;

    inventory.items.splice(0, picked).forEach(id => Registry.deleteEntity(id));

    const shortfall = stockSize - inventory.items.length;

    for (let i=0; i<shortfall; i++) {
      inventory.items.push(factory.build(Random.fromFrequencyMap(equipment)));
    }

    update(id, inventory);
  }

  // Shields take a hand slot, so they're stocked with the weapons.
  function getWeapons() {
    restock(stocks.weapons, parameters.getWeapons());
    return [...fetch(stocks.weapons).items];
  }

  function getArmor() {
    restock(stocks.armor, parameters.getArmor());
    return [...fetch(stocks.armor).items];
  }

  // Picking an item should always transfer it into a new inventory.
  function pickItem(itemId, entity) {
    const stock = Object.values(stocks).find(id => InventoryManager(id).hasItem(itemId));
    if (stock == null) { throw new Error(`EquipmentDepot:${code} doesn't have Item:${itemId} to pick.`); }

    InventoryManager(stock).removeItem(itemId);
    InventoryManager(entity).addItem(itemId);
  }

  return {
    getStocks: () => { return { ...stocks }; },
    getParameters: () => { return parameters },
    getWeapons,
    getArmor,
    pickItem,
  }

}
