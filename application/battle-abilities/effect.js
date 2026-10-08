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
    resistDamage: (damageType, percent) => { return { type:'resist-damage', damageType, percent }; },
    resistEffect: (effect, strength) => { return { type:'resist-effect', effect, strength }; },
    restoreHealth: (min, max) => { return { type:'restore-health', min, max }; },
    restoreMana: (color, min, max) => { return { type:'restore-mana', color, min, max }; },
    damage: (damageType, damage) => { return { type:'damage', damageType, damage }; },

    // TODO: By just passing an options object, it's not obvious what options a status effect effect should have...
    //       Perhaps Effect.statusEffect(effect,strength) would be better than a function for each effect type? It's
    //       unfortunate that status effect and effect have completely different meanings in this context.

    blind: options => { return { type:'status-effect', code:'blind', ...options }; },
    burn: options => { return { type:'status-effect', code:'burn', ...options }; },
    stun: options => { return { type:'status-effect', code:'stun', ...options }; },
    poison: options => { return { type:'status-effect', code:'poison', ...options }; },
    vulnerable: options => { return { type:'status-effect', code:'vulnerable', ...options }; },

    increasePotency: level => { return { type:'increase-potency', level }; },
  };

})();
