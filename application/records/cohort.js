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

    function getStartText(ambushState, context={}) {
      const pack = (cohort.startText || {})[ambushState];
      if (pack == null) { throw new Error(`Cohort [${code}] has no start text for [${ambushState}]`); }
      return pack.pick(context);
    }

    return {
      getCode: () => { return code; },
      getMonsters: () => { return cohort.monsters; },
      getStartText,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
