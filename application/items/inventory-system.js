global.InventorySystem = (function() {

  // The party shares one inventory, and an equipped item leaves it for the character's slot. Items should only move
  // between the two through these functions, so that neither side ends up owning an item the other still lists.

  function party() { return InventoryManager(); }

  function getEquipmentForSlot(characterId, slot) {
    const equipment = EquipmentManager(characterId);

    return InventoryComponent.lookup(GameSystem.getState().getPartyInventory()).items.
      filter(itemId => equipment.canEquipItem(itemId, slot)).
      map(itemId => {
        const item = Item(itemId);
        return { itemId:itemId, name:item.getName(), icon:item.getIcon() };
      }).
      sort((a,b) => a.name.localeCompare(b.name));
  }

  // Equipping throws before anything changes when the slot won't take the item, so the party inventory is only
  // touched once the slot has been set. Whatever the new item knocked out of a slot goes back to the party.
  function equip(characterId, itemId, slot) {
    if (party().hasItem(itemId) === false) { throw new Error(`Item:${itemId} isn't in the party inventory.`); }

    const displaced = EquipmentManager(characterId).equipItem(itemId, slot);
    party().removeItem(itemId);
    displaced.forEach(id => party().addItem(id));
  }

  function unequip(characterId, slot) {
    EquipmentManager(characterId).equipItem(null, slot).forEach(id => party().addItem(id));
  }

  return {
    getEquipmentForSlot,
    equip,
    unequip,
  };

})();
