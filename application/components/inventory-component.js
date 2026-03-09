global.InventoryComponent = (function() {

  function create(id) {
    Registry.createComponent(id,ComponentType.inventory,{ items:[], articles:{} });
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.inventory);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.inventory);
  }

  function hasItem(characterId, itemId) {
    return lookup(characterId).items.indexOf(itemId) >= 0;
  }

  // The addItem() and removeItem() functions have their own methods of validation. And because we create the inventory
  // in an empty state, that function doesn't need validation. When we add an item to an inventory we make sure that
  // the item exists and that it isn't already in an inventory, including the inventory that it's going into.
  function addItem(inventoryId, itemId) {
    if (ItemComponent.lookup(itemId) == null) { throw `Item:${itemId} does not exist.`; }

    Registry.findEntitiesWithComponents([ComponentType.inventory]).forEach(invId => {
      if (hasItem(invId, itemId)) { throw `Inventory:${invId} already has Item:${itemId}` }
    });

    const inventory = lookup(inventoryId);
    inventory.items.push(itemId);
    Registry.updateComponent(inventoryId,ComponentType.inventory,inventory);
  }

  function removeItem(inventoryId, itemId) {
    if (hasItem(inventoryId, itemId) === false) {
      throw `Inventory:${inventoryId} doesn't have Item:${itemId} to remove.`;
    }

    const inventory = lookup(inventoryId);
    inventory.items = inventory.items.filter(id => id !== itemId);
    Registry.updateComponent(inventoryId,ComponentType.inventory,inventory);
  }

  function getArticleQuantity(inventoryId, code) {
    return lookup(inventoryId).articles[code] || 0
  }

  function setArticleQuantity(inventoryId, code, quantity) {
    const inventory = lookup(inventoryId);
    const article = Article.lookup(code);

    if (article == null) { throw `Unknown Article:${code}` }
    if (quantity > 0) { inventory.articles[code] = quantity; }
    if (quantity <= 0) { delete inventory.articles[code]; }

    Registry.updateComponent(inventoryId,ComponentType.inventory,inventory);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    lookup,
    destroy,
    hasItem,
    addItem,
    removeItem,
    getArticleQuantity,
    setArticleQuantity,
  });

})();
