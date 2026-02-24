global.SensationResult = function(code, context) {
  const sexAction = SexAction.lookup(code);
  const player = context.P;
  const partner = context.T;

  const sensations = {
    anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
    anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0,
  };

  // Consent Effects
  // - **Eager** `(> 100)` All of the positive sensation from this action get a bonus.
  // - **Willing** `(25 - 100)` Default value, sensation calculations are normal.
  // - **Reluctant** `(0 - 25)` When consent is reluctant the positive sensation values are all penalized
  // - **Unwilling** `(< 0)` Increased negative sensations, anger, fear, etc. And very penalized positive values.

  const consentResult = ConsentResult(partner, player);
        consentResult.setSexAction(code);
        consentResult.applyFactors();
  const consent = consentResult.getConsent();

  function applyFactors() {
    applyBaseline();
  }

  // The baseline sensations for each action is defined on the action itself.
  // This should make it easy to balance the action sensation as they'll
  // always have a well defined starting place to individually tweak. Actions
  // should only baseline the sensations they produce, so kissing shouldn't
  // send any anal sensations.
  //
  //   anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
  //   anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0,
  //
  // We do need to take the consent into consideration here as well. If the
  // partner is unwilling the action should produce anger and suffering, even
  // if it normally wouldn't. Likewise, a reluctant action should always
  // produce some level of submission and shame.
  function applyBaseline() {
    const baseline = sexAction.getSensations();

    Object.keys(baseline).forEach(key => {
      sensations[key] = baseline[key];
    });

    if (consent === Consent.unwilling) {
      sensations['anger'] += 100;
      sensations['suffering'] += 100;
    }
    if (consent === Consent.reluctant) {
      sensations['shame'] += 100;
      sensations['submission'] += 100;
    }
  }

  function getSensations() {
    return ObjectHelper.select(sensations, (key, value) => {
      return value > 0;
    })
  }

  return Object.freeze({
    getConsent: () => { return consentResult; },
    getSensations,
    applyFactors,
    applyBaseline,
  });
}
