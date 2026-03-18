/**
 * The sensation result model is used to hold the sensation data for a single sex action performed in a training
 * session. The SensationResult doesn't do much itself, and needs to be passed to all the other Sensation builder
 * modules to have their effects applied.
 *
 * @param {string} code - Sex action code
 * @param {object} state - TrainingState
 */
global.SensationResult = function(code, state) {
  const context = state.getContext();
  const persistedActions = state.getPersistedActions();
  const previousAction = state.getPreviousAction();

  const player = context.P;
  const partner = context.T;

  // We include the sensations that the sex action influences.
  const sexAction = SexAction.lookup(code);
  const partnerSensations = Object.keys(sexAction.getPartnerSensations());
  const playerSensations = Object.keys(sexAction.getPlayerSensations());

  // We also include the sensations that the persisted actions influence.
  persistedActions.forEach(persistedAction => {
    Object.keys(persistedAction.getSexAction().getPartnerSensations()).forEach(code => {
      if (partnerSensations.includes(code) === false) { partnerSensations.push(code); }});
    Object.keys(persistedAction.getSexAction().getPlayerSensations()).forEach(code => {
      if (playerSensations.includes(code) === false) { playerSensations.push(code); }});
  });

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
    getState: () => { return state; },
    getPlayer: () => { return player; },
    getPartner: () => { return partner; },
    getSexAction: () => { return sexAction; },
    getPreviousAction: () => { return previousAction; },
    getPersistedActions: () => { return persistedActions },

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

SensationResult.build = function(code, state) {
  const result = SensationResult(code, state);

  SensationBaseline.apply(result);
  SensationTechnique.apply(result);
  SensationPerformance.apply(result);
  SensationSkills.apply(result);
  SensationAlignment.apply(result);
  SensationScales.apply(result);

  // The consent factor contains some of the same data that can be used to
  // build the sensations, though not every consent factor is used.
  result.getSexAction().getConsentFactors().forEach(factor => {
    switch (factor.type) {
      case 'arousal': SensationArousal.apply(result, factor); break;
      case 'preference': SensationPreferences.apply(result, factor); break;
    }
  });

  return result;
}
