global.BaseArmor = (function() {
  const armors = {};

  function register(code,data) {
    armors[code] = data;
  }

  // As with BaseWeapon, a variant is a derived record with the primary part's material swapped, registered in the
  // same data file as its base, after it.
  function registerVariant(code, baseCode, options) {
    if (armors[baseCode] == null) { throw new Error(`Bad base armor code [${baseCode}]`); }

    const base = armors[baseCode];
    armors[code] = {
      ...base,
      name: options.name || `${options.material} ${base.name}`,
      materials: ItemHelper.substitutePrimaryMaterial(base.materials, options.material),
    };
  }

  function getAllCodes() {
    return Object.keys(armors);
  }

  function lookup(code) {
    if (armors[code] == null) { throw new Error(`Bad base armor code [${code}]`); }

    const armor = { ...armors[code] };
    const materials = HasMaterials(armor);
    const reduction = HasReduction(armor);

    function getValue() {
      const construction = materials.getMaterialCost() + ((armor.effort || 0) * _effortCost);
      const performance = ItemHelper.getArmorValueFactor(reduction.getTotalReduction());
      return Math.round((construction * performance) / 5) * 5;
    }

    return {
      ...materials,
      ...reduction,
      getCode: () => { return code; },
      getName: () => { return armor.name; },
      getIcon: () => { return armor.icon; },
      getSlot: () => { return armor.slot; },
      getEffort: () => { return armor.effort || 0; },
      getValue,
    };
  }

  return {
    register,
    registerVariant,
    getAllCodes,
    lookup,
  };

})();
