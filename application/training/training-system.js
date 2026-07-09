global.TrainingSystem = (function() {

  let state;

  // TODO: It's possible that a character may have some initial anger (or comfort) but that would depend on how this
  //       training began and their feelings towards the player.

  // Data: { player:id, partner:id }
  function startTraining(data) {
    state = TrainingState(data);
    TrainingInterface.startTraining();
  }

  // TODO: I don't think we actually want to drop arousal all the way to 0 after training. It makes sense that there
  //       should be a large drop. Erections should go away. But I think some characters will have a floor for arousal
  //       so that particularly horny characters are always at least a little aroused.
  function endTraining() {
    ArousalComponent.update(state.getPlayer(), { arousal:0 });
    ArousalComponent.update(state.getPartner(), { arousal:0 });
    TrainingInterface.endTraining(state);
    state = null;
  }

  function handleSexAction(code) {
    const sexAction = SexAction.lookup(code);
    state.clearMessages();
    state.determineAttitude(sexAction);

    // Before executing this action we need to check the existing persisted
    // actions, removing the actions that might interfere with the new action
    // or should be removed for other reasons.
    checkPersistedActions(sexAction);

    // We then check the sex position and change it if the next action requires
    // it. Changing position might also remove some or all persisted actions.
    PositionController.repositionIfNecessary(sexAction);

    const result = SensationResult.build(code, state);

    Console.log(`Executing SexAction`,{ system:'TrainingSystem', data:{
      partner: result.getPartnerSensations(),
      player: result.getPlayerSensations(),
    }});

    // TODO: We're no longer advancing the game time in modes like training and battle. Instead we want to keep track
    //       of the total time that training takes, and advance the game time after training is complete.
    // sexAction.getTime();

    handleSensationResult(result);
    persistAction(sexAction, result.getConsentResult());

    TrainingInterface.finishSexAction(result)
  }

  function handleSensationResult(result) {
    state.setPreviousAction(result.getSexAction().getCode());
    state.updateTrainingScales(result);
    updateStamina(result);
    updateArousal(result);
  }

  // The desire generated should cause the arousal to increase or decrease. The goal is to keep arousal value floating
  // between 0 and 100. Keeping the arousal consistently high should require the desire from the sensations to be very
  // high. Foreplay actions should produce more desire than servicing or fucking. Difficult actions in particular don't
  // generate much desire without the associated preferences. The idea is that the arousal system should usually have
  // the player going back to foreplay when their partner's arousal dips.
  //
  // I'm going to need to experiment with different r values here as small changes (0.002 vs 0.003) will have dramatic
  // results with how arousal is generated. I'll know it's too high if arousal is consistently pulled into the 90s. I
  // might need to look into dynamically adjusting the r-value based on a character's feelings or the other factors
  // that determine the desire values. (Or clamp the desire into a known range.)
  function updateArousal(result) {
    updateArousalFor(state.getPlayer(), result.getPlayerSensations());
    updateArousalFor(state.getPartner(), result.getPartnerSensations());
  }

  function updateArousalFor(entity, sensations) {
    let mostIntense;

    const character = Character(entity);
    const rValue = 0.0035;
    const pleasureDecayRate = 0.75;
    const comparative = CharacterMath.saturatingGrowthCurve(sensations.desire, 100, rValue);
    const arousalData = ArousalComponent.lookup(entity);

    if (comparative < arousalData.arousal) {
      const difference = arousalData.arousal - comparative;
      arousalData.arousal -= (difference/2);
    }
    if (comparative > arousalData.arousal) {
      const difference = comparative - arousalData.arousal;
      arousalData.arousal += (difference/2);
    }

    arousalData.pleasure *= pleasureDecayRate;

    AnimusComponent.getProperties().forEach(key => {
      if (sensations[key] > 0) {
        arousalData.pleasure += sensations[key];
        if (mostIntense == null || mostIntense.value < sensations[key]) {
          mostIntense = { code:key, value:sensations[key] };
        }
      }
    });

    const isOrgasm = (arousalData.refractory === 0) ? character.rollForOrgasm(arousalData.pleasure, mostIntense) : false;

    // TODO: Everything else that needs to happen when a character orgasms. Pleasure and arousal should be dropped
    //       dramatically, possibly down to 0, though I think some characters will have an arousal floor of some sort.
    //       We need something to hold the orgasm information so that it can be displayed in the UI.

    if (isOrgasm) {
      arousalData.edging = 0;
      arousalData.refractory = character.rollRefractoryPeriod();
    }
    if (isOrgasm === false) {
      arousalData.edging = calculateEdging(character.getOrgasmThreshold(), arousalData);
      arousalData.refractory = (arousalData.refractory === 0) ? 0 : arousalData.refractory - 1;
    }

    ArousalComponent.update(entity, ObjectHelper.unfloat(arousalData));
  }

  // The edging value can be a little arbitrary. It just needs to be a positive number that increases every turn that
  // the pleasure is over the orgasm threshold. The edging value should drop when the pleasure is under the threshold,
  // though not as quickly.
  function calculateEdging(threshold, arousalData) {
    const pleasure = arousalData.pleasure || 0;
    let edging = arousalData.edging || 0;

    if (pleasure > threshold) { edging += (pleasure - threshold) * 0.15; }
    if (pleasure < threshold) { edging -= (threshold - pleasure) * 0.10; }

    return (edging < 0) ? 0 : Math.round(edging);
  }

  // For now, we can just subtract the action stamina cost from the current staminas.
  function updateStamina(result) {
    const action = result.getSexAction();
    const player = state.getPlayer();
    const partner = state.getPartner();
    const playerHealth = HealthComponent.lookup(player);
    const partnerHealth = HealthComponent.lookup(partner);

    playerHealth.currentStamina -= action.getPlayerStamina();
    partnerHealth.currentStamina -= action.getPartnerStamina();

    HealthComponent.update(player, playerHealth);
    HealthComponent.update(partner, partnerHealth);
  }

  // When the next action is selected we need to check all the persisted actions to see if they should still continue.
  // The new action may interfere with the existing persisted actions, or other events (loss of consent, an orgasm)
  // may remove an action.
  function checkPersistedActions(sexAction) {
    const reverts = [];

    [...state.getPersistedActions()].forEach(persistedAction => {
      if (willContinue(persistedAction) === false) {
        state.removePersistedAction(persistedAction.getCode());

        const revert = persistedAction.getSexAction().getPersist().revert;
        if (revert !== _nothing) { reverts.push(revert); }
      }
      else if (actionsUseSameSlots(sexAction, persistedAction.getSexAction())) {
        state.removePersistedAction(persistedAction.getCode());
      }
    });

    // A revert only persists if its slots are still free, checked against both the incoming action and everything
    // that survived the sweep (including reverts that were admitted just before it).
    reverts.forEach(code => {
      const revertAction = SexAction.lookup(code);
      const conflict = actionsUseSameSlots(sexAction, revertAction) ||
        state.getPersistedActions().some(other => actionsUseSameSlots(revertAction, other.getSexAction()));

      if (conflict === false) { state.addPersistedAction(code); }
    });
  }

  // There are a few situations that may stop a persisted action from being performed. Currently this only happens
  // when the consent value of the action drops below the 'when' consent threshold.
  //
  // TODO: When we stop a persisted action because the action's consent value dropped below the action threshold we
  //       should set some kind of state value so that we can show something about that in the output.
  //
  // TODO: Other state changes could also change this action. If the persisted action is using a cock, and the cock
  //       haver has an orgasm, then the action should either stop entirely or change to a post orgasm version.

  function willContinue(persistedAction) {
    const persistData = persistedAction.getSexAction().getPersist();

    if (persistData.revert && persistData.when) {
      const consentResult = ConsentResult(state.getPartner(), state.getPlayer());
      consentResult.setSexAction(persistedAction.getCode());
      consentResult.applyFactors();
      return consentResult.getConsent() >= persistData.when;
    }

    return true;
  }

  // An action can't use the same slots as another action.
  function actionsUseSameSlots(actionA, actionB) {
    const aUses = actionA.getUses();
    const bUses = actionB.getUses();

    return aUses.player.some(slot => bUses.player.includes(slot)) ||
           aUses.partner.some(slot => bUses.partner.includes(slot));
  }

  function persistAction(sexAction, consentResult) {
    const persistData = sexAction.getPersist();
    if (persistData == null) { return false; }

    let persistCode = persistData.action;
    if (persistData.revert && persistData.when) {
      if (consentResult.getConsent() < persistData.when) {
        persistCode = persistData.revert;
      }
    }

    if (persistCode === _nothing) { return false; }

    state.addPersistedAction(persistCode);
  }

  function removePersistedAction(code) {
    state.removePersistedAction(code);
    TrainingPersistedActionsPanel.update();
  }

  // Sometimes, when the sex positon shifts and the partner is being reluctant (fearful, resistant, or violent) the
  // shift would require the use of the player's hands. This should be evident in the text of the shift message. When
  // this happens we need to unpersist any action that's using the player's hands, even if the next sex action wouldn't
  // normally use the player's hands.
  function positionUsedHands() {
    state.getPersistedActions().forEach(action => {
      if (action.getSexAction().usesSlot('player',TrainingSlot.hands)) {
        state.removePersistedAction(action.getCode());
      }
    });
  }

  return Object.freeze({
    startTraining,
    endTraining,
    handleSexAction,
    getState: () => { return state; },

    // handleSensationResult,
    updateArousal,
    updateStamina,
    checkPersistedActions,
    // persistAction,

    removePersistedAction,
    positionUsedHands,
  });

})();
