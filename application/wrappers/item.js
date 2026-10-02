global.Item = function(id) {

  function getItemComponent() { return ItemComponent.lookup(id); }
  function getBase() { return BaseEquipment.lookup(getItemComponent().base); }

  function getTextKey() {
    return getItemComponent().textKey || getBase().getTextKey();
  }

  function getPrimaryMaterial() {
    return Object.keys(getItemComponent().materials)[0];
  }

  // The record's reduction profile is authored at steel quality. The record doesn't know what the item was made
  // from, so the scaling down to what this piece really turns away happens here.
  function getReduction(type) {
    return ItemHelper.getScaledReduction(getBase().getReductionMap(), getPrimaryMaterial(), type);
  }

  // The damage range is authored at baseline quality the same way, and scales with the primary material too.
  function getDamageRange() {
    return ItemHelper.getScaledDamageRange(getBase(), getPrimaryMaterial());
  }

  // Shields are filed with the armor in the inventory.
  function getCategory() {
    return getBase().isWeapon() ? InventoryCategory.weapon : InventoryCategory.armor;
  }

  // Weapon and armor enchantments are still separate models. Shields take armor enchantments.
  function getEnchantment() {
    const enchantment = getItemComponent().enchantment;
    if (enchantment == null) { return null; }
    return getBase().isWeapon() ? WeaponEnchantment(id, enchantment) : ArmorEnchantment(id, enchantment);
  }

  return {
    getId: () => { return id; },
    getBase,
    getName: () => { return getItemComponent().name; },
    getNameType: () => { return getItemComponent().nameType; },
    getIcon: () => { return getBase().getIcon(); },
    getSkill: () => { return getBase().getSkill(); },
    getCategory,
    getTextKey,
    getReduction,
    getDamageRange,
    getPrimaryMaterial,
    isMetal: () => { return Material.isMetal(getPrimaryMaterial()); },
    hasEnchantment: () => { return getItemComponent().enchantment != null; },
    getEnchantment,
    getValue: () => { return getItemComponent().value; },
    isLewd: () => { return getBase().isLewd(); },
  };
}
