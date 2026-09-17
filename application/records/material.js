global.Material = (function() {
  const metals = ['iron','steel','silver'];
  const materials = {};

  function register(code,data) {
    materials[code] = data;
  }

  function getAllCodes() {
    return Object.keys(materials);
  }

  function isMetal(code) {
    return metals.includes(code);
  }

  function forType(type) {
    switch (type) {
      case MaterialType.bendy:   return ['wood','steel'];              // Bows and crossbows.
      case MaterialType.pliable: return ['wool','silk','leather'];     // Clothing.
      case MaterialType.hard:    return [...metals];                   // Rigid metal armors.
      case MaterialType.pointy:  return [...metals,'bone','flint'];    // Spears and arrows, can be sharpened to a point.
      case MaterialType.sharp:   return [...metals,'flint'];           // Swords and axes, will hold an edge.
      case MaterialType.heavy:   return [...metals,'bone','stone'];    // Crushing weapons like clubs or maces.
    }
  }

  function lookup(code) {
    if (materials[code] == null) { throw new Error(`Bad material code [${code}]`); }

    const material = { ...materials[code] };

    // Look up one of the material's performance factors (see MaterialFactor). Throws if the material does not define
    // the requested factor, which flags an invalid material/item combination (a wool sword has no sharpness).
    function getFactor(name) {
      const factor = (material.factors || {})[name];
      if (factor == null) { throw new Error(`Material [${code}] has no ${name} factor`); }
      return factor;
    }

    return {
      getCode: () => { return code; },
      getName: () => { return material.name; },
      getCost: () => { return material.cost; },
      getFactor,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
    forType,
    isMetal,
  };

})();
