global.AspectsFactory = (function() {

  // If the same aspect is added by both the species and a trigger, the
  // trigger will overwrite the species, which is fine I think.
  function build(triggers, actorData) {
    const aspectsData = {};
    applySpecies(aspectsData, actorData);
    applyTriggers(aspectsData, triggers);

    // We need to validate the data here for rare cases like when both the slut
    // and bimbo aspects are added to the character (there can only be one at
    // a time)
    AspectsComponent.validateData(aspectsData);

    return aspectsData;
  }

  function applySpecies(aspectsData, actorData) {
    const gender = actorData.gender;
    const species = Species.lookup(actorData.species);
    const speciesAspects = species.getAspects() || {};

    Object.keys(speciesAspects).forEach(code => {
      attemptAspect(speciesAspects[code], code, aspectsData, species, gender);
    });
  }

  function attemptAspect(def, code, aspectsData, species, gender) {
    if (Random.roll(100) < def.chance) {
      if (def.genders == null || def.genders.includes(gender)) {
        const level = (def.levels) ? parseInt(Random.fromFrequencyMap(def.levels)) : 1;
        Console.log(`${species.getName()} adds ${code}[${level}]`,{ system:'AspectsFactory', level:3 });
        aspectsData[code] = level;
      }
    }
  }

  // This function mutates both the aspectsData object and the triggers array,
  // adding aspects to the former while removing them from the latter.
  function applyTriggers(aspectsData, triggers) {
    [...triggers].forEach(trigger => {
      const match = trigger.match(/(.+):(\d)/);
      if (match) {
        aspectsData[match[1]] = parseInt(match[2]);
        Console.log(`Applied ${trigger}`,{ system:'AspectsFactory', level:3 });
        ArrayHelper.remove(triggers, trigger);
      }
    });
  }

  return Object.freeze({
    build,
  });

})();
