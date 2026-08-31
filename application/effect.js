global.Effect = (function() {

  function apply(entity, effect) {
    switch (effect.type) {
      case 'restore-health': return restoreHealth(entity, effect);
      case 'restore-mana': return restoreMana(entity, effect);
      case 'status-effect': return applyStatusEffect(entity, effect);
      case 'increase-potency': return applyPotency(entity, effect);
      default: throw new Error(`The [${effect.type}] effect cannot be applied out of battle.`);
    }
  }

  function restoreHealth(entity, effect) {
    const value = HealthSystem.addHealth(entity, Random.between(effect.min, effect.max));
    return { type:'add-health', value:value };
  }

  function restoreMana(entity, effect) {
    const value = ManaSystem.restoreMana(entity, effect.color, Random.between(effect.min, effect.max));
    return { type:'add-mana', color:effect.color, value:value };
  }

  // TODO: Some effects have only a chance of working, and should return {} when they do nothing.
  function applyStatusEffect(entity, effect) {
    return {};
  }

  function applyPotency(entity, effect) { return {}; }

  return {
    apply,
    restoreHealth: (min, max) => { return { type:'restore-health', min, max }; },
    restoreMana: (color, min, max) => { return { type:'restore-mana', color, min, max }; },
    damage: (damageType, damage) => { return { type:'damage', damageType, damage }; },
    blind: options => { return { type:'status-effect', code:'blind', ...options }; },
    stun: options => { return { type:'status-effect', code:'stun', ...options }; },
    increasePotency: level => { return { type:'increase-potency', level }; },
  };

})();
