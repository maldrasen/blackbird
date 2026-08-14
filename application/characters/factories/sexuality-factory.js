global.SexualityFactory = (function() {

  // Sexuality has to key off of biological sex because I have no idea who a straight non-binary person is supposed to
  // be attracted to. A straight futa is gynophilic, a gay futa is androphilic (because of butt stuff). Bi is positive
  // in both. Ace is negative in both.
  function build() {
    const state = CharacterFactory.getState();
    const preferences = applySexualityTriggers(state);

    if (preferences.androphilic == null || preferences.gynophilic == null) {
      const sexuality = state.getSexuality() || randomSexuality(state);
      const baseline = buildBaselineSexuality(sexuality, state.getBiologicalSex());
      if (preferences.androphilic == null) { preferences.androphilic = baseline.androphilic; }
      if (preferences.gynophilic == null) { preferences.gynophilic = baseline.gynophilic; }
    }

    state.setSexualPreferences(preferences);
  }

  // If the triggers include androphilic or gynophilic, we use the trigger value (+/- 10) rather before picking a
  // value at random. The triggers are left in place; the sexual preferences factory consumes them.
  function applySexualityTriggers(state) {
    const preferences = {};

    const applyTrigger = (code, trigger) => {
      preferences[code] = parseInt(trigger.match(/\[(-?\d+)]/)[1]);
      preferences[code] += -10 + Random.roll(20);
    };

    state.getTriggers().forEach(trigger => {
      if (trigger.match(/androphilic/)) { applyTrigger('androphilic', trigger); }
      if (trigger.match(/gynophilic/)) { applyTrigger('gynophilic', trigger); }
    });

    return preferences;
  }

  // We normally use the personality archetype when picking a random sexuality. If this character is a sylph, nymph or
  // other species where there is an extreme gender imbalance, we return bi if straight was randomly selected.
  function randomSexuality(state) {
    const archetype = Archetype.lookup(state.getPersonality().archetype);
    const sexuality = Random.fromFrequencyMap(archetype.getSexualityRatio());
    const menAreRare = [SpeciesCode.sylph, SpeciesCode.nymph].includes(state.getSpeciesCode())
    return (sexuality === 'straight' && menAreRare) ? 'bi' : sexuality;
  }

  function buildBaselineSexuality(sexuality, sex) {
    const gyno = Math.max(10,30+Random.normalDistribution(0,10));
    const andro = Math.max(10,30+Random.normalDistribution(0,10));
    const preferences = {}

    if (sexuality === 'straight') {
      if ([Gender.male, Gender.futa].includes(sex)) {
        preferences.gynophilic = gyno;
        preferences.androphilic = andro * -1;
      }
      if (sex === Gender.female) {
        preferences.gynophilic = gyno * -1;
        preferences.androphilic = andro;
      }
    }
    if (sexuality === 'gay') {
      if ([Gender.male, Gender.futa].includes(sex)) {
        preferences.gynophilic = gyno * -1;
        preferences.androphilic = andro;
      }
      if (sex === Gender.female) {
        preferences.gynophilic = gyno;
        preferences.androphilic = andro * -1;
      }
    }
    if (sexuality === 'bi') {
      preferences.gynophilic = gyno;
      preferences.androphilic = andro;
    }
    if (sexuality === 'ace') {
      preferences.gynophilic = gyno * -1;
      preferences.androphilic = andro * -1;
    }

    return preferences;
  }

  return {
    build
  };

})();
