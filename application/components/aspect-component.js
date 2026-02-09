global.AspectsComponent = (function() {
  const $properties = Object.keys(AspectType);

  function getProperties() { return $properties; }

  function validate(id) {
    const aspectsComponent = Registry.lookupAspectsComponent(id)

    Object.keys(aspectsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Aspect component does not have a ${key} property.`
      }
    });

    Object.keys(AspectType).forEach(aspectCode => {
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
