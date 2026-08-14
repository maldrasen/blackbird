global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }
  function getBaseArmor() { return BaseArmor.lookup(getComponent().base); }

  function getName() {
    const component = getComponent();
    return component.name || BaseArmor.lookup(component.base).getName();
  }

  function getIcon() {
    return getBaseArmor().getIcon();
  }

  function getReduction(type) {
    return getBaseArmor().getReduction(type);
  }

  function getEnchantment() {
    const component = getComponent();
    return component.enchantment ? ArmorEnchantment(id, component.enchantment) : null;
  }

  function getPrimaryMaterial() { return getBaseArmor().getPrimaryMaterial(); }
  function isMetal() { return getBaseArmor().isMetal(); }

  return {
    getId: () => { return id; },
    getBaseArmor,
    getName,
    getIcon,
    getReduction,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
    isMetal,
  };
}
