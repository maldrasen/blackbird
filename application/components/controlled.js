global.Controlled = (function() {
  const $properties = ['control'];

  function getProperties() { return $properties; }

  function validate(id) {
    const controlledComponent = Registry.lookupControlledComponent(id);

    Object.keys(controlledComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Controlled component does not have a ${key} property.`
      }
    });

    Validate.between('control',controlledComponent.control,-500,500)
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
