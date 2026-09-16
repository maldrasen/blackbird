global.BaseArmor = (function() {
  const armors = {};

  function register(code,data) {
    armors[code] = data;
  }

  function getAllCodes() {
    return Object.keys(armors);
  }

  function lookup(code) {
    if (armors[code] == null) { throw new Error(`Bad base armor code [${code}]`); }

    const armor = { ...armors[code] };

    function getName(materials) {
      const materialNames = Object.keys(materials).map(key => Material.lookup(key).getName());
      return armor.nameFunction ? armor.nameFunction(materialNames,materials) : armor.name;
    }

    return {
      getCode: () => { return code; },
      getName,
      getIcon: () => { return armor.icon; },
      getSlot: () => { return armor.slot; },
      getReduction: () => { return armor.reduction; },
      getMaterials: () => { return armor.materials; },
      getEffort: () => { return armor.effort || 0; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
