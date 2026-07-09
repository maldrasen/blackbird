global.Material = (function() {
  const materials = {};

  function register(code,data) {
    materials[code] = data;
  }

  function getAllCodes() {
    return Object.keys(materials);
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

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return material.name; },
      getCost: () => { return material.cost; },
      getFactor,
    });
  }

  function getCost(code) {
    return lookup(code).getCost();
  }

  function getFactor(code,name) {
    return lookup(code).getFactor(name);
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
    getCost,
    getFactor,
  });

})();
