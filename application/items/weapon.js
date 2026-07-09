global.Weapon = function(id) {

  function getComponent() { return WeaponComponent.lookup(id); }

  function getName() {
    const component = getComponent();
    return component.name || BaseWeapon.lookup(component.base).getName();
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

  return Object.freeze({
    getId: () => { return id; },
    getBaseWeapon: () => { return BaseWeapon.lookup(getComponent().base); },
    getName,
    getNameType,
    getTextKey,
    hasEnchantment: () => { return getComponent().enchantment != null; },
    getEnchantment,
  });
}
