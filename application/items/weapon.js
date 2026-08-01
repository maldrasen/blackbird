global.Weapon = function(id) {

  function getComponent() { return WeaponComponent.lookup(id); }

  function getBaseWeapon() {
    const component = getComponent();
    return BaseWeapon.lookup(component.base, { material:component.material });
  }

  // A weapon with a material override and no explicit name describes itself with the material - "bone spear".
  function getName() {
    const component = getComponent();
    if (component.name) { return component.name; }

    const baseName = BaseWeapon.lookup(component.base).getName();
    return component.material ? `${Material.lookup(component.material).getName().toLowerCase()} ${baseName}` : baseName;
  }

  function getIcon() {
    return BaseWeapon.lookup(getComponent().base).getIcon();
  }

  function getNameType() {
    return getComponent().nameType || 'common';
  }

  function getTextKey() {
    const component = getComponent();
    return component.textKey || BaseWeapon.lookup(component.base).getTextKey();
  }

  function getEnchantment() {
    const component = getComponent();
    return component.enchantment ? WeaponEnchantment(id, component.enchantment) : null;
  }

  // Only shields carry a reduction profile. It starts at the base weapon's value, but individual pieces will
  // eventually be able to override it, with enchantments for instance.
  function getReduction(type) {
    return getBaseWeapon().getReduction(type);
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon,
    getName,
    getIcon,
    getNameType,
    getTextKey,
    getReduction,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
