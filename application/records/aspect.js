global.Aspect = (function() {

  const aspects = {};

  function register(code,data) { aspects[code] = data; }
  function getAllCodes() { return Object.keys(aspects); }

  // The lookup() function returns a wrapper for the aspect data object.
  function lookup(code) {
    if (aspects[code] == null) { throw new Error(`Bad aspect code [${code}]`); }

    const aspect = { ...aspects[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return aspect.name; },
      getDescription: () => { return aspect.description; },
      isLeveled: () => { return aspect.leveled === true; },
      getMaxLevel: () => { return aspect.leveled ? 3 : 1; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
