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

    // TODO: Remove description, moving to the same startText objects that the cohorts use.

    return {
      getCode: () => { return code; },
      getDescription: () => { return encounter.description; },
      getFormation: () => { return encounter.formation; },
      getMonsters: () => { return encounter.monsters; },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
