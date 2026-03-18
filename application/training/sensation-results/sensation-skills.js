global.SensationSkills = (function() {

  // Apply other skills like servicing, ravishing, dance, etc.
  function apply(result) {
    const sexAction = result.getSexAction();
    const partnerSkills = sexAction.getSkills().partner || [];
    const playerSkills = sexAction.getSkills().player || [];

    playerSkills.forEach(skill => {
      if (['performance','technique'].includes(skill) === false) {
        if (skill === 'ravishing') { applyPlayerSkill(result, { skill:'ravishing', label:'Ravishing' }); }
        if (skill === 'servicing') { applyPlayerSkill(result, { skill:'servicing', label:'Servicing' }); }
      }
    });

    partnerSkills.forEach(skill => {
      if (['performance','technique'].includes(skill) === false) {
        if (skill === 'dance') { applyPartnerDancing(result); }
        if (skill === 'servicing') { applyPartnerSkill(result, { skill:'servicing', label:'Servicing' }); }
      }
    });
  }

  // The partner's dancing skill doesn't affect the player's physical sensations, and will instead increase the
  // partner's submission; the enjoyment they receive from performing submissive actions. This skill needs to add
  // rather than multiply, because the technique and performance skills don't really touch submission. This function
  // assumes the sexAction is one of the 'seductive' dances. In the future we might also have 'self-abusive' dances
  // that increase suffering, and masturbatory dances to increase sensations (actually lab dance is already like this
  // but handles the sensations as part of the technique skill)
  function applyPartnerDancing(result) {
    const partner = result.getPartner();

    result.addToPartnerSkills('dance');

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
      result.addPartnerSensation('shame',label,80,extra);
    }

    result.addPartnerSensation('submission', label, check.value, extra);
  }

  function applyPartnerSkill(result, options) {
    const partner = result.getPartner();

    result.addToPartnerSkills(options.skill);

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
      (result.getPartnerSensations().shame == null) ?
        result.addPartnerSensation('shame',label,50,extra):
        result.multiplyPartnerSensation('shame',label,1.5,extra);
    }

    Object.keys(result.getPlayerHasSensations()).forEach(key => {
      if (AnimusComponent.has(key)) {
        result.multiplyPlayerSensation(key, label, factor, extra);
      }
    });
  }

  // The applyPlayerSkill() function applies to both player servicing and
  // player ravishing.
  function applyPlayerSkill(result, options) {
    const player = result.getPlayer();

    result.addToPlayerSkills(options.skill);

    const check = SkillCheck(player, options.skill);
    let factor = skillFactor(check);
    let label = options.label;
    let extra = null;

    // If we crit anger and suffering are reduced. It doesn't matter if there
    // is no baseline anger or suffering as they'll be 0 anyway.
    if (check.crit) {
      extra = 'crit'
      label = `Skillful ${label}`;
      result.multiplyPartnerSensation('comfort',label,1.5,extra);
      result.multiplyPartnerSensation('desire',label,1.5,extra);
      result.multiplyPartnerSensation('anger',label,0.5,extra);
      result.multiplyPartnerSensation('suffering',label,0.5,extra);
    }

    // If we fumble though, we need to add suffering and anger if they are not
    // in the baseline sensations, and increase them if they are.
    if (check.fumble) {
      extra = 'fumble'
      label = `Clumsy ${label}`

      const sensations = result.getPartnerSensations();

      (sensations.anger == null) ?
        result.addPartnerSensation('anger',label,100,extra):
        result.multiplyPartnerSensation('anger',label,1.5,extra);

      (sensations.suffering == null) ?
        result.addPartnerSensation('suffering',label,50,extra):
        result.multiplyPartnerSensation('suffering',label,1.5,extra);

      result.multiplyPartnerSensation('comfort',label,0.5,extra);
      result.multiplyPartnerSensation('desire',label,0.5,extra);
    }

    Object.keys(result.getPartnerHasSensations()).forEach(key => {
      if (AnimusComponent.has(key)) {
        result.multiplyPartnerSensation(key, label, factor, extra);
      }
    });
  }

  // Still working out the effect that the skill roll should have on the sensations. A normal skill roll is around 20,
  // so having a normal factor around 1.2 seems right. If this is a crit the factor would jump to 2.2, and a fumble
  // would drop it to 0.2 which seems reasonable.
  function skillFactor(check) {
    const base = Math.min(1, check.value/100);
    if (check.fumble) { return base; }       // Between 0 and 1
    if (check.crit)   { return base+2 }      // Between 2 and 3
    return base+1;                           // Between 1 and 2
  }

  return Object.freeze({ apply });

})()