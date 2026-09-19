global.EquipmentParameters = (function() {
  const equipmentParameters = {};

  function register(code,data) {
    equipmentParameters[code] = data;
  }

  function getAllCodes() {
    return Object.keys(equipmentParameters);
  }

  function lookup(code) {
    if (equipmentParameters[code] == null) { throw new Error(`Bad equipment parameters code [${code}]`); }

    const parameters = { ...equipmentParameters[code] };

    return {
      getCode: () => { return code; },
      getMaterials: () => { return { ...parameters.materials }; },
      getArmors: () => { return { ...parameters.armors }; },
      getWeapons: () => { return { ...parameters.weapons }; },
      getEnchantments: () => { return { ...parameters.enchantment }; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
