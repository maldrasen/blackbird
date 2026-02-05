global.Body = (function() {
  const $properties = ['height','skinType'];

  function properties() { return $properties; }

  function validate(id) {
    const bodyComponent = Registry.lookupBodyComponent(id)

    Object.keys(bodyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Body component does not have a ${key} property.`
      }
    });

    Validate.atLeast('height',bodyComponent.height,300);
    Validate.exists('skinType',bodyComponent.skinType);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
