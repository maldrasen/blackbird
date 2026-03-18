global.SensationArousal = (function() {
  const physicalCodes = new Set(AnimusComponent.getProperties());

  // Arousal should be between 1-100, so we translate that into a simple 1-2 factor. The arousal factor increases all
  // physical sensations. In the partner character high arousal increases submission and comfort, and decreases anger.
  function apply(result, factor) {
    const partner = result.getPartner();
    const player = result.getPlayer();

    let partnerFactor = 1 + (ArousalComponent.lookup(partner).arousal / 100);
    let playerFactor = 1 + (ArousalComponent.lookup(player).arousal / 100);

    if (factor.strength) {
      partnerFactor *= factor.strength;
      playerFactor *= factor.strength;
    }

    Object.keys(result.getPlayerHasSensations()).forEach(key => {
      if (physicalCodes.has(key)) {
        result.multiplyPlayerSensation(key, 'Arousal', playerFactor); }
    });

    Object.keys(result.getPartnerHasSensations()).forEach(key => {
      if (physicalCodes.has(key)) {
        result.multiplyPartnerSensation(key, 'Arousal', partnerFactor); }
      if (['submission','comfort'].includes(key)) {
        result.multiplyPartnerSensation(key, 'Arousal', partnerFactor); }
      if (key === 'anger') {
        result.multiplyPartnerSensation(key, 'Arousal', 1/partnerFactor); }
    });
  }

  return Object.freeze({ apply });

})();
