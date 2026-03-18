global.SensationTechnique = (function() {
  const physicalCodes = new Set(AnimusComponent.getProperties());

  // Almost every skill will have a technique roll, either by the player or the partner, or by both if this is a mutual
  // action. In most cases, the technique roll only adds to the physical sensation baselines for the opposite person.
  // Crits or fumbles on skill checks could add to the emotional sensation as well though.
  //
  // Technique is dex based and has a factor of 1.25, meaning the normal max roll for Technique is 125, if a person has
  // 100 dex. A high dex score though might be around though, which puts the normal high range for technique at around
  // 10-38. It should be reasonable to just add the technique skill value directly, double it on a crit, and set it to
  // 0 on a fumble.
  function apply(result) {
    switch(result.getSexAction().getDirection()) {
      case ActionDirection.partnerToPlayer:
        applyTechniqueSkill(result, { from:'partner', to:'player' }); break;
      case ActionDirection.partnerToSelf:
        applyTechniqueSkill(result, { from:'partner', to:'partner' }); break;
      case ActionDirection.partnerToBoth:
        applyTechniqueSkill(result, { from:'partner', to:'both' }); break;
      case ActionDirection.playerToPartner:
        applyTechniqueSkill(result, { from:'player', to:'partner' }); break;
      case ActionDirection.playerToSelf:
        applyTechniqueSkill(result, { from:'player', to:'player' }); break;
      case ActionDirection.playerToBoth:
        applyTechniqueSkill(result, { from:'player', to:'both' }); break;
      case ActionDirection.mutual:
        applyTechniqueSkill(result, { from:'player', to:'partner' });
        applyTechniqueSkill(result, { from:'partner', to:'player' });
    }
  }

  function applyTechniqueSkill(result, options) {
    options.from === 'partner' ? result.addToPartnerSkills('technique') : result.addToPlayerSkills('technique');

    const fromEntity = options.from === 'partner' ? result.getPartner() : result.getPlayer();
    const sexAction = result.getSexAction();
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
        result.multiplyPartnerSensation('anger',label,0.5,extra); }
    }

    if (value < sexAction.getTechniqueTarget()) {
      label = 'Poor Technique'
      extra = 'poor'
      value /= 2;

      if (sexAction.directionHasPartnerActingOnPlayer()) {
        result.addPartnerSensation('shame',label,25,extra); }
      if (sexAction.directionHasPlayerActingOnPartner()) {
        result.addPartnerSensation('anger',label,50,extra); }
    }

    if (check.crit) {
      value *= 2;
      label = 'Excellent Technique';
      extra = 'crit';

      if (options.to === 'partner') {
        result.addPartnerSensation('desire',label,50,extra); }
      if (options.to === 'player') {
        result.addPlayerSensation('desire',label,50,extra); }
    }
    if (check.fumble) {
      value = 0;
      label = 'Terrible Technique';
      extra = 'fumble';

      if (options.from === 'partner' && options.to === 'player') {
        result.addPartnerSensation('shame',label,50,extra); }
      if (options.from === 'player' && options.to === 'partner') {
        result.addPartnerSensation('anger',label,100,extra); }
    }

    if (['partner','both'].includes(options.to)) {
      Object.keys(result.getPartnerHasSensations()).forEach(code => {
        if (value > 0 && physicalCodes.has(code)) {
          result.addPartnerSensation(code,label,value,extra);
        }
      });
    }

    if (['player','both'].includes(options.to)) {
      Object.keys(result.getPlayerHasSensations()).forEach(code => {
        if (value > 0 && physicalCodes.has(code)) {
          result.addPlayerSensation(code,label,value,extra);
        }
      });
    }
  }

  return Object.freeze({ apply });

})();
