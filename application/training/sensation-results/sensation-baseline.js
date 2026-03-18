global.SensationBaseline = (function() {

  // The applyBaseline() function always needs to be called first, even in the specs. This gives the sensations a
  // starting value for the factors to work on. The baseline sensations for each action are defined on the action
  // itself. This should make it easy to balance the action sensation as they'll always have a well defined starting
  // place to individually tweak.
  //
  // We also need to take the consent into consideration here as well. If the partner is unwilling the action should
  // produce anger and suffering, even if it normally wouldn't. Likewise, a reluctant action should always produce some
  // submission and shame.
  //
  // If we're repeating the same action that was performed the previous round, all the baseline sensations suffer a
  // 50% penalty to discourage spamming the same action. The original Era games had a similar mechanic. All the
  // currently persisted actions also add to the sensation baseline, though at reduced rate as well.

  function apply(result) {
    const sexAction = result.getSexAction();
    const consent = result.getConsentResult().getConsent();
    const strength = result.getPreviousAction() === sexAction.getCode() ? TrainingConstants.repeatedBaselineFactor : 1;

    addBaselineSensations(result, sexAction, sexAction.getName(), strength);

    result.getPersistedActions().forEach(persistedAction => {
      addBaselineSensations(result,
        persistedAction.getSexAction(),
        persistedAction.getSexAction().getName(),
        TrainingConstants.persistedBaselineFactor);
    });

    if (consent === Consent.unwilling) {
      result.addPartnerSensation('anger','Unwilling Baseline',TrainingConstants.unwillingAnger);
      result.addPartnerSensation('suffering','Unwilling Baseline',TrainingConstants.unwillingSuffering);
    }
    if (consent === Consent.reluctant) {
      result.addPartnerSensation('shame','Reluctant Baseline',TrainingConstants.reluctantShame);
      result.addPartnerSensation('submission','Reluctant Baseline',TrainingConstants.reluctantSubmission);
    }
  }

  function addBaselineSensations(result, sexAction, name, strength) {
    const partnerBaseline = sexAction.getPartnerSensations();
    const playerBaseline = sexAction.getPlayerSensations();

    Object.keys(partnerBaseline).forEach(key => {
      const value = (key === 'anger') ? partnerBaseline[key] : Math.ceil(strength * partnerBaseline[key]);
      result.addPartnerSensation(key,`${name} Baseline`, value);
    });

    Object.keys(playerBaseline).forEach(key => {
      const value = Math.ceil(strength * playerBaseline[key]);
      result.addPlayerSensation(key,'${name} Baseline', value);
    });
  }

  return Object.freeze({ apply });

})();
