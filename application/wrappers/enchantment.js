global.Enchantment = function(id) {
  const item = ItemComponent.lookup(id);
  const enchantment = item.enchantment;
  const pattern = EnchantmentPattern.lookup(enchantment.pattern);

  // An item carrying more than one resistance effect for the same thing stacks their strengths.
  function getDamageResistance(damageType) {
    return sumStrengths(effect => effect.type === 'resist-damage' && effect.damageType === damageType);
  }

  function getEffectResistance(code) {
    return sumStrengths(effect => effect.type === 'resist-effect' && effect.effect === code);
  }

  function sumStrengths(matches) {
    return enchantment.effects.filter(matches).reduce((total, effect) => total + effect.strength, 0);
  }

  const wrapper = {
    getPattern: () => { return enchantment.pattern; },
    getEffects: () => { return enchantment.effects; },
    getProperty: key => { return enchantment.properties[key]; },
    getTrigger: () => { return pattern.getTrigger(); },
    getRarity: () => { return pattern.getRarity(); },
    getDamageResistance,
    getEffectResistance,
    processBeforeHit: (context, damageTypes) => { return pattern.processBeforeHit(wrapper, context, damageTypes); },
    processAfterHit: context => { return pattern.processAfterHit(wrapper, context); },
  };

  return wrapper;
}
