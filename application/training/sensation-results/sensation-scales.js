global.SensationScales = (function() {

  function apply(result) {
    const state = result.getState();
    const partnerScales = state.getPartnerScales();
    const playerScales = state.getPlayerScales();

    Object.entries(partnerScales).forEach(([key,value]) => {
      if (AnimusComponent.has(key)) {
        const data = buildScaleData(key, value);
        result.multiplyPartnerSensation(key, data.label, data.factor);
      }
    });

    Object.entries(playerScales).forEach(([key,value]) => {
      if (AnimusComponent.has(key)) {
        const data = buildScaleData(key, value);
        result.multiplyPlayerSensation(key, data.label, data.factor);
      }
    });
  }

  function buildScaleData(key, value) {
    const letter = LetterGradeHelper.scaleValue(value).letter;
    return {
      label: `${ScaleLabels[key]}(${letter})`,
      factor: TrainingConstants.scaleFactors[letter],
    }
  }

  return Object.freeze({ apply })

})();
