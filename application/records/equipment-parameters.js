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
      getWeapons: () => { return { ...parameters.weapons }; },
      getArmor: () => { return { ...parameters.armor }; },
      getEnchantments: () => { return { ...parameters.enchantments }; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
