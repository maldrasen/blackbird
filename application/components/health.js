global.Health = (function() {
  const $properties = ['currentStamina','maxStamina'];

  function properties() { return $properties; }

  function validate(id) {
    const healthComponent = Registry.lookupHealthComponent(id);

    Object.keys(healthComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Health component does not have a ${key} property.`
      }
    });

    Validate.between('currentStamina',healthComponent.currentStamina,0,1500);
    Validate.between('maxStamina',healthComponent.currentStamina,500,1500);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
