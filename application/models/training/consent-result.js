global.ConsentResult = (function() {

  function build(characterId, targetId=null) {
    const $characterId = characterId;
    const $targetId = targetId || GameState.getPlayer();

    let $response, $consentValue, $sexAction;

    // Setting the sex action also resets the results so that the same
    // ConsentResult object can be used for multiple actions
    function setSexAction(code) {
      $response = { additive:[] };
      $consentValue = 0;
      $sexAction = SexAction.lookup(code);
    }

    function applyFactors() {
      $sexAction.getConsentFactors().forEach(factor => {
        applyFactor(factor);
      });
    }

    // Apply a single factor. This function is only public in order to make
    // the model easier to test each factor in isolation.
    function applyFactor(factor) {
      if (factor.type === 'base')    { return applyBaseFactor(factor);    }
      if (factor.type === 'arousal') { return applyArousalFactor(factor); }
      if (factor.type === 'gender')  { return applyGenderFactor(factor);  }
      throw `Unrecognized consent factor type: ${factor.type}`;
    }

    function applyBaseFactor(factor) {
      const feelings = FeelingsComponent.findByTarget($characterId, $targetId);
      const affectionBase = feelingBaseValue(feelings.affection);
      const fearBase = feelingBaseValue(feelings.fear);
      const respectBase = feelingBaseValue(feelings.respect);

      let baseValue;

      switch (factor.baseClass) {
        case SexAction.BaseClass.emotional:
          baseValue = affectionBase - (fearBase/2); break;
        case SexAction.BaseClass.roughService:
          baseValue = (respectBase + fearBase) / 2; break;
        case SexAction.BaseClass.service:
          baseValue = respectBase + (affectionBase/2); break;
        case SexAction.BaseClass.touching:
          baseValue = affectionBase + (fearBase/2); break;
        default: throw `Unrecognized BaseClass (${factor.baseClass})`;
      }

      $consentValue += baseValue;
      $response.additive.push({
        label: TextHelper.titlecaseAll(factor.baseClass),
        value: baseValue });
    }

    // Apply a geometric growth curve to the arousal value. This curve assumes arousal is somewhere between 0 and 100.
    // Values above 100 will produce unusually high consent numbers, but that's probably fine. Values above 100 are
    // probably only be achieved with drugs or mind control, so consent going out the window works thematically.
    function applyArousalFactor(factor) {
      const component = ArousalComponent.lookup($characterId);

      let arousal = Math.pow(component.arousal,2) * 0.01;
      if (factor.strength) {
        arousal *= factor.strength;
      }

      $consentValue += arousal;
      $response.additive.push({
        label: 'Arousal',
        value: arousal });
    }

    function applyGenderFactor(factor) {
      const preferences = SexualPreferencesComponent.lookup($characterId);
      const gender = ActorComponent.lookup($targetId).gender;

      let maleFactor = 1;
      let femaleFactor = 1;

      if (gender === Gender.male) {
        maleFactor = sexualPreferenceValue(preferences['androphilic']);
      }
      if (gender === Gender.female) {
        femaleFactor = sexualPreferenceValue(preferences['gynophilic']);
      }
      // Futa characters apply both male and female gender preferences.
      if (gender === Gender.futa) {
        maleFactor = sexualPreferenceValue(preferences['androphilic'])
        femaleFactor = sexualPreferenceValue(preferences['gynophilic']);
      }
      // Non-Binary character apply both male and female gender preferences at half strength. (0.75 - 1.5)
      if (gender === Gender.enby) {
        maleFactor = (1 + sexualPreferenceValue(preferences['androphilic'])) / 2;
        femaleFactor = (1 + sexualPreferenceValue(preferences['gynophilic'])) / 2;
      }

      console.log("Male Factor?",maleFactor)
    }

    return Object.freeze({
      getCharacter: () => { return $characterId; },
      getTarget: () => { return $targetId; },
      getResponse: () => { return $response; },
      getConsentValue: () => { return $consentValue; },
      applyFactors,
      applyFactor,
      setSexAction,
    });
  }

  // Feelings are measured on a scale from -1000 to 1000, with the extreme ends corresponding to extreme feelings. A
  // simple cubic curve doesn't really work well for low values, so each range of values needs to follow its own curve.
  function feelingBaseValue(rawValue) {
    return PiecewiseCurve([
      { xMin:0,   xMax:100,  yMin:0,   yMax:10,  exp:1.0  }, // Apathy
      { xMin:100, xMax:200,  yMin:10,  yMax:30,  exp:1.5  }, // Mild
      { xMin:200, xMax:400,  yMin:30,  yMax:70,  exp:2.0  }, // Moderate
      { xMin:400, xMax:600,  yMin:70,  yMax:150, exp:2.33 }, // High
      { xMin:600, xMax:800,  yMin:150, yMax:250, exp:2.66 }, // Very High
      { xMin:800, xMax:1000, yMin:250, yMax:500, exp:3.0  }, // Extreme
    ])(rawValue);
  }

  // The sexual preferences are measured on a scale from -100 to 100. This function takes the raw preference value and
  // first applies a geometric curve to it, then returns a value to be used as a factor for the running value. If the
  // sexual preference is null this function returns 1. (no effect)
  //
  //   Strength 2: [0.50 - 2]
  //   Strength 3: [0.33 - 3]
  //   Strength 4: [0.25 - 4]
  //   Strength 5: [0.20 - 5]
  //
  function sexualPreferenceValue(rawValue, strength=2) {
    if (rawValue == null || rawValue === 0) { return 1; }
    const curved = Math.pow(rawValue,2) * 0.01;

    if (strength === 2) { return (rawValue > 0) ? 1 + (curved/100)   : 1 - (curved/200); }
    if (strength === 3) { return (rawValue > 0) ? 1 + (curved/50)    : 1 - (curved/149.25); }
    if (strength === 4) { return (rawValue > 0) ? 1 + (curved/33.33) : 1 - (curved/133.33); }
    if (strength === 5) { return (rawValue > 0) ? 1 + (curved/25)    : 1 - (curved/125); }
  }

  return Object.freeze({
    build,
    feelingBaseValue,
    sexualPreferenceValue,
  });

})();
