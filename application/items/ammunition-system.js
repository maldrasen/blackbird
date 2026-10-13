global.AmmunitionSystem = (function() {

  function restock() {
    Object.keys(GameSystem.getState().getPartyConfiguration()).forEach(id => {
      const quiver = QuiverComponent.lookup(id);
      if (quiver.ammunition) { topUp(id, quiver); }
    });
  }

  // Whatever the quiver held goes back to the party inventory before the new ammunition is drawn from it, so loading
  // the same type again just tops the quiver up.
  function loadQuiver(id, code) {
    unloadQuiver(id);
    QuiverComponent.update(id, { ammunition:code });
    topUp(id, QuiverComponent.lookup(id));
  }

  function unloadQuiver(id) {
    const quiver = QuiverComponent.lookup(id);
    if (quiver.quantity > 0) { Inventory().addArticle(quiver.ammunition, quiver.quantity); }
    QuiverComponent.update(id, { ammunition:null, quantity:0 });
  }

  function topUp(id, quiver) {
    const inventory = Inventory();
    const room = ItemConstants.quiverCapacity - quiver.quantity;
    const quantity = Math.min(room, inventory.getArticleQuantity(quiver.ammunition));

    if (quantity <= 0) { return; }

    inventory.removeArticle(quiver.ammunition, quantity);
    QuiverComponent.update(id, { quantity: quiver.quantity + quantity });
  }

  // Monsters don't track ammunition, and an enchanted bow may someday not need any.
  function isRequired(id, weapon) {
    return MonsterComponent.lookup(id) == null && weapon.usesAmmunition();
  }

  function hasAmmunitionFor(id, weapon) {
    return isRequired(id, weapon) === false || QuiverComponent.lookup(id).quantity > 0;
  }

  // Bow attacks always expend 1 arrow. If we add special bow attacks that shoot more than one arrow at a time
  // they should probably be making multiple attack rolls, and decrement the ammo each time. If we know a special
  // attack would use three arrows though, it shouldn't be possible if they only have two in their quiver.
  function spend(id) {
    const quiver = QuiverComponent.lookup(id);
    QuiverComponent.update(id, { quantity: quiver.quantity - 1 });
  }

  return {
    restock,
    loadQuiver,
    unloadQuiver,
    isRequired,
    hasAmmunitionFor,
    spend,
  };

})();
