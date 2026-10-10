Record.define('Archetype', {
  getInstance: archetype => ({
    getName: () => { return archetype.name; },
    getRequires: () => { return archetype.requires; },
    getEquipmentPreferences: () => { return { ...archetype.equipmentPreferences }; },
    getDenialStyle: () => { return archetype.denialStyle; },
    getNegotiationStyle: () => { return archetype.negotiationStyle; },
    getSexStyle: () => { return archetype.sexStyle; },
    getSexualityRatio: () => { return archetype.sexualityRatio; },
    getSexualPreferences: () => { return archetype.sexualPreferences||{}; },
    getVirginChances: () => { return { ...archetype.virginChances }; },
  }),

  validate: (archetype, code) => {
    const name = `Archetype[${code}].equipmentPreferences`;
    Validate.exists(name, archetype.equipmentPreferences);

    Object.entries(archetype.equipmentPreferences).forEach(([style, weight]) => {
      Validate.isIn(name, style, Object.values(ItemStyle));
      Validate.between(`${name}.${style}`, weight, -100, 100);
    });
  },
});
