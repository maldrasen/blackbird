global.ConsumableEffect = (function() {

  function addHealth(entity, min, max) {
    const value = HealthSystem.addHealth(entity, Random.between(min,max));
    return { type:'add-health', value:value };
  }

  function addMana(entity, color, min, max) {
    const value = ManaSystem.addMana(entity, color, Random.between(min,max));
    return { type:'add-mana', color:color, value:value };
  }

  // TODO: Some effects have only a chance of working, and should return {} when they do nothing.
  function addStatusEffect(entity, code, options) { return {}; }
  function increasePotency(entity, level) { return {}; }

  return {
    addHealth: (min, max) => { return entity => addHealth(entity, min, max); },
    addMana: (color, min, max) => { return entity => addMana(entity, color, min, max); },
    addStatusEffect: (code, options) => { return entity => addStatusEffect(entity, code, options); },
    increasePotency: level => { return entity => increasePotency(entity, level); }
  };

})();
