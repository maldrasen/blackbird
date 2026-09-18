global.ArmorEnchantment = function(id, enchantment) {
  const armor = Armor(id);

  function getPower() {
    const material = armor ? armor.getPrimaryMaterial() : null;
    const potential = (material == null) ? 1 : Material.lookup(material).getFactor(MaterialFactor.potential);
    return Math.round(enchantment.power * potential);
  }

  // TODO: Dispatch the actual armor enchantment effects here once they exist (e.g. a resist enchantment boosting the
  //       wearer's resistance rolls), following the switch pattern WeaponEnchantment uses for its on-hit effects.

  return {
    getType: () => { return enchantment.type; },
    getPower,
  };
}
