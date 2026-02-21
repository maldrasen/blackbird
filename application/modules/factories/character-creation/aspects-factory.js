global.AspectsFactory = (function() {

  // If the same aspect is added by both the species and a trigger, the
  // trigger will overwrite the species, which is fine I think.
  function build(triggers, speciesCode) {
    const aspectsData = {};
    applySpecies(aspectsData, speciesCode);
    applyTriggers(aspectsData, triggers);
    return aspectsData;
  }

  function applySpecies(aspectsData, speciesCode) {
    const species = Species.lookup(speciesCode);
    const speciesAspects = species.getAspects() || {};

    Object.keys(speciesAspects).forEach(aspectCode => {
      if (Random.roll(100) < speciesAspects[aspectCode].chance) {
        let level = 1;
        if (speciesAspects[aspectCode].levels) {
          level = parseInt(Random.fromFrequencyMap(speciesAspects[aspectCode].levels));
        }

        log(`Species:${speciesCode} added ${aspectCode}[${level}]`,{ system:'AspectsFactory', level:3 });
        aspectsData[aspectCode] = level;
      }
    });
  }

  // This function mutates both the aspectsData object and the triggers array,
  // adding aspects to the former while removing them from the latter.
  function applyTriggers(aspectsData, triggers) {
    [...triggers].forEach(trigger => {
      const match = trigger.match(/(.+):(\d)/);
      if (match) {
        aspectsData[match[1]] = parseInt(match[2]);
        log(`Applied ${trigger}`,{ system:'AspectsFactory', level:3 });
        ArrayHelper.remove(triggers, trigger);
      }
    });
  }

  return Object.freeze({
    build,
  });

})();
