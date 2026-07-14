global.BaseArmor = (function() {
  const armors = {};

  // The skill register() function also needs to add the skill code as a property of the Skills component.
  function register(code,data) {
    armors[code] = data;
  }

  function getAllCodes() {
    return Object.keys(armors);
  }

  function lookup(code) {
    if (armors[code] == null) { throw new Error(`Bad base armor code [${code}]`); }

    const armor = { ...armors[code] };

    // Materials is an object keyed by the part it makes up ({ body:{...}, backing:{...} }), the same shape weapons
    // use. The first part listed is the primary one - its material's absorption is what scales the armor's reduction.
    function getMaterialParts() {
      return Object.entries(armor.materials || {}).map(([part,entry]) => ({ part, ...entry }));
    }

    function getPrimaryMaterial() {
      const parts = getMaterialParts();
      return parts.length ? parts[0].material : null;
    }

    // The reduction profile describes how much of each physical damage type the armor's shape turns away at steel
    // quality. That profile is then scaled by how well the primary material actually absorbs a blow, so the same
    // breastplate shape protects far less when it is boiled leather instead of steel plate.
    function getReduction(type) {
      const base = (armor.reduction || {})[type] || 0;
      const material = getPrimaryMaterial();
      const absorption = (material == null) ? 1 : Material.getFactor(material,MaterialFactor.absorption);
      return Math.round(base * absorption);
    }

    function getReductionMap() {
      const map = {};
      [DamageType.crush, DamageType.slash, DamageType.pierce].forEach(type => { map[type] = getReduction(type); });
      return map;
    }

    function getMaterialCost() {
      return getMaterialParts().reduce((sum,entry) => sum + (Material.getCost(entry.material) * entry.amount), 0);
    }

    function getTotalReduction() {
      const reduction = getReductionMap();
      return reduction[DamageType.crush] + reduction[DamageType.slash] + reduction[DamageType.pierce];
    }

    function getValue() {
      const construction = getMaterialCost() + ((armor.effort || 0) * _effortCost);
      const performance = ItemHelper.getArmorValueFactor(getTotalReduction());
      return Math.round((construction * performance) / 5) * 5;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return armor.name; },
      getSlots: () => { return armor.slots; },
      getReduction,
      getReductionMap,
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
