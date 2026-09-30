global.EnlightenSystem = (function() {
  let state;

  function startEnlightenment(from, data) {
    state = EnlightenState(from, data);
    bankEssence();
    bankLoot();
  }

  // Each character's share of the essence is banked as soon as enlightenment starts. The essence bars in the view
  // are only an animation played over values that have already been saved.
  function bankEssence() {
    Object.entries(state.getEssence()).forEach(([id, essence]) => {
      const experience = ExperienceComponent.lookup(id);
      experience.essence = essence.end;
      ExperienceComponent.update(id, experience);
    });
  }

  // The loot goes straight into the party inventory as well, the view only lists what was found. The loot inventory
  // is only a staging area between battle cleanup and enlightenment, so everything in it is moved over.
  function bankLoot() {
    const inventory = Inventory();
    const lootInventory = Inventory(GameSystem.getState().getLootInventory());

    state.getLoot().forEach(entry => {
      if (entry.articleCode) {
        return inventory.addArticle(entry.articleCode, entry.quantity);
      }
      lootInventory.removeItem(entry.itemId);
      inventory.addItem(entry.itemId);
    });
  }

  function finishEnlightenment() {
    state = null;
  }

  function levelUpAttribute(id, attribute) {
    if (EssenceSystem.canLevelUp(id) === false) {
      throw new Error(`${Character(id).getName()} doesn't have the essence needed to level up.`);
    }
    return LevelSystem.levelUp(id, attribute);
  }

  return {
    getState: () => { return state; },
    startEnlightenment,
    finishEnlightenment,
    levelUpAttribute,
  };

})();
