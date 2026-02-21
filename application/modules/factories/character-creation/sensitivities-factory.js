global.SensitivitiesFactory = (function() {

  function build(triggers, actorData, breastsData, cockData, pussyData) {
    const sensitivities = {};
    const species = Species.lookup(actorData.species);
    const sensDef = species.getSensitivities();

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

    applyTriggers(triggers, sensitivities, breastsData, pussyData);

    return sensitivities;
  }

  function hasPart(key, breastsData, cockData, pussyData) {
    if (key === 'nipple') { return breastsData != null; }
    if (['cock','prostate'].includes(key)) { return cockData != null; }
    if (['clit','pussy','cervix'].includes(key)) { return pussyData != null; }
    return true;
  }

  // If a trigger doesn't apply to this body we can just ignore it.
  function applyTriggers(triggers, sensitivities, breastsData, pussyData) {
    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'SensitivitiesFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    if (triggers.includes('erogenous-throat')) {
      increaseSensitivity('oral',sensitivities);
      andRemove('erogenous-throat');
    }
    if (triggers.includes('erogenous-urethra')) {
      increaseSensitivity('urethra',sensitivities);
      andRemove('erogenous-urethra');
    }
    if (triggers.includes('erogenous-cervix')) {
      if (pussyData != null) { increaseSensitivity('cervix',sensitivities); }
      andRemove('erogenous-cervix');
    }
    if (triggers.includes('erogenous-nipples')) {
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