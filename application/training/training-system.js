global.TrainingSystem = (function() {

  // We mark the previous game mode when training is first proposed. We return to the previous mode when the training
  // is either denied by the partner or once the level up mode has concluded.
  function proposeTraining(characterId) {
    EpisodeSystem.startEpisode('propose-training', { P:GameState.getPlayer(), T:characterId });
    GameState.markReturnMode();
    GameState.setGameMode(GameMode.episode);
  }

  // Theoretically, the 'player' in the training system could be another  character entirely, in case we do some kind
  // of 'possession' mechanic.
  function startTraining(characterId) {
    TrainingController.startTraining({
      player: GameState.getPlayer(),
      partner: characterId
    });

    GameState.setGameMode(GameMode.training);
  }

  function handleSexAction(code) {
    const sexAction = SexAction.lookup(code);
    const state = TrainingController.getState();
          state.clearMessages();
          state.determineAttitude(sexAction);

    // Before executing this action we need to check the existing persisted
    // actions, removing the actions that might interfere with the new action
    // or should be removed for other reasons.
    TrainingController.checkPersistedActions(sexAction);

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

    TrainingController.handleSensationResult(result);
    TrainingController.persistAction(sexAction, result.getConsentResult());

    TrainingView.update();
    TrainingOutput.show(result);
  }

  function endTraining() {
    const state = TrainingController.getState();

    EnlightenController.startEnlightenment({
      partner: state.getPartner(),
      anima: state.getAnima(),
      animus: state.getAnimus(),
      anger: state.getEssenceOfAnger(),
    });
    GameState.setGameMode(GameMode.enlighten);
  }

  return Object.freeze({
    proposeTraining,
    startTraining,
    handleSexAction,
    endTraining,
  });

})();
