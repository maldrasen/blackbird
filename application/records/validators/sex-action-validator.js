global.SexActionValidator = function(code, data) {
  const name = `SexAction[${code}]`;

  const factorOrder = ['base','arousal','gender','preference'];

  // Alignments never use the pussy slot; within an alignment 'ass' is overloaded to mean both orifices, with
  // alignment.target naming the one this action actually uses. (See SexAlignment.)
  const alignmentParts = [TrainingSlot.ass, TrainingSlot.breasts, TrainingSlot.cock, TrainingSlot.hands, TrainingSlot.mouth];

  // The sensation keys SensationResult recognizes. Emotional sensations only apply to the partner; the player's only
  // emotional sensation is desire. Keys outside these sets would be silently dropped, so they fail here instead.
  const physicalSensations = ['anus','cervix','clit','cock','nipple','prostate','pussy','throat','urethra'];
  const emotionalSensations = ['anger','comfort','desire','shame','submission','suffering'];

  validateBasics();
  validateConsent();
  validateSensations();
  validateSkills();
  validatePersistence();
  validateAvailableWhen();

  function validateBasics() {
    Validate.isString(`${name}.name`, data.name);
    Validate.isString(`${name}.description`, data.description);
    if (data.persistedName != null) { Validate.isString(`${name}.persistedName`, data.persistedName); }

    Validate.isIn(`${name}.mainCategory`, data.mainCategory, Object.values(SexAction.MainCategory));
    Validate.isIn(`${name}.playerCategory`, data.playerCategory, Object.values(SexAction.PartCategory));
    Validate.isIn(`${name}.partnerCategory`, data.partnerCategory, Object.values(SexAction.PartCategory));
    Validate.isIn(`${name}.direction`, data.direction, Object.values(ActionDirection));

    Validate.isNumber(`${name}.time`, data.time);
    Validate.isNumber(`${name}.playerStamina`, data.playerStamina);
    Validate.isNumber(`${name}.partnerStamina`, data.partnerStamina);

    if (data.isPossible != null) { Validate.isFunction(`${name}.isPossible`, data.isPossible); }
  }

  function validateConsent() {
    Validate.isNumber(`${name}.consentTarget`, data.consentTarget);
    Validate.isNumber(`${name}.techniqueTarget`, data.techniqueTarget);
    if (data.minimumConsent != null) {
      Validate.isIn(`${name}.minimumConsent`, data.minimumConsent, Object.values(Consent));
    }

    Validate.isArray(`${name}.consentFactors`, data.consentFactors);
    Validate.atLeast(`${name}.consentFactors.length`, data.consentFactors.length, 1);
    Validate.equals(`${name}.consentFactors[0].type`, data.consentFactors[0].type, 'base');

    let orderIndex = 0;
    data.consentFactors.forEach((factor,index) => {
      const factorName = `${name}.consentFactors[${index}]`;
      Validate.isIn(`${factorName}.type`, factor.type, factorOrder);

      const position = factorOrder.indexOf(factor.type);
      if (position < orderIndex) {
        throw new Error(`${factorName} a ${factor.type} factor cannot follow a ${factorOrder[orderIndex]} factor`);
      }
      orderIndex = position;

      validateFactor(factorName, factor);
    });
  }

  function validateFactor(factorName, factor) {
    if (factor.type === 'base') {
      Validate.isIn(`${factorName}.baseClass`, factor.baseClass, Object.values(SexAction.BaseClass));
    }
    if (factor.scale != null) { Validate.isNumber(`${factorName}.scale`, factor.scale); }
    if (factor.strength != null) { Validate.isNumber(`${factorName}.strength`, factor.strength); }
    if (factor.type === 'preference') {
      Validate.isString(`${factorName}.code`, factor.code);
      Validate.trueOrNull(`${factorName}.conflicting`, factor.conflicting);
    }
  }

  function validateSensations() {
    validateSensationSet(`${name}.playerSensations`, data.playerSensations, [...physicalSensations,'desire']);
    validateSensationSet(`${name}.partnerSensations`, data.partnerSensations, [...physicalSensations, ...emotionalSensations]);

    Validate.exists(`${name}.orientation`, data.orientation);
    Object.keys(data.orientation).forEach(key =>
      Validate.isIn(`${name}.orientation.${key}`, key, ['submission','masochism','shame']));
    Validate.isNumber(`${name}.orientation.submission`, data.orientation.submission);
    Validate.isNumber(`${name}.orientation.masochism`, data.orientation.masochism);
    Validate.isNumber(`${name}.orientation.shame`, data.orientation.shame);
  }

  function validateSensationSet(setName, sensations, validKeys) {
    Validate.exists(setName, sensations);
    Object.keys(sensations).forEach(key => {
      Validate.isIn(`${setName}.${key}`, key, validKeys);
      Validate.isNumber(`${setName}.${key}`, sensations[key]);
    });
  }

  function validateSkills() {
    if (data.skills == null) { return; }

    Object.keys(data.skills).forEach(role => {
      Validate.isIn(`${name}.skills.${role}`, role, ['player','partner']);
      Validate.isArray(`${name}.skills.${role}`, data.skills[role]);
      Validate.singleOrArrayOf(`${name}.skills.${role}`, data.skills[role], 'string');
    });
  }

  function validatePersistence() {
    if (data.persist != null) {
      Validate.isString(`${name}.persist.action`, data.persist.action);
      if (data.persist.revert != null) { Validate.isString(`${name}.persist.revert`, data.persist.revert); }
      if (data.persist.when != null) {
        Validate.isIn(`${name}.persist.when`, data.persist.when, Object.values(Consent));
      }
    }

    if (data.uses != null) {
      validateSlotArray(`${name}.uses.player`, data.uses.player);
      validateSlotArray(`${name}.uses.partner`, data.uses.partner);
    }

    if (data.alignment != null) { validateAlignment(`${name}.alignment`, data.alignment); }

    if (data.penetration != null) {
      Validate.isString(`${name}.penetration.player`, data.penetration.player);
      Validate.isString(`${name}.penetration.partner`, data.penetration.partner);
    }

    if (data.forcePosition != null) {
      Validate.isString(`${name}.forcePosition.code`, data.forcePosition.code);
      Validate.trueOrNull(`${name}.forcePosition.playerFirst`, data.forcePosition.playerFirst);
      Validate.trueOrNull(`${name}.forcePosition.clearPersisted`, data.forcePosition.clearPersisted);
    }
  }

  function validateAlignment(alignmentName, alignment) {
    Validate.exists(`${alignmentName}.player`, alignment.player);
    Validate.exists(`${alignmentName}.partner`, alignment.partner);
    if (alignment.target != null) {
      Validate.isIn(`${alignmentName}.target`, alignment.target, Object.values(TrainingSlot));
    }

    ['player','partner'].forEach(role => {
      Object.keys(alignment[role]).forEach(part => {
        Validate.isIn(`${alignmentName}.${role}.${part}`, part, alignmentParts);
        Validate.isString(`${alignmentName}.${role}.${part}`, alignment[role][part]);
      });
    });
  }

  // An availableWhen can match on a persisted or previous action code, on a player and partner slot pairing, or on
  // an isPossible closure. The player and partner slot arrays only work as a pair.
  function validateAvailableWhen() {
    const when = data.availableWhen;
    if (when == null) { return; }

    Object.keys(when).forEach(key =>
      Validate.isIn(`${name}.availableWhen.${key}`, key, ['isPossible','persistedAction','previousAction','player','partner']));

    if (when.isPossible != null) { Validate.isFunction(`${name}.availableWhen.isPossible`, when.isPossible); }
    if (when.persistedAction != null) { Validate.isString(`${name}.availableWhen.persistedAction`, when.persistedAction); }
    if (when.previousAction != null) { Validate.isString(`${name}.availableWhen.previousAction`, when.previousAction); }

    if (when.player != null || when.partner != null) {
      validateSlotArray(`${name}.availableWhen.player`, when.player);
      validateSlotArray(`${name}.availableWhen.partner`, when.partner);
    }
  }

  function validateSlotArray(slotsName, slots) {
    Validate.isArray(slotsName, slots);
    slots.forEach(slot => Validate.isIn(`${slotsName}.${slot}`, slot, Object.values(TrainingSlot)));
  }
}
