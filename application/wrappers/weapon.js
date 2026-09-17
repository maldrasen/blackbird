global.Weapon = function(id) {

  function getItemComponent() { return ItemComponent.lookup(id); }
  function getBaseWeapon() { return BaseEquipment.lookup(getItemComponent().base); }

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
    const item = getItemComponent();
    return item.textKey || getBaseWeapon().getTextKey();
  }

  function getEnchantment() {
    const item = getItemComponent();
    return item.enchantment ? WeaponEnchantment(id, item.enchantment) : null;
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
    hasEnchantment: () => { return getItemComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
  };
}
