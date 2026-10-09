Record.define('EquipmentParameters', {
  getInstance: parameters => ({
    getMaterials: () => { return { ...parameters.materials }; },
    getWeapons: () => { return { ...parameters.weapons }; },
    getArmor: () => { return { ...parameters.armor }; },
    getEnchantmentChance: () => { return parameters.enchantmentChance || 0; },
  }),
});
