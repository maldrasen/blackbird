global.AspectsComponent = (function() {

  function create(id,data) {
    Registry.createComponent(id, ComponentType.aspects, data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.aspects,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.aspects);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.aspects);
  }

  function validate(id) {
    const properties = Object.keys(AspectType);
    const aspectsComponent = lookup(id)

    Object.keys(aspectsComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw `Aspect component does not have a ${key} property.`
      }
    });

    properties.forEach(aspectCode => {
      if (aspectsComponent[aspectCode] != null) {
        Validate.between(`Aspect.${aspectCode}`, aspectsComponent[aspectCode], 1, 5);
      }
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
