global.MonsterType = (function() {
  const types = {};

  function register(code,data) {
    types[code] = data;
  }

  function getAllCodes() {
    return Object.keys(types);
  }

  function compile() {
    Object.values(types).forEach(type => {
      if (type.buildAbilities) { type.abilities = type.buildAbilities(); }
    });
  }

  function lookup(code) {
    if (types[code] == null) { throw new Error(`Bad monster type code [${code}]`); }

    const type = { ...types[code] };

    return {
      getCode: () => { return code; },
      getPreferredPosition: () => { return type.preferredPosition || 'flexible'; },
      getThreatWeights: () => { return type.threatWeights; },
      getAbilities: () => { return type.abilities || []; },
      getAttributes: () => { return type.attributes; },
      getAttributeGrowth: () => { return type.attributeGrowth; },
      getBaseSkills: () => { return type.baseSkills; },
      getSkillGrowth: () => { return type.skillGrowth; }
    };
  }

  return {
    register,
    getAllCodes,
    compile,
    lookup,
  };

})();
