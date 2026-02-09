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

    // Most species (but not humans) have a few species level sexual preferences. Species preferences need to be added
    // before the slut and virgin triggers in order to properly remove all sexual preferences from virgins.
    Object.keys(speciesPrefs).forEach(preference => {
      if (Random.roll(100) < speciesPrefs[preference].chance) {
        preferences[preference] = (Random.roll(18)-9) + speciesPrefs[preference].strength;
      }
    });

    // Loop through the triggers looking for strings matching keyword[DD], adding a sexual preference for each and
    // removing the trigger from the array once matched. Strength from triggers will be fuzzed between -9 and 9 points.
    // We make a copy of the array because I don't like modifying arrays that I'm iterating though.
    [...triggers].forEach(trigger => {

      if (trigger === 'slut') {
        applySlut(preferences, options);
        log(`Applied slut`,{ system:'SexualPreferenceFactory', level:3 });
        ArrayHelper.remove(triggers,'slut');
      }

      if (trigger === 'virgin') {
        applyVirgin(preferences);
        log(`Applied virgin`,{ system:'SexualPreferenceFactory', level:3 });
        ArrayHelper.remove(triggers,'virgin');
      }

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

  // The slut trigger is fairly common. Rather than specifying anything specific it randomly adds 2 - 8 sexual
  // preferences. More common preferences will be picked more frequently. The function also increases the strength of
  // the androphile and gynophile preferences when they are already positive.
  function applySlut(preferences, options) {
    let count = Random.between(2,8);

    if (preferences.gynophilic > 0) {
      preferences.gynophilic += Random.roll(20); }
    if (preferences.androphilic > 0) {
      preferences.androphilic += Random.roll(20); }

    const sluttyPreferences =  {
      'sensitive': 30,
      'exhibitionist': 30,
      'masterbator': 30,
      'perverted': 20,
      'sex-toy-lover': 20,
      'ass-lover': 15,
      'anal-slut': 10,
      'oral-slut': 10,
      'beast-lover': 10,
      'submissive': 10,
      'masochistic': 10,
      'affection-slut': 10,
      'humiliation-slut': 10,
      'rope-bunny': 5,
    };

    if (options.breasts) {
      sluttyPreferences['breast-slut'] = 20;
    }
    if (options.pussy) {
      sluttyPreferences['pussy-slut'] = 30;
      sluttyPreferences['breeder'] = 10;
    }
    if (options.cock) {
      sluttyPreferences['cock-slut'] = 30;
    }
    if (preferences.androphilic > 0) {
      sluttyPreferences['cock-lover'] = 15;
      sluttyPreferences['cum-dump'] = 10;
    }
    if (preferences.gynophilic > 0) {
      sluttyPreferences['breast-lover'] = 15;
      sluttyPreferences['pussy-lover'] = 15;
    }

    while (count > 0) {
      const key = Random.fromFrequencyMap(sluttyPreferences);
      const strength = Random.between(1,40);

      if (preferences['affection-slut'] > 0 && key === 'humiliation-slut') { continue; }
      if (preferences['humiliation-slut'] > 0 && key === 'affection-slut') { continue; }
      if (preferences[key] == null) {
        log(`Slut adds ${key}[${strength}]`,{ system:'SexualPreferenceFactory', level:3 });
        preferences[key] = strength;
        count -= 1;
      }
    }
  }

  // The applyVirgin() function does the opposite of applySlut() by removing what positive sexual preferences it can
  // and lowering the positive gender sexualities by half.
  //
  // TODO: Eventually we might have systems that track other virgin properties, first kiss, hymen intact, all that
  //       shit. Right now none of that exists, so applyVirgin() is really more of an "applyChaste()" but this will
  //       need to be updated if we ever do any of that.
  //
  function applyVirgin(preferences) {
    const retained = ['gynophilic','androphilic'];

    if (preferences.gynophilic > 0) {
      preferences.gynophilic = Math.ceil(preferences.gynophilic/2); }
    if (preferences.androphilic > 0) {
      preferences.androphilic = Math.ceil(preferences.androphilic/2); }

    Object.keys(preferences).forEach(key => {
      if (retained.includes(key) === false && preferences[key] > 0) {
        log(`Virgin removes ${key}`,{ system:'SexualPreferenceFactory', level:3 });
        delete preferences[key];
      }
    });
  }

  return Object.freeze({ build });

})();
