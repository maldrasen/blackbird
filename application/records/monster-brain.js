global.MonsterBrain = (function() {
  const $brains = {};

  function register(code,data) {
    $brains[code] = data;
  }

  function getAllCodes() {
    return Object.keys($brains);
  }

  function lookup(code) {
    if ($brains[code] == null) { throw new Error(`Bad monster brain code [${code}]`); }

    const brain = { ...$brains[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getThreatWeights: () => { return brain.threatWeights; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
