global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseArmor.lookup(component.base).getName();
  }

  function getEnchantment() {
    const component = getComponent();
    return component.enchantment ? ArmorEnchantment(id, component.enchantment) : null;
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseArmor: () => { return BaseArmor.lookup(getComponent().base); },
    getName,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
