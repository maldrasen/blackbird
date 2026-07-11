global.Archetype = (function() {
  const $archetypes = {};

  function register(code,data) {
    $archetypes[code] = data;
  }

  function getAllCodes() {
    return Object.keys($archetypes);
  }

  // Runs from Loader.boot() once every file has loaded, so it's free to reference other record types. An archetype's
  // supertype may be null, but only deliberately so — a null-supertype archetype gets no baseline negotiation
  // reactions and must register its own reaction to every question.
  function validate() {
    Object.keys($archetypes).forEach(code => {
      const archetype = $archetypes[code];
      Validate.exists(`${code}.name`, archetype.name);
      if (archetype.supertype != null) {
        Validate.isIn(`${code}.supertype`, archetype.supertype, Object.values(NegotiationSupertype));
      }
    });
  }

  function lookup(code) {
    if ($archetypes[code] == null) { throw new Error(`Bad archetype code [${code}]`); }

    const archetype = { ...$archetypes[code] };

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
    validate,
    getAllCodes,
    lookup,
  });

})();
