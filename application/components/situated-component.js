global.SituatedComponent = (function() {
  const $properties = ['currentLocation'];

  function getProperties() { return $properties; }

  function validate(id) {
    const situatedComponent = Registry.lookupSituatedComponent(id);

    Object.keys(situatedComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Situated component does not have a ${key} property.`
      }
    });

    Validate.exists('currentLocation',situatedComponent.currentLocation);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
