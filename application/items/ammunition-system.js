global.AmmunitionSystem = (function() {

  function restock() {
    Object.keys(GameSystem.getState().getPartyConfiguration()).forEach(id => {
      const quiver = QuiverComponent.lookup(id);
      if (quiver.ammunition) { topUp(id, quiver); }
    });
  }

  function topUp(id, quiver) {
    const inventory = Inventory();
    const room = ItemConstants.quiverCapacity - quiver.quantity;
    const quantity = Math.min(room, inventory.getArticleQuantity(quiver.ammunition));

    if (quantity <= 0) { return; }

    inventory.removeArticle(quiver.ammunition, quantity);
    QuiverComponent.update(id, { quantity: quiver.quantity + quantity });
  }

  return { restock };

})();
