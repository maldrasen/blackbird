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

    return {
      getCode: () => { return code; },
      getThreatWeights: () => { return type.threatWeights; },
      getPrioritizedAbilities: () => { return type.prioritizedAbilities; },
      getBaseAttributes: () => { return type.baseAttributes; },
      getAttributeGrowth: () => { return type.attributeGrowth; },
      getBaseSkills: () => { return type.baseSkills; },
      getSkillGrowth: () => { return type.skillGrowth; }
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
