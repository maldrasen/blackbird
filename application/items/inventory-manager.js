global.InventoryManager = function(characterId) {

  function fetch() {
    return InventoryComponent.lookup(characterId);
  }

  function update(inventory) {
    Registry.updateComponent(characterId, ComponentType.inventory, inventory);
 }

  function hasItem(itemId) {
    return fetch().items.indexOf(itemId) >= 0;
  }

  // When we add an item to an inventory we make sure that the item exists and that it isn't already in an inventory,
  // including the inventory that it's going into.
  function addItem(itemId) {
    if (ItemComponent.lookup(itemId) == null) { throw new Error(`Item:${itemId} does not exist.`); }

    Registry.findEntitiesWithComponents([ComponentType.inventory]).forEach(invId => {
      if (hasItem(invId, itemId)) { throw new Error(`Inventory:${invId} already has Item:${itemId}`); }
    });

    const inventory = fetch();
    inventory.items.push(itemId);
    update(inventory);
  }

  function removeItem(itemId) {
    if (hasItem(itemId) === false) {
      throw new Error(`Inventory:${characterId} doesn't have Item:${itemId} to remove.`);
    }

    const inventory = fetch();
    inventory.items = inventory.items.filter(id => id !== itemId);
    update(inventory);
  }

  function getArticleQuantity(code) {
    return fetch().articles[code] || 0
  }

  function setArticleQuantity(code, quantity) {
    const inventory = fetch();
    const article = Article.lookup(code);

    if (article == null) { throw new Error(`Unknown Article:${code}`); }
    if (quantity > 0) { inventory.articles[code] = quantity; }
    if (quantity <= 0) { delete inventory.articles[code]; }

    update(inventory);
  }

  return Object.freeze({
    hasItem,
    addItem,
    removeItem,
    getArticleQuantity,
    setArticleQuantity,
  });

}