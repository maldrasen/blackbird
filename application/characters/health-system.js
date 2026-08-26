global.HealthSystem = (function() {

  function lookup(id) {
    const health = HealthComponent.lookup(id);
    if (health == null) { throw new Error(`Entity[${id}] has no health component.`); }
    return health;
  }

  // Returns the amount actually gained, which is less than asked for when healed past full health.
  function addHealth(id, amount) {
    Validate.atLeast('HealthSystem.amount', amount, 0);

    const health = lookup(id);
    const before = health.currentHealth;

    health.currentHealth += amount;
    HealthComponent.update(id, health);

    return lookup(id).currentHealth - before;
  }

  return {
    addHealth,
  };

})();
