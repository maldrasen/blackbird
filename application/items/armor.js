global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseArmor.lookup(component.base).getName();
  }

  function getIcon() {
    return BaseArmor.lookup(getComponent().base).getIcon();
  }

  function getEnchantment() {
    const component = getComponent();
    return component.enchantment ? ArmorEnchantment(id, component.enchantment) : null;
  }

  // The reduction starts at the base armor's value, but individual pieces will eventually be able to override it,
  // with enchantments for instance.
  function getReduction(type) {
    return BaseArmor.lookup(getComponent().base).getReduction(type);
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseArmor: () => { return BaseArmor.lookup(getComponent().base); },
    getName,
    getIcon,
    getReduction,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
