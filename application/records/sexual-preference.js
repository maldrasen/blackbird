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

    const getDefaultValue = function(entity) {
      if (preference.defaultValue == null) { return 0; }
      if (!isNaN(preference.defaultValue)) { return preference.defaultValue; }

      // Gender based default preference.
      if (preference.defaultValue.male) {
        return preference.defaultValue[ActorComponent.lookup(entity).gender];
      }

      throw `Invalid SexualPreference[${preference.code}].defaultValue`
    };

    return Object.freeze({
      getCode: () => { return preference.code; },
      getName: () => { return preference.name; },
      getAntiname: () => { return preference.antiname || `Anti-${preference}` },
      getDefaultValue,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
