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
    const reduction = HasReduction(armor);

    // Materials is an object keyed by the part it makes up ({ body:{...}, backing:{...} }), the same shape weapons
    // use. The first part listed is the primary one - its material's absorption is what scales the armor's reduction.
    function getMaterialParts() {
      return Object.entries(armor.materials || {}).map(([part,entry]) => ({ part, ...entry }));
    }

    function getPrimaryMaterial() {
      const parts = getMaterialParts();
      return parts.length ? parts[0].material : null;
    }

    function getMaterialCost() {
      return getMaterialParts().reduce((sum,entry) => sum + (Material.getCost(entry.material) * entry.amount), 0);
    }

    function getValue() {
      const construction = getMaterialCost() + ((armor.effort || 0) * _effortCost);
      const performance = ItemHelper.getArmorValueFactor(reduction.getTotalReduction());
      return Math.round((construction * performance) / 5) * 5;
    }

    return Object.freeze({
      ...reduction,
      getCode: () => { return code; },
      getName: () => { return armor.name; },
      getIcon: () => { return armor.icon; },
      getSlot: () => { return armor.slot; },
      getMaterials: () => { return armor.materials || {}; },
      getMaterialParts,
      getPrimaryMaterial,
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
