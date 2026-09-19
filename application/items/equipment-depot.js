global.EquipmentDepot = function(code) {
  const poolSize = 50;

  const parameters = EquipmentParameters.lookup(code);
  const poolIds = GameSystem.getState().manifestEquipmentDepot(code);

  function fetch(poolId) { return InventoryComponent.lookup(poolId); }
  function update(poolId, inventory) { Registry.updateComponent(poolId, ComponentType.inventory, inventory); }

  // TODO: The equipment parameters should include an enchantment chance. When building a new item, we should roll to
  //       see if there should be an enchantment, then create random enchantment options to send to the factory. Other
  //       options, like the name or text key may be used by unique weapons. The depot won't be building unique
  //       weapons, and I'm not sure the factory would either honestly.

  // TODO: When restocking we need to remove the oldest equipment from the depot. This should prevent the depots from
  //       getting clogged with expensive equipment that no monsters can afford within their budget.

  // A depot with nothing to build in a pool (the vermen have no armor) leaves that pool empty.
  function restock(poolId, equipment) {
    if (Object.keys(equipment).length === 0) { return; }

    const factory = EquipmentFactory(parameters.getMaterials());
    const inventory = fetch(poolId);
    const shortfall = poolSize - inventory.items.length;

    for (let i=0; i<shortfall; i++) {
      inventory.items.push(factory.build(Random.fromFrequencyMap(equipment)));
    }

    update(poolId, inventory);
  }

  // Shields take a hand slot, so they're stocked with the weapons.
  function getWeapons() {
    restock(poolIds.weapons, parameters.getWeapons());
    return [...fetch(poolIds.weapons).items];
  }

  function getArmor() {
    restock(poolIds.armor, parameters.getArmor());
    return [...fetch(poolIds.armor).items];
  }

  // Picking an item should always transfer it into a new inventory.
  function pickItem(itemId, entity) {
    const poolId = Object.values(poolIds).find(id => InventoryManager(id).hasItem(itemId));
    if (poolId == null) { throw new Error(`EquipmentDepot:${code} doesn't have Item:${itemId} to pick.`); }

    InventoryManager(poolId).removeItem(itemId);
    InventoryManager(entity).addItem(itemId);
  }

  return {
    getPoolIds: () => { return { ...poolIds }; },
    getParameters: () => { return parameters },
    getWeapons,
    getArmor,
    pickItem,
  }

}
