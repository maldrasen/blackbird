global.Enchantment = function(id) {
  const item = ItemComponent.lookup(id);
  const enchantment = item.enchantment;

  return {
    getPattern: () => { return enchantment.pattern; },
    getEffects: () => { return enchantment.effects; },
    getProperty: key => { return enchantment.properties?.[key]; },
  };
}
