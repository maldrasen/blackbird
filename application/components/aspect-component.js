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
    validateData(lookup(id));
  }

  // This component needs early validation (before it's made into a component)
  function validateData(aspectsData) {
    const properties = Object.keys(AspectType);

    Object.keys(aspectsData).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Aspect component does not have a ${key} property.`);
      }
    });

    properties.forEach(aspectCode => {
      if (aspectsData[aspectCode] != null) {
        Validate.between(`Aspect.${aspectCode}`, aspectsData[aspectCode], 1, 5);
      }
    });

  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
    validateData,
  });

})();
