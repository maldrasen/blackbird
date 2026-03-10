global.SexualityFactory = (function() {

  function build(context, triggers) {
    const preferences = applySexualityTriggers(triggers);

    if (preferences.androphilic == null || preferences.gynophilic == null) {
      const sexuality = context.sexuality || randomSexuality(context)
      const baseline = buildBaselineSexuality(sexuality, context.sex);
      if (preferences.androphilic == null) { preferences.androphilic = baseline.androphilic; }
      if (preferences.gynophilic == null) { preferences.gynophilic = baseline.gynophilic; }
    }

    return preferences;
  }

  // If the triggers include androphilic or gynophilic, we use the trigger value (+/- 10) rather before picking a
  // value at random.
  function applySexualityTriggers(triggers) {
    const preferences = {};

    const applyTrigger = (code, trigger) => {
      preferences[code] = parseInt(trigger.match(/\[(-?\d+)]/)[1]);
      preferences[code] += -10 + Random.roll(20);
    };

    [...triggers].forEach(trigger => {
      if (trigger.match(/androphilic/)) { applyTrigger('androphilic', trigger); }
      if (trigger.match(/gynophilic/)) { applyTrigger('gynophilic', trigger); }
    });

    return preferences;
  }

  // We normally use the personality archetype when picking a random sexuality. If this character is a sylph, nymph or
  // other species where there is an extreme gender imbalance, we return bi if straight was randomly selected.
  function randomSexuality(context) {
    const archetype = Archetype.lookup(context.personality.archetype);
    const sexuality = Random.fromFrequencyMap(archetype.getSexualityRatio());
    return (sexuality === 'straight' && ['sylph','nymph'].includes(context.actor.species)) ? 'bi' : sexuality;
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

  return Object.freeze({
    build
  })

})();
