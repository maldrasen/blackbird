global.SensationBaseline = (function() {

  // The applyBaseline() function always needs to be called first, even in the specs, in order to set up the response
  // object, and to give the sensations a starting value for the factors to work on. The baseline sensations for each
  // action is defined on the action itself. This should make it easy to balance the action sensation as they'll always
  // have a well defined starting place to individually tweak.
  //
  // We also need to take the consent into consideration here as well. If the partner is unwilling the action should
  // produce anger and suffering, even if it normally wouldn't. Likewise, a reluctant action should always produce some
  // submission and shame.
  function apply(result) {
    const sexAction = result.getSexAction();
    const consent = result.getConsent().getConsent();
    const partnerBaseline = sexAction.getPartnerSensations();
    const playerBaseline = sexAction.getPlayerSensations();

    Object.keys(partnerBaseline).forEach(key => {
      result.addPartnerSensation(key,'Baseline',partnerBaseline[key]); });
    Object.keys(playerBaseline).forEach(key => {
      result.addPlayerSensation(key,'Baseline',playerBaseline[key]); });

    if (consent === Consent.unwilling) {
      result.addPartnerSensation('anger','Baseline',100);
      result.addPartnerSensation('suffering','Baseline',100);
    }
    if (consent === Consent.reluctant) {
      result.addPartnerSensation('shame','Baseline',100);
      result.addPartnerSensation('submission','Baseline',100);
    }
  }

  return Object.freeze({ apply });

})();
