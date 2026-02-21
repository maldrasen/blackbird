global.ControlledComponent = (function() {
  const $properties = ['control'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.controlled,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.controlled,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.controlled);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.controlled);
  }


  function validate(id) {
    const controlledComponent = lookup(id);

    Object.keys(controlledComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Controlled component does not have a ${key} property.`
      }
    });

    Validate.between('Controlled.control',controlledComponent.control,-500,500)
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
