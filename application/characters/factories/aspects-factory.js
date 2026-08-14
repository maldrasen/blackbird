global.AspectsFactory = (function() {

  // If the same aspect is added by both the species and a trigger, the trigger will overwrite the species, which is
  // fine I think.
  function build() {
    const state = CharacterFactory.getState();
    const aspectsData = {};
    applySpecies(aspectsData, state);
    applyTriggers(aspectsData, state);

    // We need to validate the data here for rare cases like when both the slut and bimbo aspects are added to the
    // character (there can only be one at a time)
    AspectsComponent.validateData(aspectsData);

    state.setAspects(aspectsData);
  }

  function applySpecies(aspectsData, state) {
    const gender = state.getGender();
    const species = state.getSpecies();
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

  // This function adds aspects to the aspectsData object while removing them from the state's triggers. Aspect
  // triggers will have the format `(aspectCode):(1-5 optional)` unless it's one of the unleveled aspects, which are
  // just `(aspectCode)`
  function applyTriggers(aspectsData, state) {
    const unleveledCodes = Aspect.getAllUnleveledCodes();

    state.getTriggers().forEach(trigger => {
      const match = trigger.match(/(.+):(\d)/);

      if (unleveledCodes.includes(trigger)) {
        aspectsData[trigger] = 1;
        Console.log(`Applied ${trigger}`,{ system:'AspectsFactory', level:3 });
        state.removeTrigger(trigger);
      }

      if (match) {
        aspectsData[match[1]] = parseInt(match[2]);
        Console.log(`Applied ${trigger}`,{ system:'AspectsFactory', level:3 });
        state.removeTrigger(trigger);
      }
    });
  }

  return { build };

})();
