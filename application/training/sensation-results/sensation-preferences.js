global.SensationPreferences = (function() {

  function apply(result, factor) {
    const partner = result.getPartner();
    const preference = SexualPreference.lookup(factor.code);
    const sensations = preference.getSensations();
    const preferences = SexualPreferencesComponent.lookup(partner);

    if (preferences[factor.code] == null) { return; }
    if (sensations == null) { return; }

    const preferenceValue = factor.conflicting ? -1 * preferences[factor.code] : preferences[factor.code]

    // We calculate the value and clamp it to the [0.5 - 2] range before sending it to the CharacterMath module.
    // This limits the effect even a strong preference can have on a physical sensation.
    let factorValue = CharacterMath.personalityFactorValue(preferenceValue) * (sensations.factor || 1);
    factorValue = Math.min(factorValue,2);
    factorValue = Math.max(factorValue,0.5);

    if (factor.scale) {
      factorValue = CharacterMath.applyFactorScale(factorValue, factor.scale);
    }

    (sensations.increase || []).forEach(code => {
      if (result.getPartnerHasSensations()[code]) {
        result.multiplyPartnerSensation(code, preference.getName(), factorValue);
      }
    });
  }

  return Object.freeze({ apply });

})();
