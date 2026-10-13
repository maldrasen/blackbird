global.QuiverComponent = (function() {
  const properties = ['ammunition','quantity'];

  function create(id, data={}) {
    if (data.ammunition == null) { data.ammunition = null; }
    if (data.quantity == null) { data.quantity = 0; }

    Registry.createComponent(id,ComponentType.quiver,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.quiver,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.quiver);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.quiver);
  }

  function validate(id) {
    const quiverComponent = lookup(id);

    Object.keys(quiverComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Quiver component does not have a ${key} property.`);
      }
    });

    Validate.isNumber('Quiver.quantity', quiverComponent.quantity);

    if (quiverComponent.ammunition != null) {
      Ammunition.lookup(quiverComponent.ammunition);
    }
  }

  return {
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  };

})();
