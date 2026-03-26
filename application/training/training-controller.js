global.TrainingController = (function() {

  let state;

  // Start needs to initialize all the controller's state variables so that state doesn't leak between training events.
  // These are the transient scale values that overflow into the acquired anima and animus at the end of training.
  //
  // TODO: It's possible that a character may have some initial anger (or comfort) but that would depend on how this
  //       training began and their feelings towards the player.
  function startTraining(data) {
    state = TrainingState(data);
  }

  function endTraining() {
    ArousalComponent.update(state.getPartner(), { arousal:0 });
    StateMachine.handleCommand(CommandType.trainingEnd);
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

    if (arousalData.refectory == null) { arousalData.refectory = 0; }
    if (arousalData.pleasure == null) { arousalData.pleasure = 0; }

    arousalData.pleasure *= pleasureDecayRate;

    AnimusComponent.getProperties().forEach(key => {
      if (sensations[key] > 0) {
        arousalData.pleasure += sensations[key];
        if (mostIntense == null || mostIntense.value < sensations[key]) {
          mostIntense = { code:key, value:sensations[key] };
        }
      }
    });

    const isOrgasm = character.rollForOrgasm(mostIntense);

    // TODO: Everything else that needs to happen when a character orgasms.
    //       We need something to hold that information so that it can be
    //       displayed in the UI.

    if (isOrgasm) {
      arousalData.edging = 0;
      arousalData.refectory = character.rollRefectoryPeriod();
    }
    if (isOrgasm === false) {
      arousalData.edging = calculateEdging(character.getOrgasmThreshold(), arousalData);
      arousalData.refectory = arousalData.refectory === 0 ? 0 : arousalData.refectory - 1;
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

  function checkPersistedActions(sexAction) {
    [...state.getPersistedActions()].forEach(persistedAction => {

      if (willContinue(persistedAction) === false) {
        state.removePersistedAction(persistedAction.getCode());
      }

      if (actionsUseSameSlots(sexAction, persistedAction)) {
        state.removePersistedAction(persistedAction.getCode());
      }
    });
  }

  // TODO: When we stop a persisted action because the action's consent value dropped below the action threshold we
  //   should set some kind of state value so that we can show something about that in the output. If this action
  //   reverts to something else, I think we can add it to the persisted actions. The consent might be too low still,
  //   but we revert new actions the same way.

  // TODO: Other state changes could also change this action. If the persisted action is using a cock, and the cock
  //   haver has an orgasm, then the action should either stop entirely or change to a post orgasm version.

  function willContinue(persistedAction) {
    const persistData = persistedAction.getSexAction().getPersist();
    if (persistData.revert && persistData.when) {
      console.log(`Recalculate Consent: ${persistedAction.getCode()}`);

      const consentResult = ConsentResult(state.getPartner(), state.getPlayer());
      consentResult.setSexAction(persistedAction.getCode());
      consentResult.applyFactors();

      if (consentResult.getConsent() <= persistData.when) {
        console.log(` - ${persistedAction.getCode()} Consent Dropped Below Threshold!`)
        if (persistData.revert !== _nothing) {
          console.log(`   Revert persisted ${persistData.revert}`);
          state.addPersistedAction(persistData.revert);
        }
        return false;
      }
    }
    return true;
  }

  // A persisted action can't use the same slots as another action.
  function actionsUseSameSlots(sexAction, persistedAction) {
    const actionUses = sexAction.getUses();
    const persistedUses = persistedAction.getSexAction().getUses();

    for (let i=0; i<actionUses.player.length; i++) {
      if (persistedUses.player.includes(actionUses.player[i])) { return true; }}
    for (let i=0; i<actionUses.partner.length; i++) {
      if (persistedUses.partner.includes(actionUses.partner[i])) { return true; }}

    return false;
  }

  function persistAction(sexAction, consentResult) {
    const persistData = sexAction.getPersist();
    if (persistData == null) { return false; }

    let persistCode = persistData.action;
    if (persistData.revert && persistData.when) {
      if (consentResult.getConsent() <= persistData.when) {
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

  return Object.freeze({
    getState: () => { return state; },
    startTraining,
    endTraining,
    handleSensationResult,
    updateArousal,
    updateStamina,
    checkPersistedActions,
    persistAction,
    removePersistedAction,
  });

})();
