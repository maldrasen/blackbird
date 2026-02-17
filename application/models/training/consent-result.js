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
      const affectionBase = ComponentMath.emotionBaseValue(feelings.affection);
      const fearBase = ComponentMath.emotionBaseValue(feelings.fear);
      const respectBase = ComponentMath.emotionBaseValue(feelings.respect);

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
        maleFactor = ComponentMath.personalityFactorValue(preferences['androphilic']);
      }
      if (gender === Gender.female) {
        femaleFactor = ComponentMath.personalityFactorValue(preferences['gynophilic']);
      }

      // Futa characters apply both male and female gender preferences, which
      // will reduce consent for straight characters, but increase it for
      // bisexual characters.
      if (gender === Gender.futa) {
        maleFactor = ComponentMath.personalityFactorValue(preferences['androphilic'])
        femaleFactor = ComponentMath.personalityFactorValue(preferences['gynophilic']);
      }

      // Both male and female gender preferences apply to non-binary
      // characters, though only at half strength (0.75 - 1.5) as they fall
      // into a 'having neither gender' kind of logical space, though they also
      // kind of have both.
      if (gender === Gender.enby) {
        maleFactor = ComponentMath.applyStrengthToFactor(
          ComponentMath.personalityFactorValue(preferences['androphilic']),0.5);
        femaleFactor = ComponentMath.applyStrengthToFactor(
          ComponentMath.personalityFactorValue(preferences['gynophilic']),0.5);
      }

      console.log("Male Factor:",maleFactor);
      console.log("Female Factor:",femaleFactor);
      // TODO: Apply strength from factor
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

  return Object.freeze({ build });

})();
