global.MonsterType = (function() {
  const types = {};

  function register(code,data) {
    types[code] = data;
  }

  function getAllCodes() {
    return Object.keys(types);
  }

  function lookup(code) {
    if (types[code] == null) { throw new Error(`Bad monster type code [${code}]`); }

    const type = { ...types[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getThreatWeights: () => { return type.threatWeights; },
      getPrioritizedAbilities: () => { return type.prioritizedAbilities; },
      getAttributeGrowth: () => { return type.attributeGrowth; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
