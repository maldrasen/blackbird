global.SensationPreferences = (function() {

  function apply(result, factor) {
    const partner = result.getPartner();
    const preference = SexualPreference.lookup(factor.code);
    const sensations = preference.getSensations();
    const preferences = SexualPreferencesComponent.lookup(partner);

    if (preferences[factor.code] == null) { return; }
    if (sensations == null) { return; }

    const preferenceValue = factor.conflicting ? -1 * preferences[factor.code] : preferences[factor.code]

    let factorValue = CharacterMath.personalityFactorValue(preferenceValue) * (sensations.factor || 1);
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
