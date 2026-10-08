global.Enchantment = function(id) {
  const item = ItemComponent.lookup(id);
  const enchantment = item.enchantment;
  const pattern = EnchantmentPattern.lookup(enchantment.pattern);

  const wrapper = {
    getPattern: () => { return enchantment.pattern; },
    getEffects: () => { return enchantment.effects; },
    getProperty: key => { return enchantment.properties[key]; },
    getTrigger: () => { return pattern.getTrigger(); },
    processBeforeHit: (context, damageTypes) => { return pattern.processBeforeHit(wrapper, context, damageTypes); },
    processAfterHit: context => { return pattern.processAfterHit(wrapper, context); },
  };

  return wrapper;
}
