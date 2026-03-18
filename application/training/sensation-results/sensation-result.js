/**
 * The sensation result model is used to hold the sensation data for a single sex action performed in a training
 * session. The SensationResult doesn't do much itself, and needs to be passed to all the other Sensation builder
 * modules to have their effects applied.
 *
 * @param {string} code - Sex action code
 * @param {object} context - Sex action context { T:partner, P:player }
 */
global.SensationResult = function(code, context) {
  const player = context.P;
  const partner = context.T;

  const sexAction = SexAction.lookup(code);
  const partnerSensations = Object.keys(sexAction.getPartnerSensations());
  const playerSensations = Object.keys(sexAction.getPlayerSensations());

  // Only add sensation to parts the character actually has. This is important for anal actions that might include
  // prostate stimulus, or actions like a lap dance that has both cock and pussy sensations. (Sensations and part
  // checks will need to expand once we have actions that target nipple cocks and other strange body configurations.)
  const playerHasBreasts = BreastsComponent.lookup(player) != null;
  const playerHasCock = CockComponent.lookupNormalOf(player) != null;
  const playerHasPussy = PussyComponent.lookupNormalOf(player) != null;
  const partnerHasBreasts = BreastsComponent.lookup(partner) != null;
  const partnerHasCock = CockComponent.lookupNormalOf(partner) != null;
  const partnerHasPussy = PussyComponent.lookupNormalOf(partner) != null;

  const partnerSensitivities = SensitivitiesComponent.lookup(partner);
  const partnerErogenousCervix = partnerSensitivities.cervix > 0;
  const partnerErogenousThroat = partnerSensitivities.throat > 0;
  const partnerErogenousUrethra = partnerSensitivities.urethra > 0;

  const playerSensitivities = SensitivitiesComponent.lookup(player);
  const playerErogenousCervix = playerSensitivities.cervix > 0;
  const playerErogenousThroat = playerSensitivities.throat > 0;
  const playerErogenousUrethra = playerSensitivities.urethra > 0;

  const playerHas = {
    desire:   true,
    anus:     playerSensations.includes('anus'),
    throat:   playerSensations.includes('throat')   && playerErogenousThroat,
    urethra:  playerSensations.includes('urethra')  && playerErogenousUrethra,
    nipple:   playerSensations.includes('nipple')   && playerHasBreasts,
    cock:     playerSensations.includes('cock')     && playerHasCock,
    prostate: playerSensations.includes('prostate') && playerHasCock,
    cervix:   playerSensations.includes('cervix')   && playerHasPussy && playerErogenousCervix,
    clit:     playerSensations.includes('clit')     && playerHasPussy,
    pussy:    playerSensations.includes('pussy')    && playerHasPussy };

  const partnerHas = {
    anger:      true,
    comfort:    true,
    desire:     true,
    shame:      true,
    submission: true,
    suffering:  true,
    anus:       partnerSensations.includes('anus'),
    throat:     partnerSensations.includes('throat')   && partnerErogenousThroat,
    urethra:    partnerSensations.includes('urethra')  && partnerErogenousUrethra,
    nipple:     partnerSensations.includes('nipple')   && partnerHasBreasts,
    cock:       partnerSensations.includes('cock')     && partnerHasCock,
    prostate:   partnerSensations.includes('prostate') && partnerHasCock,
    cervix:     partnerSensations.includes('cervix')   && partnerHasPussy && partnerErogenousCervix,
    clit:       partnerSensations.includes('clit')     && partnerHasPussy,
    pussy:      partnerSensations.includes('pussy')    && partnerHasPussy };

  Object.keys(playerHas).forEach(key => { if (playerHas[key] === false) { delete playerHas[key]; }});
  Object.keys(partnerHas).forEach(key => { if (partnerHas[key] === false) { delete partnerHas[key]; }});

  const consentResult = ConsentResult(partner, player);
        consentResult.setSexAction(code);
        consentResult.applyFactors();

  const skillsUsed = { partner:new Set(), player:new Set() };
  const response = { consent:consentResult, partner:{}, player:{} };

  Object.keys(playerHas).forEach(key => { response.player[key] = []; });
  Object.keys(partnerHas).forEach(key => { response.partner[key] = []; });


  // TODO: Refactoring all this. These functions will have to be called outside of the result class.
  function applyFactors() {
    // SensationBaseline.apply();
    // SensationTechnique.apply();
    // SensationPerformance.apply();
    // SensationSkills.apply();
    // SensationAlignment.apply();

    // This switch statement should ignore some of the consent factors that we don't use.
    sexAction.getConsentFactors().forEach(factor => {
      switch (factor.type) {
        case 'arousal': SensationArousal.apply(factor); break;
        case 'preference': SensationPreferences.apply(factor); break;
      }
    });
  }

  // =============================================
  //   Sensation Result : Apply Training Scales
  // =============================================
  // Training scales should be simple. They just represent part sensitivity. We might want to do some linear
  // interpolation between scale thresholds and the scale factor to make the scale curve smoothish. We'll have to come
  // back to this once we have the sensations adding their values to the scales.

  // This function should also determine character's weakness, that is the part that is the most sensitive, when
  // sensitivity is at least a B. Actions that hit the weakness generate slightly more sensation, maybe 25% more or so,
  // and should increase comfort as well. Unless this is a pain causing action, then we get increased pain.

  // ======================================================
  //   Sensation Result : Handle Persisted Action States
  // ======================================================
  // Well need to look at how persisted action states work with the sensation results as well. Because the persisted
  // states can interact with the current action we'll need to consider everything together in a single sensation
  // result for the turn.
  //
  // Most persisted action states would add to the baseline values I think. Having a dildo inserted adds a baseline
  // amount of pussy sensation and shame each turn. We should be able to ask the persisted state class for its
  // sensation values. If this is a follow on action though, (thrusting the dildo from the persisted state) we
  // probably wouldn't use the persisted state's baseline and would use the action's baseline instead.

  // ===========================================
  //   Sensation Result : Random Bullshit Go!
  // ===========================================
  // There are probably a bunch of other random shit that will end up adjusting these sensations. Body piercings,
  // magic, and drugs could all effect part sensitivities. There are some aspects that will change the way sensations
  // are produced.

  // ================================
  //   Sensation Result : Response
  // ================================

  function addPartnerSensation(code, label, value, extra=null) {
    if (partnerHas[code]) {
      response.partner[code].push({ op:'add', label:label, value:value, extra:extra });
    }
  }

  function addPlayerSensation(code, label, value, extra=null) {
    if (playerHas[code]) {
      response.player[code].push({ op:'add', label:label, value:value, extra:extra });
    }
  }

  function multiplyPartnerSensation(code, label, value, extra=null) {
    if (partnerHas[code]) {
      response.partner[code].push({ op:'mult', label:label, value:value, extra:extra });
    }
  }

  function multiplyPlayerSensation(code, label, value, extra=null) {
    if (playerHas[code]) {
      response.player[code].push({ op:'mult', label:label, value:value, extra:extra });
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
    return ObjectHelper.unfloat(compileSensations(Object.keys(partnerHas), response.partner));
  }

  function getPlayerSensations() {
    return ObjectHelper.unfloat(compileSensations(Object.keys(playerHas), response.player));
  }

  function compileSensations(keys, operations) {
    const sensations = {};

    if (Object.keys(operations).length === 0) {
      throw `The applyFactors() function should be called first.`
    }

    keys.forEach(key => { sensations[key] = 0; });

    keys.forEach(key => {
      operations[key].forEach(operation => {
        if (operation.op === 'add') { sensations[key] += operation.value; }
      });
    });

    keys.forEach(key => {
      operations[key].forEach(operation => {
        if (operation.op === 'mult') { sensations[key] *= operation.value; }
      });
    });

    return ObjectHelper.select(sensations, (key, value) => { return value > 0; });
  }

  function getSkillsUsed() {
    return {
      player:[...skillsUsed.player],
      partner:[...skillsUsed.partner]
    };
  }

  return Object.freeze({
    getConsentResult: () => { return consentResult; },
    getContext: () => { return context; },
    getPlayer: () => { return player; },
    getPartner: () => { return partner; },
    getSexAction: () => { return sexAction; },
    getPlayerHasSensations: () => { return playerHas; },
    getPartnerHasSensations: () => { return partnerHas; },
    getPlayerSensations,
    getPartnerSensations,
    addPlayerSensation,
    addPartnerSensation,
    multiplyPartnerSensation,
    multiplyPlayerSensation,
    addToPlayerSkills: skill => { skillsUsed.player.add(skill); },
    addToPartnerSkills: skill => { skillsUsed.partner.add(skill); },
    getSkillsUsed,
    getResponse,
  });

}
