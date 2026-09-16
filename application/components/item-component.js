global.ItemComponent = (function() {
  const properties = ['type','name','nameType','materials'];

  function create(id, data) {
    Registry.createComponent(id,ComponentType.item,data);
    validate(id);
    return id;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.item,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.item);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.item);
  }

  function validate(id) {
    const itemComponent = lookup(id);

    Object.keys(itemComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Item component does not have a ${key} property.`);
      }
    });

    Validate.exists(`Item.type`,itemComponent.type);

    // Item names can be common or proper. A common name can be prefixed with "the" or "his", while a proper name has
    // no prefix. The difference between "He swings his spiked dildo bat" and "He thrusts Stabitha forward."
    if (itemComponent.nameType) {
      Validate.isIn('Item.nameType',itemComponent.nameType,['common','proper']);
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
