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
      getRequires: () => { return archetype.requires; },
      getSexStyle: () => { return archetype.sexStyle; },
      getSexualityRatio: () => { return archetype.sexualityRatio; },
      getSexualPreferences: () => { return archetype.sexualPreferences||{}; },
      getVirginChances: () => { return { ...archetype.virginChances }; },
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
