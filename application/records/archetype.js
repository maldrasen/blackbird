Record.define('Archetype', {
  getInstance: archetype => ({
    getName: () => { return archetype.name; },
    getRequires: () => { return archetype.requires; },
    getOutfitStyles: () => { return archetype.outfitStyles; },
    getDenialStyle: () => { return archetype.denialStyle; },
    getNegotiationStyle: () => { return archetype.negotiationStyle; },
    getSexStyle: () => { return archetype.sexStyle; },
    getSexualityRatio: () => { return archetype.sexualityRatio; },
    getSexualPreferences: () => { return archetype.sexualPreferences||{}; },
    getVirginChances: () => { return { ...archetype.virginChances }; },
  }),
});
