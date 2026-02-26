global.SensationResult = function(code, context) {

  const PhysicalCodes = new Set([
     'anus','cervix','clit','nipple','throat','cock','prostate','urethra','pussy'
  ]);

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

  const playerHas = {
    desire:   true,
    anus:     playerSensations.includes('anus'),
    throat:   playerSensations.includes('throat'),
    urethra:  playerSensations.includes('urethra'),
    nipple:   playerSensations.includes('nipple')   && playerHasBreasts,
    cock:     playerSensations.includes('cock')     && playerHasCock,
    prostate: playerSensations.includes('prostate') && playerHasCock,
    cervix:   playerSensations.includes('cervix')   && playerHasPussy,
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
    throat:     partnerSensations.includes('throat'),
    urethra:    partnerSensations.includes('urethra'),
    nipple:     partnerSensations.includes('nipple')   && partnerHasBreasts,
    cock:       partnerSensations.includes('cock')     && partnerHasCock,
    prostate:   partnerSensations.includes('prostate') && partnerHasCock,
    cervix:     partnerSensations.includes('cervix')   && partnerHasPussy,
    clit:       partnerSensations.includes('clit')     && partnerHasPussy,
    pussy:      partnerSensations.includes('pussy')    && partnerHasPussy };

  // Consent Effects
  // - **Eager** `(> 100)` All the positive sensation from this action get a bonus.
  // - **Willing** `(25 - 100)` Default value, sensation calculations are normal.
  // - **Reluctant** `(0 - 25)` When consent is reluctant the positive sensation values are all penalized
  // - **Unwilling** `(< 0)` Increased negative sensations, anger, fear, etc. And very penalized positive values.

  const consentResult = ConsentResult(partner, player);
        consentResult.setSexAction(code);
        consentResult.applyFactors();
  const consent = consentResult.getConsent();

  const skillsUsed = { partner:new Set(), player:new Set() };
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

    Object.keys(partnerHas).forEach(key => {
      response.partner[key] = []; });
    Object.keys(playerHas).forEach(key => {
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

  // Almost every skill will have a technique roll, either by the player or the partner, or by both if this is a mutual
  // action. Not sure if we ever have an action where neither person is using technique. I'll assume not for now.
  //
  // In most cases, the technique roll only adds to the physical sensation baselines for the opposite person. Some
  // actions though have the player acting on themselves. In these cases the skill list will include the 'technique'
  // skill to indicate that it's being used on themselves.
  //
  // Technique is dex based and has a factor of 1.25, meaning the normal max roll for Technique is 125, if a person has
  // 100 dex. A high dex score though might be around though, which puts the normal high range for technique at around
  // 10-38. It should be reasonable to just add the technique skill value directly, double it on a crit, and set it to
  // 0 on a fumble.
  function applyTechnique() {
    const partnerSkills = sexAction.getSkills().partner || [];
    const playerSkills = sexAction.getSkills().player || [];

    if (partnerSkills.includes('technique')) {
      return applyTechniqueSkill({ from:'partner', to:'partner' }); }
    if (playerSkills.includes('technique')) {
      return applyTechniqueSkill({ from:'player', to:'player' }); }

    if (partnerSkills.length === 0 && playerSkills.length > 0) {
      return applyTechniqueSkill({ from:'player', to:'partner' }); }
    if (partnerSkills.length > 0 && playerSkills.length === 0) {
      return applyTechniqueSkill({ from:'partner', to:'player' }); }

    applyTechniqueSkill({ from:'player', to:'partner' });
    applyTechniqueSkill({ from:'partner', to:'player' });
  }

  function applyTechniqueSkill(options) {
    (options.from === 'partner' ? skillsUsed.partner : skillsUsed.player).add('technique');

    const fromEntity = options.from === 'partner' ? partner : player;
    const toHas = options.to === 'partner' ? partnerHas : playerHas;
    const check = SkillCheck(fromEntity, 'technique');

    let value = check.value;
    let label = 'Technique';
    let extra = null;

    // It's possible to both crit and exceed the technique target by 2, in
    // which case the sensation value is quadrupled. The anger that may have
    // been caused by this action is also reduced.
    if (value > sexAction.getTechniqueTarget() * 2) {
      label = 'Pleasing Technique'
      extra = 'good'
      value *= 2;
      if (options.from === 'player' && options.to === 'partner') {
        multiplyPartnerSensation('anger',label,0.5,extra); }
    }

    if (value < sexAction.getTechniqueTarget()) {
      label = 'Poor Technique'
      extra = 'poor'
      value /= 2;

      if (options.from === 'partner' && options.to === 'player') {
        addPartnerSensation('shame',label,25,extra); }
      if (options.from === 'player' && options.to === 'partner') {
        addPartnerSensation('anger',label,50,extra); }
    }

    if (check.crit) {
      value *= 2;
      label = 'Excellent Technique';
      extra = 'crit';

      if (options.to === 'partner') {
        addPartnerSensation('desire',label,50,extra); }
      if (options.to === 'player') {
        addPlayerSensation('desire',label,50,extra); }
    }
    if (check.fumble) {
      value = 0;
      label = 'Terrible Technique';
      extra = 'fumble';

      if (options.from === 'partner' && options.to === 'player') {
        addPartnerSensation('shame',label,50,extra); }
      if (options.from === 'player' && options.to === 'partner') {
        addPartnerSensation('anger',label,100,extra); }
    }

    Object.keys(toHas).forEach(code => {
      if (value > 0 && PhysicalCodes.has(code)) {
        if (options.to === 'partner') { addPartnerSensation(code,label,value,extra); }
        if (options.to === 'player')  { addPlayerSensation(code,label,value,extra); }
      }
    });

    // Lap dance is a special case. It's adds the technique skill to both the
    // player's and the partner's sensations. It's kind of masturbation while
    // grinding. The player is uninvolved, so the partner's technique is
    // applied twice. If we didn't add cock sensation here it wouldn't get any
    // value from the partner's technique. If there are other actions like this
    // (there probably will be) we'll need to figure out a way to flag these
    // "one person's technique pleasuring two people at once" actions.
    if (sexAction.getCode() === 'lap-dance') {
      addPlayerSensation('cock',label,value,extra);
    }
  }

  // The performance skill is applied automatically when a person is receiving an action. The performance always adds a
  // slight bonus to the desire received. When an action includes desire specifically the bonus is higher. The
  // performance skill is only increased by performance specific actions.
  function applyPerformance() {
    const partnerSkills = sexAction.getSkills().partner || [];
    const playerSkills = sexAction.getSkills().player || [];

    // I don't have any player performance focused actions yet. I'm thinking
    // they might work slightly differently as the player character may have
    // different skills and abilities than the partner characters.
    if (playerSkills.includes('performance')) {
      throw `TODO: Implement player performance focused actions.`
    }

    if (partnerSkills.includes('performance')) {
      if (playerSkills.length > 0) { throw `Player should not be doing anything if this is performance focused.`; }
      return applyPerformanceWhenPartnerFocused(); }

    if (partnerSkills.length === 0 && playerSkills.length > 0) {
      return applyPerformanceSkill({ from:'player', to:'partner' }); }
    if (partnerSkills.length > 0 && playerSkills.length === 0) {
      return applyPerformanceSkill({ from:'partner', to:'player' }); }

    applyPerformanceSkill({ from:'player', to:'partner' });
    applyPerformanceSkill({ from:'partner', to:'player' });
  }

  // A partner focused performance action that includes playerSensations (like lap-dance) will add the performance
  // skill roll to the physical sensations as well as increasing desire. Unlike the technique skill there is no
  // performance target to hit. We can always add the skill check value to the sensations.
  function applyPerformanceWhenPartnerFocused() {
    skillsUsed.partner.add('performance');

    const check = SkillCheck(partner, 'performance');

    let value = check.value;
    let label = 'Performance'
    let extra;

    if (check.crit) {
      value *= 2;
      label = 'Excellent Performance';
      extra = 'crit';

      // If a partner crits their performance focused action, this adds the
      // skill check value to their physical sensations. Technique could crit
      // as well leading to massive baseline sensations for performances.
      Object.keys(sexAction.getPartnerSensations()).forEach(key => {
        if (PhysicalCodes.has(key)) { addPartnerSensation(key, label, value/2, extra); }
      });
    }
    if (check.fumble) {
      value = 0;
      label = 'Terrible Performance';
      extra = 'fumble';

      // If a partner fumbles their performance focused action, this generates
      // a large amount of shame and embarrassment.
      addPartnerSensation('shame',label,80,extra);
    }

    Object.keys(sexAction.getPlayerSensations()).forEach(key => {
      if (value > 0) { addPlayerSensation(key, label, (key === 'desire' ? value*2 : value), extra); }
    });
  }

  // The applyPerformance() method is the opposite of the technique function because the 'to' entity is the character
  // doing the performing to the 'from' entity performing the action.
  function applyPerformanceSkill(options) {
    (options.to === 'partner' ? skillsUsed.partner : skillsUsed.player).add('performance');

    const performingEntity = options.to === 'partner' ? partner : player;
    const check = SkillCheck(performingEntity, 'performance');

    let value = (check.value / 2);
    let label = 'Performance';
    let extra = null;

    // if (check.crit) {
    //   value *= 2;
    //   label = 'Excellent Technique';
    //   extra = 'crit';
    //
    //   if (options.to === 'partner') {
    //     addPartnerSensation('desire',label,50,extra); }
    //   if (options.to === 'player') {
    //     addPlayerSensation('desire',label,50,extra); }
    // }
    // if (check.fumble) {
    //   value = 0;
    //   label = 'Terrible Technique';
    //   extra = 'fumble';
    //
    //   if (options.from === 'partner' && options.to === 'player') {
    //     addPartnerSensation('shame',label,50,extra); }
    //   if (options.from === 'player' && options.to === 'partner') {
    //     addPartnerSensation('anger',label,100,extra); }
    // }

    if (options.from === 'partner') { addPartnerSensation('desire',label,value,extra); }
    if (options.from === 'player') { addPlayerSensation('desire',label,value,extra); }
  }

  // Apply other skills like servicing, ravishing, dance, etc.
  function applySkills() {

  }

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
    return compileSensations(Object.keys(partnerHas), response.partner)
  }

  function getPlayerSensations() {
    return compileSensations(Object.keys(playerHas), response.player)
  }

  function compileSensations(keys, operations) {
    const sensations = {};

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

  return Object.freeze({
    getConsent: () => { return consentResult; },
    getSkillsUsed: () => { return skillsUsed; },
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
