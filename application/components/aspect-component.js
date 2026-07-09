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
    const codes = Aspect.getAllCodes();

    Object.keys(aspectsData).forEach(code => {
      if (codes.includes(code) === false) {
        throw new Error(`Aspect component does not have a ${code} property.`);
      }
      if (aspectsData[code] != null) {
        Validate.between(`Aspect.${code}`, aspectsData[code], 1, Aspect.lookup(code).getMaxLevel());
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
