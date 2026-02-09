global.AspectsComponent = (function() {

  function getProperties() { return Object.keys(AspectType); }

  function validate(id) {
    const aspectsComponent = Registry.lookupAspectsComponent(id)

    Object.keys(aspectsComponent).forEach(key => {
      if (getProperties().includes(key) === false) {
        throw `Aspect component does not have a ${key} property.`
      }
    });

    getProperties().forEach(aspectCode => {
      if (aspectsComponent[aspectCode] != null) {
        Validate.between(aspectCode, aspectsComponent[aspectCode], 1, 5);
      }
    });
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
