global.Armor = function(id) {

  function getComponent() { return ArmorComponent.lookup(id); }

  function getBaseArmor() {
    const component = getComponent();
    return BaseArmor.lookup(component.base, { material:component.material });
  }

  // As with weapons, a material override with no explicit name describes itself with the material - "bone cuirass".
  function getName() {
    const component = getComponent();
    if (component.name) { return component.name; }

    const baseName = BaseArmor.lookup(component.base).getName();
    return component.material ? `${Material.lookup(component.material).getName().toLowerCase()} ${baseName}` : baseName;
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

  return Object.freeze({
    getId: () => { return id; },
    getBaseArmor,
    getName,
    getIcon,
    getReduction,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
    isMetal,
  });
}
