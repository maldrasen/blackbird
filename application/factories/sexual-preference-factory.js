global.SexualPreferenceFactory = (function() {

  // Characters are created with some sexual preferences by default. We at least need to know their sexuality, which is
  // defined by the gynophilic and androphilic preferences. Triggers will also add the preferences that they indicate.
  // When a preference is added by a trigger we adjust the value +/- 10 points.
  //
  // Sexuality has to key off of biological sex because I have no idea who a straight non-binary person is supposed to
  // be attracted to. A straight futa is gynophilic, a gay futa is androphilic (because of butt stuff). Bi is positive
  // in both. Ace is negative in both.
  //
  // Note: We could also add any number of randomized sexual preferences in the factory here, but I think it's better
  //       to do that after the character has already been built. The system outside the character factory will know
  //       more about the context the character is being created under.
  //
  function build(options, triggers) {
    const speciesPrefs = Species.lookup(options.actor.species).getSexualPreferences() || {};

    if (triggers.includes('virgin') && triggers.includes('slut')) {
      throw `Character rejected. Sluts cannot be virgins.` }
    if (options.sexuality === 'ace' && triggers.includes('slut')) {
      throw `Character rejected. Sluts cannot be asexual.` }

    const preferences = buildBaselineSexuality(options);

    // Loop through the triggers looking for strings matching keyword[DD], adding a sexual preference for each and
    // removing the trigger from the array once matched. Strength from triggers will be fuzzed between -9 and 9 points.
    // We make a copy of the array because I don't like modifying arrays that I'm iterating though.
    [...triggers].forEach(trigger => {
      const match = trigger.match(/([a-zA-Z-]+)\[(-?\d+)]/)
      if (match) {
        try {
          preferences[match[1]] = (Random.roll(18)-9) + parseInt(match[2]);
          log(`Applied ${trigger}`,{ system:'SexualPreferenceFactory', level:3 });
          ArrayHelper.remove(triggers,trigger);
        }
        catch (error) { throw `Unparsable Trigger: ${trigger}`; }
      }
    });

    // Most species (but not humans) have a few species level sexual preferences.
    Object.keys(speciesPrefs).forEach(preference => {
      if (Random.roll(100) < speciesPrefs[preference].chance) {
        preferences[preference] = (Random.roll(18)-9) + speciesPrefs[preference].strength;
      }
    });

    return preferences;
  }

  function buildBaselineSexuality(options) {
    const gyno = Math.max(10,30+Random.normalDistribution(0,10));
    const andro = Math.max(10,30+Random.normalDistribution(0,10));
    const preferences = {}

    if (options.sexuality === 'straight') {
      if ([Gender.male, Gender.futa].includes(options.biologicalSex)) {
        preferences.gynophilic = gyno;
        preferences.androphilic = andro * -1;
      }
      if (options.biologicalSex === Gender.female) {
        preferences.gynophilic = gyno * -1;
        preferences.androphilic = andro;
      }
    }
    if (options.sexuality === 'gay') {
      if ([Gender.male, Gender.futa].includes(options.biologicalSex)) {
        preferences.gynophilic = gyno * -1;
        preferences.androphilic = andro;
      }
      if (options.biologicalSex === Gender.female) {
        preferences.gynophilic = gyno;
        preferences.androphilic = andro * -1;
      }
    }
    if (options.sexuality === 'bi') {
      preferences.gynophilic = gyno;
      preferences.androphilic = andro;
    }
    if (options.sexuality === 'ace') {
      preferences.gynophilic = gyno * -1;
      preferences.androphilic = andro * -1;
    }

    return preferences;
  }

  return Object.freeze({ build });

})();
