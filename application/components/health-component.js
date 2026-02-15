global.HealthComponent = (function() {
  const $properties = ['currentStamina','currentHealth','maxHealth'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.health,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.health,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.health);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.health);
  }

  function validate(id) {
    const healthComponent = lookup(id);

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
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
