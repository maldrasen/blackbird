global.ArmorComponent = (function() {
  const $properties = ['base','name'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.armor,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.armor,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.armor);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.armor);
  }

  function validate(id) {
    const armorComponent = lookup(id);

    Object.keys(armorComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Armor component does not have a ${key} property.`);
      }
    });

    Validate.exists('Armor.base',armorComponent.base);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
