global.SexualPreference = (function() {
  const $sexualPreferences = {};

  function register(code,data) {
    $sexualPreferences[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexualPreferences);
  }

  function lookup(code) {
    if ($sexualPreferences[code] === null) { throw `Bad sexual preference code [${code}]` }

    const preference = { ...$sexualPreferences[code] };

    return Object.freeze({
      getCode: () => { return preference.code; },
      getName: () => { return preference.name; },
      getAntiname: () => { return preference.antiname || `Anti-${preference}` },
      getSensations: () => { return preference.sensations; },
      isNegativeAllowed: () => { return (preference.allowNegative !== false); }
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
