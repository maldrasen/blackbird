global.ReferenceValidator = (function() {

  function validate() {
    Episode.getAllCodes().forEach(code => validateEpisodeQueue(code, Episode.lookup(code).getQueue()));

    SexAction.getAllCodes().forEach(code => {
      const action = SexAction.lookup(code);
      validateSexAction(code, {
        consentFactors: action.getConsentFactors(),
        persist: action.getPersist(),
        forcePosition: action.getForcePosition(),
        availableWhen: action.getAvailableWhen(),
        skills: action.getSkills(),
      });
    });
  }

  function validateEpisodeQueue(code, queue) {
    if (queue == null) { return; }
    const name = `Episode[${code}].queue`;

    if (queue.district != null) { Validate.isIn(`${name}.district`, queue.district, District.getAllCodes()); }
    if (queue.location != null) { Validate.isIn(`${name}.location`, queue.location, Location.getAllCodes()); }
  }

  function validateSexAction(code, data) {
    const name = `SexAction[${code}]`;
    const actionCodes = SexAction.getAllCodes();

    (data.consentFactors || []).forEach((factor,index) => {
      if (factor.type === 'preference') {
        Validate.isIn(`${name}.consentFactors[${index}].code`, factor.code, SexualPreference.getAllCodes());
      }
    });

    if (data.persist != null) {
      Validate.isIn(`${name}.persist.action`, data.persist.action, actionCodes);
      if (data.persist.revert != null && data.persist.revert !== _nothing) {
        Validate.isIn(`${name}.persist.revert`, data.persist.revert, actionCodes);
      }
    }

    if (data.forcePosition != null) {
      Validate.isIn(`${name}.forcePosition.code`, data.forcePosition.code, SexPosition.getAllCodes());
    }

    if (data.availableWhen != null) {
      if (data.availableWhen.persistedAction != null) {
        Validate.isIn(`${name}.availableWhen.persistedAction`, data.availableWhen.persistedAction, actionCodes);
      }
      if (data.availableWhen.previousAction != null) {
        Validate.isIn(`${name}.availableWhen.previousAction`, data.availableWhen.previousAction, actionCodes);
      }
    }

    Object.keys(data.skills || {}).forEach(role => {
      data.skills[role].forEach(skill => {
        Validate.isIn(`${name}.skills.${role}.${skill}`, skill, Skill.getAllCodes());
      });
    });
  }

  return {
    validate,
    validateEpisodeQueue,
    validateSexAction,
  };

})();
