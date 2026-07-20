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

  return Object.freeze({
    getId: () => { return id; },
    getBaseArmor: () => { return BaseArmor.lookup(getComponent().base); },
    getName,
    getIcon,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
