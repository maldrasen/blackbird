global.SensitivitiesFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const sensitivities = {};
    const sensDef = state.getSpecies().getSensitivities();
    const breastsData = state.getBreasts();
    const cockData = state.getCock();
    const pussyData = state.getPussy();

    Object.keys(sensDef).forEach(key => {
      if (hasPart(key, breastsData, cockData, pussyData)) {
        switch (Random.fromFrequencyMap(sensDef[key])) {
          case 'F': sensitivities[key] = 1; break;
          case 'D': sensitivities[key] = 2; break;
          case 'C': sensitivities[key] = 3; break;
          case 'B': sensitivities[key] = 4; break;
          case 'A': sensitivities[key] = 5; break;
        }
      }
    });

    applyTriggers(state, sensitivities, breastsData, pussyData);

    state.setSensitivities(sensitivities);
  }

  function hasPart(key, breastsData, cockData, pussyData) {
    if (key === 'nipple') { return breastsData != null; }
    if (['cock','prostate'].includes(key)) { return cockData != null; }
    if (['clit','pussy','cervix'].includes(key)) { return pussyData != null; }
    return true;
  }

  // If a trigger doesn't apply to this body we can just ignore it.
  function applyTriggers(state, sensitivities, breastsData, pussyData) {
    function andRemove(trigger) {
      Console.log(`Applied ${trigger}`,{ system:'SensitivitiesFactory', level:3 });
      state.removeTrigger(trigger);
    }

    // Don't increase sensations beyond 'A'
    if (state.hasTrigger('sensitive')) {
      Object.keys(sensitivities).forEach(key => { if (sensitivities[key] < 5) { sensitivities[key] += 1; }});
      andRemove('sensitive');
    }

    // Don't reduce sensations below 'F'
    if (state.hasTrigger('insensitive')) {
      Object.keys(sensitivities).forEach(key => { if (sensitivities[key] > 1) { sensitivities[key] -= 1; }});
      andRemove('insensitive');
    }

    if (state.hasTrigger('erogenous-throat')) {
      increaseSensitivity('throat',sensitivities);
      andRemove('erogenous-throat');
    }
    if (state.hasTrigger('erogenous-urethra')) {
      increaseSensitivity('urethra',sensitivities);
      andRemove('erogenous-urethra');
    }
    if (state.hasTrigger('erogenous-cervix')) {
      if (pussyData != null) { increaseSensitivity('cervix',sensitivities); }
      andRemove('erogenous-cervix');
    }
    if (state.hasTrigger('erogenous-nipples')) {
      if (breastsData != null) { increaseSensitivity('nipple',sensitivities); }
      andRemove('erogenous-nipples');
    }
  }

  function increaseSensitivity(key, sensitivities) {
    sensitivities[key] ? sensitivities[key] += 1 : sensitivities[key] = Random.between(1,2);
  }

  return Object.freeze({
    build,
  })

})();
