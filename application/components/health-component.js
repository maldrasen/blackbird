global.HealthComponent = (function() {
  const $properties = ['currentStamina','currentHealth','maxHealth'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.health,data);
    moderate(id);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.health,data);
    moderate(id);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.health);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.health);
  }

  // Rather than moderating the health values every time we need to change them, it makes more sense to just clamp
  // these values in the component itself. It's not really a problem if something tries to set health to a value
  // higher or lower than it should be able to go. Other components may benefit from a moderate function like this too.
  function moderate(id) {
    const healthComponent = lookup(id);
    const maxStamina = AttributesComponent.createWrapper({ id:id }).getMaxStamina();

    if (healthComponent.currentHealth < 0) { healthComponent.currentHealth = 0 }
    if (healthComponent.currentHealth > healthComponent.maxHealth) {
      healthComponent.currentHealth = healthComponent.maxHealth; }

    if (healthComponent.currentStamina < 0) { healthComponent.currentStamina = 0; }
    if (healthComponent.currentStamina > maxStamina) {
      healthComponent.currentStamina = maxStamina;
    }

    healthComponent.currentStamina = Math.floor(healthComponent.currentStamina);
  }

  function validate(id) {
    const healthComponent = lookup(id);
    Object.keys(healthComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Health component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
