global.SituatedComponent = (function() {
  const $properties = ['currentLocation'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.situated,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.situated,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.situated);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.situated);
  }

  function validate(id) {
    const situatedComponent = lookup(id);

    Object.keys(situatedComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Situated component does not have a ${key} property.`
      }
    });

    Validate.exists('Situated.currentLocation',situatedComponent.currentLocation);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
