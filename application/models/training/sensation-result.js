global.SensationResult = function(code, context) {
  const PhysicalCodes = new Set([
    'anus', 'cervix', 'clit', 'nipple', 'throat', 'cock', 'prostate', 'urethra', 'pussy'
  ]);

  const sexAction = SexAction.lookup(code);
  const player = context.P;
  const partner = context.T;

  // Only add sensation to parts the character actually has. This is important for anal actions that might include
  // prostate stimulus, or actions like a lap dance that has both cock and pussy sensations. (Sensations and part
  // checks will need to expand once we have actions that target nipple cocks and other strange body configurations.)
  const playerHasBreasts = BreastsComponent.lookup(player) != null;
  const playerHasCock = CockComponent.lookupNormalOf(player) != null;
  const playerHasPussy = PussyComponent.lookupNormalOf(player) != null;
  const partnerHasBreasts = BreastsComponent.lookup(partner) != null;
  const partnerHasCock = CockComponent.lookupNormalOf(partner) != null;
  const partnerHasPussy = PussyComponent.lookupNormalOf(partner) != null;

  const playerHas = {
    nipple:   playerHasBreasts,
    cock:     playerHasCock,
    prostate: playerHasCock,
    cervix:   playerHasPussy,
    clit:     playerHasPussy,
    pussy:    playerHasPussy};

  const partnerHas = {
    nipple:   partnerHasBreasts,
    cock:     partnerHasCock,
    prostate: partnerHasCock,
    cervix:   partnerHasPussy,
    clit:     partnerHasPussy,
    pussy:    partnerHasPussy };

  const playerSensations = {
    anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0, desire:0 };

  const partnerSensations = {
    anus:0, cervix:0, clit:0, nipple:0, throat:0, cock:0, prostate:0, urethra:0, pussy:0,
    anger:0, comfort:0, desire:0, shame:0, submission:0, suffering:0 };

  Object.keys(playerSensations).forEach(key => {
    if (playerHas[key] == null) { playerHas[key] = true; } });
  Object.keys(partnerSensations).forEach(key => {
    if (partnerHas[key] == null) { partnerHas[key] = true; } });

  // Consent Effects
  // - **Eager** `(> 100)` All the positive sensation from this action get a bonus.
  // - **Willing** `(25 - 100)` Default value, sensation calculations are normal.
  // - **Reluctant** `(0 - 25)` When consent is reluctant the positive sensation values are all penalized
  // - **Unwilling** `(< 0)` Increased negative sensations, anger, fear, etc. And very penalized positive values.

  const consentResult = ConsentResult(partner, player);
        consentResult.setSexAction(code);
        consentResult.applyFactors();
  const consent = consentResult.getConsent();

  const skillsUsed = { partner:[], player:[] };
  const response = { consent:consentResult, partner:{}, player:{} };

  function applyFactors() {
    applyBaseline();
  }

  // The applyBaseline() function always needs to be called first, even in the specs, in order to set up the response
  // object, and to give the sensations a starting value for the factors to work on. The baseline sensations for each
  // action is defined on the action itself. This should make it easy to balance the action sensation as they'll always
  // have a well defined starting place to individually tweak.
  //
  // We also need to take the consent into consideration here as well. If the partner is unwilling the action should
  // produce anger and suffering, even if it normally wouldn't. Likewise, a reluctant action should always produce some
  // submission and shame.
  function applyBaseline() {
    const partnerBaseline = sexAction.getPartnerSensations();
    const playerBaseline = sexAction.getPlayerSensations();

    Object.keys(partnerSensations).forEach(key => {
      response.partner[key] = []; });
    Object.keys(playerSensations).forEach(key => {
      response.player[key] = []; });
    Object.keys(partnerBaseline).forEach(key => {
      addPartnerSensation(key,'Baseline',partnerBaseline[key]); });
    Object.keys(playerBaseline).forEach(key => {
      addPlayerSensation(key,'Baseline',playerBaseline[key]); });

    if (consent === Consent.unwilling) {
      addPartnerSensation('anger','Baseline',100);
      addPartnerSensation('suffering','Baseline',100);
    }
    if (consent === Consent.reluctant) {
      addPartnerSensation('shame','Baseline',100);
      addPartnerSensation('submission','Baseline',100);
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
  // Technique is dex based and has a factor of 1.25, meaning the normal max
  // roll for Technique is 125, if a person has 100 dex. A high dex score
  // though might be around though, which puts the normal high range for
  // technique at around 10-38. It should be reasonable to just add the
  // technique skill value directly, double it on a crit, and set it to 0 on
  // a fumble.
  function applyTechnique() {
    const partnerSkills = sexAction.getSkills().partner || [];
    const playerSkills = sexAction.getSkills().player || [];

    if (partnerSkills.includes('technique')) {
      const check = SkillCheck(partner, 'technique');

      let value = check.value;
      if (check.crit) { value *= 2; }
      if (check.fumble) { value = 0; } // A performance 'fumble' shouldn't add anger maybe?

      console.log("Technique Check:",check);

      Object.keys(partnerSensations).forEach(code => {
        if (partnerSensations[code] > 0 && PhysicalCodes.has(code)) {
          console.log(`---Add ${value} to ${code}`);
          addPartnerSensation(code,'Technique',value);
        }
      });

      // sensation based on skill...
      //addPartnerSensation('')
    }
    if (playerSkills.includes('technique')) {
      const check = SkillCheck(player, 'technique');
    }

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

  function addPartnerSensation(code, label, value) {
    if (partnerHas[code]) {
      response.partner[code].push({ op:'add', label:label, value:value });
      partnerSensations[code] += value;
    }
  }

  function addPlayerSensation(code, label, value) {
    if (playerHas[code]) {
      response.player[code].push({ op:'add', label:label, value:value });
      playerSensations[code] += value;
    }
  }

  function multiplyPartnerSensation(code, label, value) {
    if (partnerHas[code] && partnerSensations[code]) {
      response.partner[code].push({ op:'mult', label:label, value:value });
      partnerSensations[code] *= value;
    }
  }

  function multiplyPlayerSensation(code, label, value) {
    if (playerHas[code] && playerSensations[code]) {
      response.player[code].push({ op:'mult', label:label, value:value });
      playerSensations[code] *= value;
    }
  }

  function getResponse() {
    const slimResponse = {
      consent: response.consent,
      partnerSensations: getPartnerSensations(),
      playerSensations: getPlayerSensations(),
      partner:{},
      player:{} };

    Object.keys(slimResponse.partnerSensations).forEach(key => {
      slimResponse.partner[key] = response.partner[key]; });
    Object.keys(slimResponse.playerSensations).forEach(key => {
      slimResponse.player[key] = response.player[key]; });

    return slimResponse;
  }

  function getPartnerSensations() {
    return ObjectHelper.select(partnerSensations, (key, value) => {
      return value > 0; });
  }

  function getPlayerSensations() {
    return ObjectHelper.select(playerSensations, (key, value) => {
      return value > 0; });
  }

  return Object.freeze({
    getConsent: () => { return consentResult; },
    getResponse,
    getPartnerSensations,
    getPlayerSensations,
    applyFactors,
    applyBaseline,
    applyTechnique,
    applyPerformance,
    applySkills,
  });

}
