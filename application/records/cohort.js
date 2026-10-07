Record.define('Cohort', {
  getInstance: cohort => ({
    getMaximum: () => { return cohort.maximum || 10; },
    getMinimum: () => { return cohort.minimum || 1; },
    getMonsters: () => { return cohort.monsters; },
    getStartText: (ambushState, context={}) => { return cohort.startText[ambushState].pick(context); },
    getFactoryOptions: () => { return cohort.factoryOptions; },
  }),
});
