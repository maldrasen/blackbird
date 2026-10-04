global.Inventory = function(inventoryId=GameSystem.getState().getPartyInventory()) {

  function fetch() {
    return InventoryComponent.lookup(inventoryId);
  }

  function update(inventory) {
    Registry.updateComponent(inventoryId, ComponentType.inventory, inventory);
  }

  function hasItem(itemId) {
    return fetch().items.indexOf(itemId) >= 0;
  }

  function getItems() {
    return [...fetch().items];
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

  function listItems() {
    const categoryOrder = Object.values(InventoryCategory);
    const inventory = fetch();

    const sortKey = entry => {
      const record = entry.itemId ? Item(entry.itemId) : Article.lookup(entry.articleCode);
      return { category: categoryOrder.indexOf(record.getCategory()), name: record.getName() };
    };

    const entries = [
      ...inventory.items.map(itemId => ({ itemId })),
      ...Object.entries(inventory.articles).map(([articleCode,quantity]) => ({ articleCode, quantity })),
    ];

    return entries.map(entry => ({ entry, key:sortKey(entry) })).
      sort((a,b) => (a.key.category - b.key.category) || a.key.name.localeCompare(b.key.name)).
      map(sorted => sorted.entry);
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

  function getArticles() {
    return { ...fetch().articles };
  }

  function getArticlesWithTag(tag) {
    return ObjectHelper.select(fetch().articles, (code,quantity) => {
      return Article.lookup(code).getTags().includes(tag);
    });
  }

  function getArticlesWithAnyTag(tags) {
    return ObjectHelper.select(fetch().articles, (code,quantity) => {
      return Article.lookup(code).getTags().some(tag => tags.includes(tag));
    });
  }

  function getArticlesWithEveryTag(tags) {
    return ObjectHelper.select(fetch().articles, (code,quantity) => {
      return tags.every(tag => Article.lookup(code).getTags().includes(tag));
    });
  }

  return {
    hasItem,
    getItems,
    addItem,
    removeItem,
    listItems,
    dropItem,
    addArticle,
    removeArticle,
    getArticleQuantity,
    setArticleQuantity,
    getArticles,
    getArticlesWithTag,
    getArticlesWithAnyTag,
    getArticlesWithEveryTag,
  };

}
