global.Armor = function(id) {

  function getItemComponent() { return ItemComponent.lookup(id); }
  function getBaseArmor() { return BaseEquipment.lookup(getItemComponent().base); }

  function getName() {
    return getItemComponent().name;
  }

  function getIcon() {
    return getBaseArmor().getIcon();
  }

  function getReduction(type) {
    return getBaseArmor().getReduction(type);
  }

  function getEnchantment() {
    const item = getItemComponent();
    return item.enchantment ? ArmorEnchantment(id, item.enchantment) : null;
  }

  function getPrimaryMaterial() {
    return Object.keys(getItemComponent().materials)[0];
  }

  return {
    getId: () => { return id; },
    getBaseArmor,
    getName,
    getIcon,
    getReduction,
    hasEnchantment: () => { return getItemComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
    isMetal: () => { return Material.isMetal(getPrimaryMaterial()); },
  };
}
