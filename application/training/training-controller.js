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
    state.setPreviousAction(result.getSexAction());
    state.updateTrainingScales(result);
    updateStamina(result);
    updateArousal(result);

    TrainingView.update();
    TrainingOutput.show(result);
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
    const action = SexAction.lookup(result.getSexAction());
    const player = state.getPlayer();
    const partner = state.getPartner();
    const playerHealth = HealthComponent.lookup(player);
    const partnerHealth = HealthComponent.lookup(partner);

    playerHealth.currentStamina -= action.getPlayerStamina();
    partnerHealth.currentStamina -= action.getPartnerStamina();

    HealthComponent.update(player, playerHealth);
    HealthComponent.update(partner, partnerHealth);
  }

  return Object.freeze({
    getState: () => { return state; },
    startTraining,
    endTraining,
    handleSensationResult,
    updateArousal,
    updateStamina,
  });

})();
