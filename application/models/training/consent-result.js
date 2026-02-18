global.ConsentResult = (characterId, targetId=null) => {

  const $characterId = characterId;
  const $targetId = targetId || GameState.getPlayer();

  let $response, $consentValue, $sexAction;

  function getConsent() {
    const target = $sexAction.getConsentTarget();
    if ($consentValue < target)        { return Consent.unwilling; }
    if ($consentValue < (target*1.25)) { return Consent.reluctant; }
    if ($consentValue < (target*2))    { return Consent.willing;   }
    return Consent.eager;
  }

  // Setting the sex action also resets the results so that the same
  // ConsentResult object can be used for multiple actions
  function setSexAction(code) {
    $response = { additive:[], multiplicative:[] };
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
    if (factor.type === 'base')       { return applyBaseFactor(factor);       }
    if (factor.type === 'arousal')    { return applyArousalFactor(factor);    }
    if (factor.type === 'gender')     { return applyGenderFactor(factor);     }
    if (factor.type === 'preference') { return applyPreferenceFactor(factor); }

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
      case SexAction.BaseClass.reverseService:
        baseValue = affectionBase + respectBase; break;
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
      label: StringHelper.titlecaseAll(factor.baseClass),
      value: baseValue });
  }

  // Apply a geometric growth curve to the arousal value. This curve assumes arousal is somewhere between 0 and 100.
  // Values above 100 will produce unusually high consent numbers, but that's probably fine. Values above 100 are
  // probably only be achieved with drugs or mind control, so consent going out the window works thematically.
  //
  // The arousal value is used as an additive base value, so we expect the midrange values to be around 10 or so.
  // These values can be adjusted further by supplying a strength factor the arousal is multiplied by.
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

  // We pretty much always will add a gender factor to the consent calculations, though the importance of gender
  // differs for different actions. Something like kissing would have a stronger gender component than getting
  // fondled I think. Sexuality is represented by the androphilic and gynophilic ranges, so calculating the gender
  // response for futa and non-binary characters need to look at both preferences.
  //
  // Apply both male and female gender preferences at the same time will reduce consent for straight characters, but
  // increase it for bisexual characters, which makes sense especially for futanari. Gender preferences for
  // non-binary characters only apply at half strength (0.66 - 1.5) as they fall into a 'having neither gender' kind
  // of logical space, though they also kind of have both. Also, it should be fine to scale the factor twice for the
  // non-binary characters here. When you reduce the range, the resulting range remains within the legal limits.
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
    if (gender === Gender.futa) {
      maleFactor = ComponentMath.personalityFactorValue(preferences['androphilic']);
      femaleFactor = ComponentMath.personalityFactorValue(preferences['gynophilic']);
    }
    if (gender === Gender.enby) {
      maleFactor = ComponentMath.applyFactorScale(
        ComponentMath.personalityFactorValue(preferences['androphilic']),1.5);
      femaleFactor = ComponentMath.applyFactorScale(
        ComponentMath.personalityFactorValue(preferences['gynophilic']),1.5);
    }

    maleFactor = ComponentMath.applyFactorScale(maleFactor, factor.scale || 2);
    femaleFactor = ComponentMath.applyFactorScale(femaleFactor, factor.scale || 2);

    $consentValue = $consentValue * (maleFactor * femaleFactor);
    $response.multiplicative.push({
      label: 'Gender',
      value: (maleFactor * femaleFactor),
    });
  }

  function applyPreferenceFactor(factor) {
    const preferences = SexualPreferencesComponent.lookup($characterId);
    if (preferences[factor.code] == null) { return; }

    const preferenceValue = factor.conflicting ? -1 * preferences[factor.code] : preferences[factor.code]

    let factorValue = ComponentMath.personalityFactorValue(preferenceValue);
    if (factor.scale) {
      factorValue = ComponentMath.applyFactorScale(factorValue, factor.scale);
    }

    $consentValue = $consentValue * factorValue;
    $response.multiplicative.push({
      label: SexualPreference.lookup(factor.code).getName(),
      value: factorValue,
    });
  }

  return Object.freeze({
    getCharacter: () => { return $characterId; },
    getTarget: () => { return $targetId; },
    getResponse: () => { return $response },
    getConsentValue: () => { return $consentValue; },
    getConsent,
    applyFactors,
    applyFactor,
    setSexAction,
  });

}
