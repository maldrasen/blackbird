global.Archetype = (function() {
  const $archetypes = {};

  function register(code,data) {
    $archetypes[code] = data;
  }

  function lookup(code) {
    if ($archetypes[code] == null) { throw `Bad archetype code [${code}]` }

    const archetype = { ...$archetypes[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return archetype.name; },
      getSexStyle: () => { return archetype.sexStyle; },
      getSexualityRatio: () => { return archetype.sexualityRatio; },
      getSexualPreferences: () => { return archetype.sexualPreferences||{}; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
