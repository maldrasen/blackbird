/**
 * SensationResult is a long complicated module, used to calculate the sensation values for a single sex action. It's
 * tempting to break this into multiple modules, but I don't think that would really help to understand it, and would
 * only further complicate an already complicated process.
 *
 * @param {string} code - Sex action code
 * @param {object} context - Sex action context { T:partner, P:player }
 */
global.SensationResult = function(code, context) {

  const PhysicalCodes = new Set([
     'anus','cervix','clit','nipple','throat','cock','prostate','urethra','pussy'
  ]);

  const player = context.P;
  const partner = context.T;

  const sexAction = SexAction.lookup(code);
  const partnerSensations = Object.keys(sexAction.getPartnerSensations());
  const playerSensations = Object.keys(sexAction.getPlayerSensations());

  const partnerSkills = sexAction.getSkills().partner || [];
  const playerSkills = sexAction.getSkills().player || [];

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

  Object.keys(playerHas).forEach(key => { if (playerHas[key] === false) { delete playerHas[key]; }});
  Object.keys(partnerHas).forEach(key => { if (partnerHas[key] === false) { delete partnerHas[key]; }});

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

  // ========================
  //    Skills : Technique
  // ========================

  // Almost every skill will have a technique roll, either by the player or the partner, or by both if this is a mutual
  // action. In most cases, the technique roll only adds to the physical sensation baselines for the opposite person.
  // Crits or fumbles on skill checks could add to the emotional sensation as well though.
  //
  // Technique is dex based and has a factor of 1.25, meaning the normal max roll for Technique is 125, if a person has
  // 100 dex. A high dex score though might be around though, which puts the normal high range for technique at around
  // 10-38. It should be reasonable to just add the technique skill value directly, double it on a crit, and set it to
  // 0 on a fumble.
  function applyTechnique() {
    switch(sexAction.getDirection()) {
      case ActionDirection.partnerToPlayer:
        applyTechniqueSkill({ from:'partner', to:'player' }); break;
      case ActionDirection.partnerToSelf:
        applyTechniqueSkill({ from:'partner', to:'partner' }); break;
      case ActionDirection.partnerToBoth:
        applyTechniqueSkill({ from:'partner', to:'both' }); break;
      case ActionDirection.playerToPartner:
        applyTechniqueSkill({ from:'player', to:'partner' }); break;
      case ActionDirection.playerToSelf:
        applyTechniqueSkill({ from:'player', to:'player' }); break;
      case ActionDirection.playerToBoth:
        applyTechniqueSkill({ from:'player', to:'both' }); break;
      case ActionDirection.mutual:
        applyTechniqueSkill({ from:'player', to:'partner' });
        applyTechniqueSkill({ from:'partner', to:'player' });
    }
  }

  function applyTechniqueSkill(options) {
    (options.from === 'partner' ? skillsUsed.partner : skillsUsed.player).add('technique');

    const fromEntity = options.from === 'partner' ? partner : player;
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
      if (sexAction.directionHasPlayerActingOnPartner()) {
        multiplyPartnerSensation('anger',label,0.5,extra); }
    }

    if (value < sexAction.getTechniqueTarget()) {
      label = 'Poor Technique'
      extra = 'poor'
      value /= 2;

      if (sexAction.directionHasPartnerActingOnPlayer()) {
        addPartnerSensation('shame',label,25,extra); }
      if (sexAction.directionHasPlayerActingOnPartner()) {
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

    if (['partner','both'].includes(options.to)) {
      Object.keys(partnerHas).forEach(code => {
        if (value > 0 && PhysicalCodes.has(code)) {
          addPartnerSensation(code,label,value,extra);
        }
      });
    }

    if (['player','both'].includes(options.to)) {
      Object.keys(playerHas).forEach(code => {
        if (value > 0 && PhysicalCodes.has(code)) {
          addPlayerSensation(code,label,value,extra);
        }
      });
    }
  }

  // === Skills : Performance ==========================================================================================

  // The performance skill is applied automatically when a person is receiving an action. The performance always adds a
  // slight bonus to the desire received. The performance skill is only increased by performance specific actions.
  // I don't have any player performance focused actions yet. I'm thinking they might work slightly differently as the
  // player character may have different skills and abilities than the partner characters.
  function applyPerformance() {
    if (partnerSkills.includes('performance')) { return applyPerformanceWhenPartnerFocused(); }
    if (playerSkills.includes('performance')) { throw `TODO: Implement player performance focused actions.` }

    switch(sexAction.getDirection()) {
      case ActionDirection.partnerToPlayer:
        applyPerformanceSkill({ from:'partner', to:'player' }); break;
      case ActionDirection.partnerToSelf:
        applyPerformanceSkill({ from:'partner', to:'partner' }); break;
      case ActionDirection.partnerToBoth:
        applyPerformanceSkill({ from:'partner', to:'both' }); break;
      case ActionDirection.playerToPartner:
        applyPerformanceSkill({ from:'player', to:'partner' }); break;
      case ActionDirection.playerToSelf:
        applyPerformanceSkill({ from:'player', to:'player' }); break;
      case ActionDirection.playerToBoth:
        applyPerformanceSkill({ from:'player', to:'both' }); break;
      case ActionDirection.mutual:
        applyPerformanceSkill({ from:'player', to:'partner' });
        applyPerformanceSkill({ from:'partner', to:'player' });
    }
  }

  // A partner focused performance action that includes playerSensations (like lap-dance) will add the performance
  // skill roll to the physical sensations as well as increasing desire. Unlike the technique skill there is no
  // performance target to hit. We can always add the skill check value to the sensations.
  function applyPerformanceWhenPartnerFocused() {
    if (consent === Consent.unwilling) { return; }

    skillsUsed.partner.add('performance');

    const check = SkillCheck(partner, 'performance');

    let value = (consent === Consent.reluctant ? 0.5 : 1) * check.value;
    let label = 'Performance'
    let extra;

    if (check.crit) {
      value *= 2;
      label = 'Excellent Performance';
      extra = 'crit';

      // If a partner crits their performance focused action, this adds the
      // skill check value to their physical sensations. Technique could crit
      // as well leading to massive baseline sensations for performances.
      Object.keys(partnerHas).forEach(key => {
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

    // Performance focused actions (like masturbate) usually don't have player
    // sensations other than desire. When they do (like lap dance) I want
    // performance to effect all of these values as well, though desire has
    // twice the effect.
    Object.keys(playerHas).forEach(key => {
      if (value > 0) { addPlayerSensation(key, label, (key === 'desire' ? value*2 : value), extra); }
    });
  }

  // The applyPerformance() method is the opposite of the technique function because the 'to' entity is the character
  // doing the performing to the 'from' entity performing the action. A critical performance doesn't really do anything
  // but increase the desire in the acting character.
  function applyPerformanceSkill(options) {
    let consentFactor = 1;

    // Partner performance will suffer if consent is less than willing.
    // Player performance bonus to desire is unaffected by consent.
    if (sexAction.getDirection() !== ActionDirection.playerToSelf) {
      if (consent === Consent.unwilling) { return; }
      if (consent === Consent.reluctant) { consentFactor = 0.5; }
    }

    const performingEntity = options.to === 'partner' ? partner : player;
    const check = SkillCheck(performingEntity, 'performance');

    let value = consentFactor * (check.value / 2);
    let label = 'Performance';
    let extra = null;

    if (check.crit) {
      value *= 2;
      label = 'Excellent Performance';
      extra = 'crit';
    }
    if (check.fumble) {
      value = 0;
      label = 'Terrible Performance';
      extra = 'fumble';

      // Only the partner will generate extra shame from a botched performance.
      if (options.from === 'player') { addPartnerSensation('shame',label,60,extra); }
    }

    if (value > 0) {
      if (options.from === 'partner') { addPartnerSensation('desire',label,value,extra); }
      if (options.from === 'player') { addPlayerSensation('desire',label,value,extra); }
    }
  }

  // ===================================
  //    Skills : Servicing, Ravishing
  // ===================================

  // Apply other skills like servicing, ravishing, dance, etc.
  function applySkills() {

    playerSkills.forEach(skill => {
      if (['performance','technique'].includes(skill) === false) {
        if (skill === 'ravishing') { applyPlayerSkill({ skill:'ravishing', label:'Ravishing' }); }
        if (skill === 'servicing') { applyPlayerSkill({ skill:'servicing', label:'Servicing' }); }
      }
    });

    partnerSkills.forEach(skill => {
      if (['performance','technique'].includes(skill) === false) {
        if (skill === 'dance') { applyPartnerDancing(); }
        if (skill === 'servicing') { applyPartnerSkill({ skill:'servicing', label:'Servicing' }); }
      }
    });
  }

  // The partner's dancing skill doesn't affect the player's physical sensations, and will instead increase the
  // partner's submission; the enjoyment they receive from performing submissive actions. This skill needs to be an add
  // rather than a multiply, because the technique and performance skills don't really touch submission. This function
  // assumes the sexAction is one of the 'seductive' dances. In the future we might also have 'self-abusive' dances
  // that increase suffering, and masturbatory dances to increase sensations (actually lab dance is already like this
  // but handles the sensations as part of the technique skill)
  function applyPartnerDancing() {
    skillsUsed.partner.add('dance');

    const check = SkillCheck(partner, 'dance');
    let label = 'Dancing';
    let extra = null;

    if (check.crit) {
      extra = 'crit'
      label = `Skillful Dancing`;
    }
    if (check.fumble) {
      extra = 'fumble';
      label = `Clumsy Dancing`;
      addPartnerSensation('shame',label,80,extra);
    }

    addPartnerSensation('submission', label, check.value, extra);
  }

  function applyPartnerSkill(options) {
    skillsUsed.partner.add(options.skill);

    const check = SkillCheck(partner, options.skill);
    let factor = skillFactor(check);
    let label = options.label;
    let extra = null;

    if (check.crit) {
      extra = 'crit'
      label = `Skillful ${label}`;
    }
    if (check.fumble) {
      extra = 'fumble';
      label = `Clumsy ${label}`;

      // Again, a fumbled skill roll will add shame to the partner, adding it
      // if no shame exists in the baseline, or multiplying it if there is.
      (getPartnerSensations().shame == null) ?
        addPartnerSensation('shame',label,50,extra):
        multiplyPartnerSensation('shame',label,1.5,extra);
    }

    Object.keys(playerHas).forEach(key => {
      if (PhysicalCodes.has(key)) { multiplyPlayerSensation(key, label, factor, extra); }
    });
  }

  // The applyPlayerSkill() function applies to both player servicing and
  // player ravishing.
  function applyPlayerSkill(options) {
    skillsUsed.player.add(options.skill);

    const check = SkillCheck(player, options.skill);
    let factor = skillFactor(check);
    let label = options.label;
    let extra = null;

    // If we crit anger and suffering are reduced. It doesn't matter if there
    // is no baseline anger or suffering as they'll be 0 anyway.
    if (check.crit) {
      extra = 'crit'
      label = `Skillful ${label}`;
      multiplyPartnerSensation('comfort',label,1.5,extra);
      multiplyPartnerSensation('desire',label,1.5,extra);
      multiplyPartnerSensation('anger',label,0.5,extra);
      multiplyPartnerSensation('suffering',label,0.5,extra);
    }

    // If we fumble though, we need to add suffering and anger if they are not
    // in the baseline sensations, and increase them if they are.
    if (check.fumble) {
      extra = 'fumble'
      label = `Clumsy ${label}`

      const sensations = getPartnerSensations();

      (sensations.anger == null) ?
        addPartnerSensation('anger',label,100,extra):
        multiplyPartnerSensation('anger',label,1.5,extra);

      (sensations.suffering == null) ?
        addPartnerSensation('suffering',label,50,extra):
        multiplyPartnerSensation('suffering',label,1.5,extra);

      multiplyPartnerSensation('comfort',label,0.5,extra);
      multiplyPartnerSensation('desire',label,0.5,extra);
    }

    Object.keys(partnerHas).forEach(key => {
      if (PhysicalCodes.has(key)) { multiplyPartnerSensation(key, label, factor, extra); }
    });
  }

  // Still working out the effect that the skill roll should have on the
  // sensations. A normal skill roll is around 20, so having a normal factor
  // around 1.2 seems right. If this is a crit the factor would jump to 2.2,
  // and a fumble would drop it to 0.2 which seems reasonable.
  function skillFactor(check) {
    const base = Math.min(1, check.value/100);
    if (check.fumble) { return base; }       // Between 0 and 1
    if (check.crit)   { return base+2 }      // Between 2 and 3
    return base+1;                           // Between 1 and 2
  }


  // =====================================
  //   Sensation Result : Apply Arousal
  // =====================================
  // Arousal should at least affect the physical sensations. High arousal should also reduce anger and suffering,
  // increase comfort. (Perhaps also increase shame and submission) Arousal should touch desire at all though as
  // desire anima is what creates arousal.


  // =============================================
  //   Sensation Result : Apply Training Scales
  // =============================================
  // Training scales should be simple. They just represent part sensitivity. We might want to do some linear
  // interpolation between scale thresholds and the scale factor to make the scale curve smoothish.


  // ================================================
  //   Sensation Result : Apply Sexual Preferences
  // ================================================
  // Sexual preferences will need to do something different for the sensation results. I think each sexual preference
  // will need a list of sensations and factors which are used to determine how much the preference effects each
  // sensation.


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
  // magic, and drugs could all effect part sensitivities.


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

  function getSkillsUsed() {
    return {
      player:[...skillsUsed.player],
      partner:[...skillsUsed.partner]
    };
  }

  return Object.freeze({
    getConsent: () => { return consentResult; },
    getSkillsUsed,
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
