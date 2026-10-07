Record.define('SexualPreference', {
  getInstance: preference => ({
    getName: () => { return preference.name; },
    getAntiname: () => { return preference.antiname || `Anti-${preference.name}` },
    getSensations: () => { return preference.sensations; },
    getRequires: () => { return preference.requires; },
    isNegativeAllowed: () => { return preference.antiname != null; },
  }),
});
