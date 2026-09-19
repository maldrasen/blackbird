global.EquipmentDepot = function(code) {
  const depotSize = 100;

  const parameters = EquipmentParameters.lookup(code);
  const depotId = GameSystem.getState().manifestEquipmentDepot(code);

  function fetch() { return InventoryComponent.lookup(depotId); }
  function update(inventory) { Registry.updateComponent(depotId, ComponentType.inventory, inventory); }

  // TODO: The equipment parameters should include an enchantment chance. When building a new item, we should roll to
  //       see if there should be an enchantment, then create random enchantment options to send to the factory. Other
  //       options, like the name or text key may be used by unique weapons. The depot won't be building unique
  //       weapons, and I'm not sure the factory would either honestly.

  // TODO: When restocking we need to remove the oldest equipment from the depot. This should prevent the depots from
  //       getting clogged with expensive equipment that no monsters can afford within their budget. This might not
  //       work though. We could look into some other strategies. Maybe resetting the stock once a given category is
  //       completely drained maybe?

  function restock() {
    const factory = EquipmentFactory(parameters.getMaterials());
    const equipment = { ...parameters.getWeapons(), ...parameters.getArmor() };
    const inventory = fetch();

    while (inventory.items.length < depotSize) {
      const code = Random.fromFrequencyMap(equipment);
      inventory.items.push(factory.build(code));
    }
  }

  function getStock() {
    restock();
    return fetch().items;
  }

  // Picking an item should always transfer it into a new inventory.
  function pickItem(itemId, entity) {
    const inventory = fetch();
    inventory.items = inventory.items.filter(id => id !== itemId);
    update(inventory);

    InventoryManager(entity).addItem(itemId)
  }

  return {
    getId: () => { return depotId },
    getParameters: () => { return parameters },
    getStock,
    pickItem,
  }

}
