global.BattleSystem = (function() {

  // TODO: This will need to take into account conditions like vulnerable, once
  //       we have conditions being applied.
  function applyDamage(entity, damage) {
    const health = HealthComponent.lookup(entity);
    health.currentHealth -= damage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      console.log(`Oh no, ${entity} is dead. What now?`);
    }

    HealthComponent.update(entity, health);
  }

  return Object.freeze({
    applyDamage
  });

})()