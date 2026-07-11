global.Archetype = (function() {
  const archetypes = {};

  function register(code,data) {
    archetypes[code] = data;
  }

  function getAllCodes() {
    return Object.keys(archetypes);
  }

  function lookup(code) {
    if (archetypes[code] == null) { throw new Error(`Bad archetype code [${code}]`); }

    const archetype = { ...archetypes[code] };

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return archetype.name; },
      getSupertype: () => { return archetype.supertype || null; },
      getRequires: () => { return archetype.requires; },
      getOutfitStyles: () => { return archetype.outfitStyles; },
      getDenialStyle: () => { return archetype.denialStyle; },
      getSexStyle: () => { return archetype.sexStyle; },
      getSexualityRatio: () => { return archetype.sexualityRatio; },
      getSexualPreferences: () => { return archetype.sexualPreferences||{}; },
      getVirginChances: () => { return { ...archetype.virginChances }; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
