global.SexualPreferenceFactory = (function() {

  // Characters are created with some sexual preferences by default. We at least need to know their sexuality, which is
  // defined by the gynophilic and androphilic preferences. Triggers will also add the preferences that they indicate.
  // When a preference is added by a trigger we adjust the value +/- 10 points.
  //
  // Sexuality has to key off of biological sex because I have no idea who a straight non-binary person is supposed to
  // be attracted to. A straight futa is gynophilic, a gay futa is androphilic (because of butt stuff). Bi is positive
  // in both. Ace is negative in both.
  function build(options, triggers) {

    if (triggers.includes('virgin') && triggers.includes('slut')) {
      throw `Character rejected. Sluts cannot be virgins.` }
    if (options.sexuality === 'ace' && triggers.includes('slut')) {
      throw `Character rejected. Sluts cannot be asexual.` }

    console.log("=== Building Sexual Preferences ===")
    console.log(`${options.sexuality} ${ options.biologicalSex}`);
    console.log(`${JSON.stringify(triggers)}`);

    // Preference strength between 10 and 40ish but usually around 30.
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

    console.log(`Complete Preferences: ${JSON.stringify(preferences)}`)

    return preferences;
  }

  return Object.freeze({ build });

})();
