global.SensationPerformance = (function() {
  const physicalCodes = new Set(AnimusComponent.getProperties());

  // The performance skill is applied automatically when a person is receiving an action. The performance always adds a
  // slight bonus to the desire received. The performance skill is only increased by performance specific actions.
  // I don't have any player performance focused actions yet. I'm thinking they might work slightly differently as the
  // player character may have different skills and abilities than the partner characters.
  function apply(result) {
    const sexAction = result.getSexAction();
    const partnerSkills = sexAction.getSkills().partner || [];
    const playerSkills = sexAction.getSkills().player || [];

    if (partnerSkills.includes('performance')) { return applyPerformanceWhenPartnerFocused(result); }
    if (playerSkills.includes('performance')) { throw `TODO: Implement player performance focused actions.` }

    switch(sexAction.getDirection()) {
      case ActionDirection.partnerToPlayer:
        applyPerformanceSkill(result, { from:'partner', to:'player' }); break;
      case ActionDirection.partnerToSelf:
        applyPerformanceSkill(result, { from:'partner', to:'partner' }); break;
      case ActionDirection.partnerToBoth:
        applyPerformanceSkill(result, { from:'partner', to:'both' }); break;
      case ActionDirection.playerToPartner:
        applyPerformanceSkill(result, { from:'player', to:'partner' }); break;
      case ActionDirection.playerToSelf:
        applyPerformanceSkill(result, { from:'player', to:'player' }); break;
      case ActionDirection.playerToBoth:
        applyPerformanceSkill(result, { from:'player', to:'both' }); break;
      case ActionDirection.mutual:
        applyPerformanceSkill(result, { from:'player', to:'partner' });
        applyPerformanceSkill(result, { from:'partner', to:'player' });
    }
  }

  // A partner focused performance action that includes playerSensations (like lap-dance) will add the performance
  // skill roll to the physical sensations as well as increasing desire. Unlike the technique skill there is no
  // performance target to hit. We can always add the skill check value to the sensations.
  function applyPerformanceWhenPartnerFocused(result) {
    const consent = result.getConsentResult().getConsent();
    const partner = result.getPartner();

    if (consent === Consent.unwilling) { return; }

    result.addToPartnerSkills('performance');

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
      Object.keys(result.getPartnerHasSensations()).forEach(key => {
        if (physicalCodes.has(key)) { result.addPartnerSensation(key, label, value/2, extra); }
      });
    }
    if (check.fumble) {
      value = 0;
      label = 'Terrible Performance';
      extra = 'fumble';

      // If a partner fumbles their performance focused action, this generates
      // a large amount of shame and embarrassment.
      result.addPartnerSensation('shame',label,80,extra);
    }

    // Performance focused actions (like masturbate) usually don't have player
    // sensations other than desire. When they do (like lap dance) I want
    // performance to affect all of these values as well, though desire has
    // twice the effect.
    Object.keys(result.getPlayerHasSensations()).forEach(key => {
      if (value > 0) { result.addPlayerSensation(key, label, (key === 'desire' ? value*2 : value), extra); }
    });
  }

  // The applyPerformance() method is the opposite of the technique function because the 'to' entity is the character
  // doing the performing to the 'from' entity performing the action. A critical performance doesn't really do anything
  // but increase the desire in the acting character.
  function applyPerformanceSkill(result, options) {
    const consent = result.getConsentResult().getConsent();
    let consentFactor = 1;

    // Partner performance will suffer if consent is less than willing.
    // Player performance bonus to desire is unaffected by consent.
    if (result.getSexAction().getDirection() !== ActionDirection.playerToSelf) {
      if (consent === Consent.unwilling) { return; }
      if (consent === Consent.reluctant) { consentFactor = 0.5; }
    }

    const performingEntity = options.to === 'partner' ? result.getPartner() : result.getPlayer();
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
      if (options.from === 'player') { result.addPartnerSensation('shame',label,60,extra); }
    }

    if (value > 0) {
      if (options.from === 'partner') { result.addPartnerSensation('desire',label,value,extra); }
      if (options.from === 'player') { result.addPlayerSensation('desire',label,value,extra); }
    }
  }

  return Object.freeze({ apply });

})();
