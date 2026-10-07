Record.define('Encounter', {
  getInstance: encounter => ({
    getFormation: () => { return encounter.formation; },
    getMonsters: () => { return encounter.monsters; },
    getStartText: ambushState => { return encounter.startText ? encounter.startText[ambushState].pick() : null; },
  }),
});
