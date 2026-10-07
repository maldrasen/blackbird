Record.define('EquipmentParameters', {
  getInstance: parameters => ({
    getMaterials: () => { return { ...parameters.materials }; },
    getWeapons: () => { return { ...parameters.weapons }; },
    getArmor: () => { return { ...parameters.armor }; },
    getEnchantments: () => { return { ...parameters.enchantments }; },
  }),
});
