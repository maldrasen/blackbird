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

  // The damage range is authored at baseline quality the same way, and scales with the primary material too. The
  // scaled damage range of a weapon is its attack power. We call this value the attack power in the view because the
  // actual damage values depend still on the character's strength and skill, and it would be confusing when the
  // damage numbers don't match.
  function getDamageRange() {
    return ItemHelper.getScaledDamageRange(getBase(), getPrimaryMaterial());
  }

  // Shields are filed with the armor in the inventory.
  function getCategory() {
    return getBase().isWeapon() ? InventoryCategory.weapon : InventoryCategory.armor;
  }

  function getDescription() {
    return `[TODO Item Descriptions]`;
  }

  // TODO: Item rarity will depend on its enchantment. We can hold off on this until task 228 when we start
  //       adding more enchantments to the game. For now, all normal armor and weapons are common.
  function getRarity() { return Rarity.common; }

  return {
    getId: () => { return id; },
    getBase,
    getName: () => { return getItemComponent().name; },
    getNameType: () => { return getItemComponent().nameType; },
    getDescription,
    getRarity,
    getIcon: () => { return getBase().getIcon(); },
    getSkill: () => { return getBase().getSkill(); },
    getCategory,
    getTextKey,
    getReduction,
    getDamageRange,
    getPrimaryMaterial,
    isMetal: () => { return Material.isMetal(getPrimaryMaterial()); },
    hasEnchantment: () => { return getItemComponent().enchantment != null; },
    getEnchantment: () => { return getItemComponent().enchantment ? Enchantment(id) : null; },
    getValue: () => { return getItemComponent().value; },
    isLewd: () => { return getBase().isLewd(); },
  };
}
