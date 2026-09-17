global.Weapon = function(id) {

  function getItemComponent() { return ItemComponent.lookup(id); }
  function getWeaponComponent() { return WeaponComponent.lookup(id); }
  function getBaseWeapon() { return BaseEquipment.lookup(getWeaponComponent().base); }

  function getName() {
    return getItemComponent().name;
  }

  function getIcon() {
    return getBaseWeapon().getIcon();
  }

  function getNameType() {
    return getItemComponent().nameType;
  }

  function getTextKey() {
    const weapon = getWeaponComponent();
    return weapon.textKey || getBaseWeapon().getTextKey();
  }

  function getEnchantment() {
    const weapon = getWeaponComponent();
    return weapon.enchantment ? WeaponEnchantment(id, weapon.enchantment) : null;
  }

  function getPrimaryMaterial() {
    return Object.keys(getItemComponent().materials)[0];
  }

  return {
    getId: () => { return id; },
    getBaseWeapon,
    getSkill: () => { return getBaseWeapon().getSkill() },
    getName,
    getIcon,
    getNameType,
    getTextKey,
    hasEnchantment: () => { return getWeaponComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
  };
}
