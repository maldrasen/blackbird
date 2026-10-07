Record.define('Aspect', {
  getInstance: aspect => ({
    getName: () => { return aspect.name; },
    getDescription: () => { return aspect.description; },
    isLeveled: () => { return aspect.leveled === true; },
    getMaxLevel: () => { return aspect.leveled ? 3 : 1; },
  }),

  functions: () => ({
    getAllUnleveledCodes: () => {
      return Aspect.getAllCodes().
        map(code => Aspect.lookup(code)).
        filter(aspect => aspect.isLeveled() === false).
        map(aspect => aspect.getCode());
    },
  }),
});
