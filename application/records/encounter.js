global.Encounter = (function() {
  const encounters = {};

  function register(code,data) {
    encounters[code] = data;
  }

  function getAllCodes() {
    return Object.keys(encounters);
  }

  function lookup(code) {
    if (encounters[code] == null) { throw new Error(`Bad encounter code [${code}]`); }

    const encounter = { ...encounters[code] };

    function getFormation() {
      return encounter.formation.map(rank => rank.map(index => {
        const definition = encounter.monsters[index];
        if (definition == null) { return null; }
        if (definition.code == null) { throw new Error(`No code in monster definition [${index}]`); }
        return definition.code;
      }));
    }

    // TODO: Remove description, moving to the same startText objects that the cohorts use.

    return {
      getCode: () => { return code; },
      getDescription: () => { return encounter.description; },
      getFormation,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
