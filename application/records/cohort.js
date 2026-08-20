global.Cohort = (function() {
  const cohorts = {};

  function register(code,data) {
    cohorts[code] = data;
  }

  function getAllCodes() {
    return Object.keys(cohorts);
  }

  function lookup(code) {
    if (cohorts[code] == null) { throw new Error(`Bad cohort code [${code}]`); }

    const cohort = { ...cohorts[code] };

    return {
      getCode: () => { return code; },
      getMonsters: () => { return cohort.monsters; },
      getStartText: (ambushState, context={}) => { return cohort.startText[ambushState].pick(context); },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
