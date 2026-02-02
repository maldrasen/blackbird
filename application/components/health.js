global.Health = (function() {
  const $properties = ['currentStamina','maxStamina','currentHealth','maxHealth'];

  function properties() { return $properties; }

  function validate(id) {
    const healthComponent = Registry.lookupHealthComponent(id);

    Object.keys(healthComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Health component does not have a ${key} property.`
      }
    });

    Validate.atLeast('currentStamina',healthComponent.currentStamina,0);
    Validate.atLeast('maxStamina',healthComponent.maxStamina,1);
    Validate.atLeast('currentHealth',healthComponent.currentHealth,0);
    Validate.atLeast('maxHealth',healthComponent.maxHealth,1);
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
