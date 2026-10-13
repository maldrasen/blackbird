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

  // If the BaseEquipment doesn't define a type, then its type is the same as the equipment slot.
  function getType() {
    return getBase().getType() || getBase().getSlot();
  }

  // TODO: Item Descriptions.
  function getDescription() {
    return `[TODO Item Descriptions]`;
  }

  // An item is as rare as its enchantment. Plain armor and weapons are common whatever they're made of.
  function getRarity() {
    return hasEnchantment() ? getEnchantment().getRarity() : Rarity.common;
  }

  function hasEnchantment() { return getItemComponent().enchantment != null; }
  function getEnchantment() { return hasEnchantment() ? Enchantment(id) : null; }

  // TODO: For now, all bows use ammunition. I'm anticipating though that there will be bow enchantments for bows with
  //       magical ammunition. Drawing a bow could create a 'magical' arrow, and fire that instead of using whatever's
  //       in the quiver. When we get the ammunition when calculating bow damage we'll need to remember to lookup the
  //       ammunition properties off of the bow enchantment, rather than using what's in the quiver. We won't decrement
  //       the ammunition either.
  function usesAmmunition() { return getType() === ItemType.bow; }

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
    getType,
    getTextKey,
    getReduction,
    getDamageRange,
    getPrimaryMaterial,
    isMetal: () => { return Material.isMetal(getPrimaryMaterial()); },
    hasEnchantment,
    getEnchantment,
    usesAmmunition,
    getValue: () => { return getItemComponent().value; },
    getTags: () => { return getItemComponent().tags || []; },
    isLewd: () => { return getBase().isLewd(); },
  };
}
