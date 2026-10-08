global.Enchantment = function(id) {
  const item = ItemComponent.lookup(id);
  const enchantment = item.enchantment;
  const pattern = EnchantmentPattern.lookup(enchantment.pattern);

  const wrapper = {
    getPattern: () => { return enchantment.pattern; },
    getEffects: () => { return enchantment.effects; },
    getProperty: key => { return enchantment.properties[key]; },
    getTrigger: () => { return pattern.getTrigger(); },
    processOnHit: (context, damageTypes) => { return pattern.processOnHit(wrapper, context, damageTypes); },
  };

  return wrapper;
}
