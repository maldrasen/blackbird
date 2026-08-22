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

    return {
      getCode: () => { return code; },
      getFormation: () => { return encounter.formation; },
      getMonsters: () => { return encounter.monsters; },
      getStartText: (ambushState, context={}) => {
        return encounter.startText ? encounter.startText[ambushState].pick(context) : null;
      },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
