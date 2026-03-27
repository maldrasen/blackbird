global.SexualPreference = (function() {
  const $sexualPreferences = {};

  function register(code,data) {
    $sexualPreferences[code] = data;
  }

  function getAllCodes() {
    return Object.keys($sexualPreferences);
  }

  function lookup(code) {
    if ($sexualPreferences[code] == null) { throw new Error(`Bad sexual preference code [${code}]`); }

    const preference = { ...$sexualPreferences[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return preference.name; },
      getAntiname: () => { return preference.antiname || `Anti-${preference.name}` },
      getSensations: () => { return preference.sensations; },
      getRequires: () => { return preference.requires; },
      isNegativeAllowed: () => { return preference.antiname != null; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
