global.InventoryManager = function(inventoryId=GameSystem.getState().getPartyInventory()) {

  // TODO: InventoryManager is now essentially a wrapper around an Inventory component, so really this should be
  //       renamed to Inventory and moved in the wrappers.

  function fetch() {
    return InventoryComponent.lookup(inventoryId);
  }

  function update(inventory) {
    Registry.updateComponent(inventoryId, ComponentType.inventory, inventory);
  }

  function hasItem(itemId) {
    return fetch().items.indexOf(itemId) >= 0;
  }

  // An item has exactly one owner: an inventory or an equipment slot. Adding an item checks that it exists and that
  // nothing else already owns it, including the inventory it's going into.
  function addItem(itemId) {
    if (ItemComponent.lookup(itemId) == null) { throw new Error(`Item:${itemId} does not exist.`); }

    Registry.findComponentsWith(ComponentType.inventory, inventory => inventory.items.includes(itemId)).forEach(ownerId => {
      throw new Error(`Inventory:${ownerId} already has Item:${itemId}`);
    });

    Registry.findComponentsWith(ComponentType.equipment, equipment => Object.values(equipment).includes(itemId)).forEach(ownerId => {
      throw new Error(`Item:${itemId} is equipped by Character:${ownerId}`);
    });

    const inventory = fetch();
    inventory.items.push(itemId);
    update(inventory);
  }

  function removeItem(itemId) {
    if (hasItem(itemId) === false) {
      throw new Error(`Inventory:${inventoryId} doesn't have Item:${itemId} to remove.`);
    }

    const inventory = fetch();
    inventory.items = inventory.items.filter(id => id !== itemId);
    update(inventory);
  }

  // Rows for an inventory view, in InventoryCategory declaration order and alphabetical within a category.
  function listItems() {
    const categoryOrder = Object.values(InventoryCategory);

    const itemRows = fetch().items.map(itemId => {
      const item = Item(itemId);
      return {
        itemId: itemId,
        name: item.getName(),
        icon: item.getIcon(),
        type: item.getCategory(),
        category: item.getCategory(),
      };
    });

    const articleRows = Object.entries(fetch().articles).map(([code,quantity]) => {
      const article = Article.lookup(code);
      return {
        articleCode: code,
        name: article.getName(),
        icon: article.getIcon(),
        type: article.getType(),
        category: article.getCategory(),
        usableWhen: article.getUsableWhen(),
        quantity: quantity,
      };
    });

    return [...itemRows, ...articleRows].sort((a,b) =>
      (categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)) || a.name.localeCompare(b.name));
  }

  // Dropping an item destroys it.
  function dropItem(itemId) {
    removeItem(itemId);
    Registry.deleteEntity(itemId);
  }

  function addArticle(code, quantity) {
    if (quantity < 0) { throw new Error(`Cannot add ${quantity} of Article:${code}, use removeArticle().`); }
    setArticleQuantity(code, getArticleQuantity(code) + quantity);
  }

  function removeArticle(code, quantity) {
    const current = getArticleQuantity(code);

    if (quantity > current) {
      throw new Error(`Inventory:${inventoryId} only has ${current} of Article:${code}, cannot remove ${quantity}.`);
    }

    setArticleQuantity(code, current - quantity);
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

  return {
    hasItem,
    addItem,
    removeItem,
    listItems,
    dropItem,
    addArticle,
    removeArticle,
    getArticleQuantity,
    setArticleQuantity,
  };

}
