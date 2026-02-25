global.SensationResult = function(code, context) {
  const sexAction = SexAction.lookup(code);
  const player = context.P;
  const partner = context.T;

  const playerSensations = {
    anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0, desire:0 };

  const partnerSensations = {
    anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
    anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0 };

  const skillsUsed = { player:[], partner:[] };

  // Consent Effects
  // - **Eager** `(> 100)` All the positive sensation from this action get a bonus.
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
    const partnerBaseline = sexAction.getPartnerSensations();
    const playerBaseline = sexAction.getPlayerSensations();

    Object.keys(partnerBaseline).forEach(key => {
      partnerSensations[key] = partnerBaseline[key];
    });

    Object.keys(playerBaseline).forEach(key => {
      playerSensations[key] = playerBaseline[key];
    });

    if (consent === Consent.unwilling) {
      partnerSensations['anger'] += 100;
      partnerSensations['suffering'] += 100;
    }
    if (consent === Consent.reluctant) {
      partnerSensations['shame'] += 100;
      partnerSensations['submission'] += 100;
    }
  }

  // Almost every skill will have a technique roll, either by the player or the
  // partner, or by both if this is a mutual action. Not sure if we ever have
  // an action where neither person is using technique. I'll assume not for
  // now.
  //
  // In most cases, the technique roll only adds to the physical sensation
  // baselines for the opposite person. Some actions though have the player
  // acting on themselves. In these cases the skill list will include the
  // 'technique' skill to indicate that it's being used on themselves.
  //
  function applyTechnique() {
    const playerSkills = sexAction.getSkills().player;
    const partnerSkills = sexAction.getSkills().partner;

    // This will be complicated to figure out...
  }

  // The performance skill is applied automatically when a person is receiving
  // an action. The performance always adds a slight bonus to the desire
  // received. When an action includes desire specifically the bonus is higher
  // and the skill should get more experience.
  function applyPerformance() {

  }

  // Apply other skills like servicing, ravishing, dance, etc.
  function applySkills() {

  }

  function getPartnerSensations() {
    return ObjectHelper.select(partnerSensations, (key, value) => {
      return value > 0;
    });
  }

  function getPlayerSensations() {
    return ObjectHelper.select(playerSensations, (key, value) => {
      return value > 0;
    });
  }

  return Object.freeze({
    getConsent: () => { return consentResult; },
    getPartnerSensations,
    getPlayerSensations,
    applyFactors,
    applyBaseline,
    applyTechnique,
    applyPerformance,
    applySkills,
  });

}
