global.ConsumableEffect = (function() {

  function addHealth(entity, min, max) {
    const value = HealthSystem.addHealth(entity, Random.between(min,max));
    return { type:'add-health', value:value };
  }

  function restoreMana(entity, color, min, max) {
    const value = ManaSystem.restoreMana(entity, color, Random.between(min,max));
    return { type:'add-mana', color:color, value:value };
  }

  // TODO: Some effects have only a chance of working, and should return {} when they do nothing.
  function addStatusEffect(entity, code, options) { return {}; }
  function increasePotency(entity, level) { return {}; }

  return {
    addHealth: (min, max) => { return entity => addHealth(entity, min, max); },
    restoreMana: (color, min, max) => { return entity => restoreMana(entity, color, min, max); },
    addStatusEffect: (code, options) => { return entity => addStatusEffect(entity, code, options); },
    increasePotency: level => { return entity => increasePotency(entity, level); }
  };

})();
