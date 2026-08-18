global.Cohort = (function() {
  const cohorts = {};

  function register(code,data) {
    cohorts[code] = data;
  }

  function lookup(code) {
    if (cohorts[code] == null) { throw new Error(`Bad archetype code [${code}]`); }

    const cohort = { ...cohorts[code] };

    return {
      getCode: () => { return code; },
      getMonsters: () => { return cohort.monsters; },
    };
  }

  return {
    register,
    lookup,
  };

})();
