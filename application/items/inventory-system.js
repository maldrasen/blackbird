global.InventorySystem = (function() {

  // Each provider returns candidate entity ids. The list is ordered so that reachable inventories are always
  // presented in the same order: player, then party, then co-located roster members. Future inventory sources
  // (an armory, a bag of holding) can be appended here.
  const providers = [
    playerProvider,
    partyProvider,
    rosterProvider,
  ];

  function playerProvider() {
    const player = GameSystem.getState().getPlayer();
    return player ? [player] : [];
  }

  function partyProvider() {
    return Object.keys(GameSystem.getState().getPartyConfiguration() || {});
  }

  function rosterProvider() {
    const state = GameSystem.getState();
    return state.getRoster().filter(id => {
      const situated = SituatedComponent.lookup(id);
      return situated != null && situated.currentLocation === state.getCurrentLocation();
    });
  }

  function getReachableInventories(characterId) {
    const reachable = [];

    providers.forEach(provider => {
      provider().forEach(id => {
        if (id === characterId) { return; }
        if (reachable.includes(id)) { return; }
        if (InventoryComponent.lookup(id) == null) { return; }
        reachable.push(id);
      });
    });

    return reachable.map(id => ({ id:id, name:Character(id).getName() }));
  }

  // The item must be unequipped and removed from the source inventory before it's added to the destination.
  // EquipmentComponent.validate requires equipped items to be in the owner's inventory.
  function transferItem(itemId, sourceId, destinationId) {
    EquipmentManager(sourceId).unequipItem(itemId);
    InventoryManager(sourceId).removeItem(itemId);
    InventoryManager(destinationId).addItem(itemId);
  }

  return Object.freeze({
    getReachableInventories,
    transferItem,
  });

})();
