global.BaseArmor = (function() {
  const armors = {};

  function register(code,data) {
    armors[code] = data;
  }

  function getAllCodes() {
    return Object.keys(armors);
  }

  // As with BaseWeapon, an item instance can override the material of the primary part, scaling the reduction and
  // value to the substituted material.
  function lookup(code, options={}) {
    if (armors[code] == null) { throw new Error(`Bad base armor code [${code}]`); }

    const armor = { ...armors[code] };
    if (options.material) {
      armor.materials = ItemHelper.substitutePrimaryMaterial(armor.materials, options.material);
    }
    const materials = HasMaterials(armor);
    const reduction = HasReduction(armor);

    function getValue() {
      const construction = materials.getMaterialCost() + ((armor.effort || 0) * _effortCost);
      const performance = ItemHelper.getArmorValueFactor(reduction.getTotalReduction());
      return Math.round((construction * performance) / 5) * 5;
    }

    return Object.freeze({
      ...materials,
      ...reduction,
      getCode: () => { return code; },
      getName: () => { return armor.name; },
      getIcon: () => { return armor.icon; },
      getSlot: () => { return armor.slot; },
      getEffort: () => { return armor.effort || 0; },
      getValue,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
