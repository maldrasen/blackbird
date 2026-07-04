global.SensationSensitivities = (function() {

  // The persistent sensitivity levels act as multipliers on the physical sensations, representing how erogenous a
  // body part is for this character permanently, separate from the transient session scales in SensationScales.
  function apply(result) {
    applySensitivities(SensitivitiesComponent.lookup(result.getPartner()), result.getPartnerHasSensations(), result.multiplyPartnerSensation);
    applySensitivities(SensitivitiesComponent.lookup(result.getPlayer()), result.getPlayerHasSensations(), result.multiplyPlayerSensation);
  }

  function applySensitivities(sensitivities, has, multiply) {
    Object.keys(has).forEach(key => {
      if (AnimusComponent.has(key)) {
        const data = buildSensitivityData(key, sensitivities[key] || 0);
        multiply(key, data.label, data.factor);
      }
    });
  }

  function buildSensitivityData(key, value) {
    const letter = LetterGradeHelper.sensitivityValue(value);
    return {
      label: `${ScaleLabels[key]} Sensitivity(${letter || '-'})`,
      factor: TrainingConstants.sensitivityFactors[letter] || 0,
    }
  }

  return Object.freeze({ apply })

})();
