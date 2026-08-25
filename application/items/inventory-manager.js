global.InventoryManager = function(characterId=GameSystem.getState().getPlayer()) {

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

    Registry.findEntitiesWithComponents([ComponentType.inventory]).forEach(ownerId => {
      if (InventoryComponent.lookup(ownerId).items.includes(itemId)) {
        throw new Error(`Inventory:${ownerId} already has Item:${itemId}`);
      }
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

  // Rows for the inventory view. Equipped items come first, in equipment slot declaration order, followed by the
  // unequipped items and articles in InventoryCategory declaration order, alphabetical within a category.
  function listItems() {
    const equipment = EquipmentManager(characterId);
    const slotOrder = Object.values(EquipmentSlot);
    const categoryOrder = Object.values(InventoryCategory);

    const itemRows = fetch().items.map(itemId => ({
      itemId: itemId,
      name: Item(itemId).getName(),
      icon: Item(itemId).getIcon(),
      type: ItemComponent.lookup(itemId).type,
      category: InventoryCategory[ItemComponent.lookup(itemId).type],
      slot: equipment.getEquippedSlot(itemId),
    }));

    const articleRows = Object.entries(fetch().articles).map(([code,quantity]) => {
      const article = Article.lookup(code);
      return {
        articleCode: code,
        name: article.getName(),
        icon: article.getIcon(),
        type: article.getType(),
        category: article.getCategory(),
        quantity: quantity,
        slot: null,
      };
    });

    const equipped = itemRows.filter(row => row.slot != null);
    const unequipped = [...itemRows.filter(row => row.slot == null), ...articleRows];

    equipped.sort((a,b) => slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot));
    unequipped.sort((a,b) =>
      (categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)) || a.name.localeCompare(b.name));

    return [...equipped, ...unequipped];
  }

  // Dropping an item destroys it. The item is unequipped first because equipped items must remain in their owner's
  // inventory to stay valid.
  function dropItem(itemId) {
    EquipmentManager(characterId).unequipItem(itemId);
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
      throw new Error(`Inventory:${characterId} only has ${current} of Article:${code}, cannot remove ${quantity}.`);
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