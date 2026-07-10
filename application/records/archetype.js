global.Archetype = (function() {
  const $archetypes = {};

  // Fallback negotiation reactions for archetypes that don't specify their own (or that only specify some tones). An
  // archetype's own negotiation block overrides these per tone. Values are deltas applied to the recruited monster's
  // starting affection, fear, and respect.
  const DEFAULT_NEGOTIATION = {
    dominant: { affection:-10, fear: 30, respect: 50 },
    kind:     { affection: 40, fear:-20, respect:  0 },
    boastful: { affection:-10, fear:  0, respect: 20 },
    honest:   { affection: 20, fear:  0, respect: 20 },
    lewd:     { affection: 20, fear:  0, respect:-10 },
  };

  function register(code,data) {
    $archetypes[code] = data;
  }

  // An archetype's supertype may be null, but only deliberately so — a null-supertype archetype gets no baseline
  // negotiation reactions and must register its own reaction to every question.
  function validate(code,data) {
    Validate.exists(`${code}.name`, data.name);
    if (data.supertype != null) {
      Validate.isIn(`${code}.supertype`, data.supertype, Object.values(NegotiationSupertype));
    }
  }

  function lookup(code) {
    if ($archetypes[code] == null) { throw new Error(`Bad archetype code [${code}]`); }

    const archetype = { ...$archetypes[code] };

    function negotiationDelta(tone) {
      const negotiation = archetype.negotiation || {};
      return negotiation[tone] || DEFAULT_NEGOTIATION[tone] || { affection:0, fear:0, respect:0 };
    }

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
      negotiationDelta,
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
