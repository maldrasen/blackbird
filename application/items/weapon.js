global.Weapon = function(id) {

  function getComponent() { return WeaponComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseWeapon.lookup(component.base).getName();
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
    return BaseWeapon.lookup(getComponent().base).getReduction(type);
  }

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseWeapon.lookup(getComponent().base); },
    getName,
    getIcon,
    getNameType,
    getTextKey,
    getReduction,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
