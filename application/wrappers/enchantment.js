global.Enchantment = function(id) {
  const item = Item(id);
  const enchantment = item.enchantment;

  // Ahh this is no longer correct. Each effect now carries its power and should be scaled when the enchantment data
  // is built from the pattern.
  // function getPower() {
  //   const material = item.getPrimaryMaterial();
  //   const potential = (material == null) ? 1 : Material.lookup(material).getFactor(MaterialFactor.potential);
  //   return Math.round(enchantment.power * potential);
  // }

  return {
    getPattern: () => { return enchantment.pattern; },
    getEffects: () => { return enchantment.effects; },
    getProperty: key => { return enchantment.properties?.[key]; },
  };
}
