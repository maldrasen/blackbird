Record.define('EquipmentParameters', {
  getInstance: parameters => ({
    getMaterials: () => { return { ...parameters.materials }; },
    getWeapons: () => { return { ...parameters.weapons }; },
    getArmor: () => { return { ...parameters.armor }; },
    getAmmunition: () => { return { ...parameters.ammunition }; },
    getEnchantmentChance: () => { return parameters.enchantmentChance || 0; },
  }),
});
