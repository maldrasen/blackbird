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

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    lookup,
    destroy,
  });

})();
