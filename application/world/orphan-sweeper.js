global.OrphanSweeper = (function() {

  // Rather than guaranteeing that an orphaned entity can never be created, we occasionally look for entities that
  // nothing refers to anymore and delete them. Monsters are swept first so that the items they carry are deleted with
  // them rather than being counted as orphaned items themselves.
  function sweep() {
    const swept = { monsters:sweepMonsters(), items:sweepItems() };

    if (swept.monsters + swept.items > 0 && Tests.running() === false) {
      console.warn(`OrphanSweeper removed ${swept.monsters} monsters and ${swept.items} items.`);
    }

    return swept;
  }

  // A monster only exists for the length of a battle. A recruited monster has already lost its monster component.
  function sweepMonsters() {
    const battleState = BattleSystem.getState();

    const orphans = Registry.findEntitiesWithComponents([ComponentType.monster]).filter(id => {
      return battleState == null || battleState.isMonster(id) === false;
    });

    orphans.forEach(id => {
      const inventory = InventoryComponent.lookup(id);
      if (inventory) { inventory.items.forEach(itemId => Registry.deleteEntity(itemId)); }
      Registry.deleteEntity(id);
    });

    return orphans.length;
  }

  // An item has to be in an inventory. That could be a character's inventory, an equipment depot, or the loot.
  function sweepItems() {
    const owned = new Set();

    Registry.findEntitiesWithComponents([ComponentType.inventory]).forEach(id => {
      InventoryComponent.lookup(id).items.forEach(itemId => owned.add(itemId));
    });

    const orphans = Registry.findEntitiesWithComponents([ComponentType.item]).filter(id => owned.has(id) === false);
    orphans.forEach(id => Registry.deleteEntity(id));

    return orphans.length;
  }

  return { sweep };

})();
