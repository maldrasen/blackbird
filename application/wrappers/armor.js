global.Armor = function(id) {

  function getItemComponent() { return ItemComponent.lookup(id); }
  function getArmorComponent() { return ArmorComponent.lookup(id); }
  function getBaseArmor() { return BaseEquipment.lookup(getArmorComponent().base); }

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
    const component = getArmorComponent();
    return component.enchantment ? ArmorEnchantment(id, component.enchantment) : null;
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
    hasEnchantment: () => { return getArmorComponent().enchantment != null; },
    getEnchantment,
    getPrimaryMaterial,
    isMetal: () => { return Material.isMetal(getPrimaryMaterial()); },
  };
}
