global.Health = (function() {
  const $properties = ['currentStamina','currentHealth','maxHealth'];

  function getProperties() { return $properties; }

  function validate(id) {
    const healthComponent = Registry.lookupHealthComponent(id);

    Object.keys(healthComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Health component does not have a ${key} property.`
      }
    });

    Validate.atLeast('currentStamina',healthComponent.currentStamina,0);
    Validate.atLeast('currentHealth',healthComponent.currentHealth,0);
    Validate.atLeast('maxHealth',healthComponent.maxHealth,1);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
