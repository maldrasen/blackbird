global.ItemComponent = (function() {
  const $properties = [
    'name',
    'slots',
    'isLewd',
  ];

  function create(data) {
    const id = Registry.createEntity();
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
      if ($properties.includes(key) === false) {
        throw new Error(`Item component does not have a ${key} property.`);
      }
    });

    Validate.trueOrNull('Item.isLewd',itemComponent.isLewd);
    Validate.exists(`Item.name`,itemComponent.name);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
