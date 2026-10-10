global.EquipmentDepot = function(code) {
  const stockSize = 50;

  const parameters = EquipmentParameters.lookup(code);
  const stocks = GameSystem.getState().manifestEquipmentDepot(code);

  function fetch(id) { return InventoryComponent.lookup(id); }
  function update(id, inventory) { Registry.updateComponent(id, ComponentType.inventory, inventory); }

  // Every item built for stock has the depot's chance of coming out enchanted. Named or unique weapons aren't the
  // depot's business; it only ever stocks what the parameters list.
  //
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
      const id = factory.build(Random.fromFrequencyMap(equipment));
      Enchanter.rollForEnchantment(id, parameters.getEnchantmentChance());
      inventory.items.push(id);
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

  // A picked item leaves the stock with no owner, so whoever picks it has to equip it or put it in an inventory.
  function pickItem(itemId) {
    const stock = Object.values(stocks).find(id => Inventory(id).hasItem(itemId));
    if (stock == null) { throw new Error(`EquipmentDepot:${code} doesn't have Item:${itemId} to pick.`); }

    Inventory(stock).removeItem(itemId);
  }

  return {
    getStocks: () => { return { ...stocks }; },
    getParameters: () => { return parameters },
    getWeapons,
    getArmor,
    pickItem,
  }

}
