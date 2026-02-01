global.Attributes = (function() {
  const $properties = [];

  function properties() { return $properties; }

  function validate(id) {
    const attributeComponent = Registry.lookupAttributesComponent(id)

    Object.keys(attributeComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Attribute component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
