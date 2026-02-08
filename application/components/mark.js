global.Mark = (function() {
  const $properties = ['type','memory'];

  function getProperties() { return $properties; }

  function validate(id) {
    const markComponent = Registry.lookupMarkComponent(id)

    Object.keys(markComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Mark component does not have a ${key} property.`
      }
    });

    Validate.isIn('type',markComponent.type,['hate','lust','love']);
    Validate.exists('memory',markComponent.memory);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
