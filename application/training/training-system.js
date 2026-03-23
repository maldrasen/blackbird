global.TrainingSystem = (function() {

  function run(command) {
    switch (command.getType()) {
      case CommandType.trainingPropose: return proposeTraining(command);
      case CommandType.trainingStart: return startTraining(command);
      case CommandType.trainingSexAction: return handleSexAction(command);
      case CommandType.trainingEnd: return endTraining(command);
    }
  }

  // We mark the previous game mode when training is first proposed. We return to the previous mode when the training
  // is either denied by the partner or once the level up mode has concluded.
  function proposeTraining(command) {
    const characterId = command.getValue('characterId');
    const player = GameState.getPlayer();

    EpisodeController.startEpisode('propose-training', { P:player, T:characterId });

    StateMachine.markPreviousMode();
    StateMachine.setMode(GameMode.episode);
  }

  function startTraining(command) {
    const characterId = command.getValue('characterId');

    // Theoretically, the 'player' in the training system could be another
    // character entirely, in case we do some kind of 'possession' mechanic.
    TrainingController.startTraining({
      player: GameState.getPlayer(),
      partner: characterId
    });

    StateMachine.setMode(GameMode.training);
  }

  function handleSexAction(command) {
    const code = command.getValue('code');
    const sexAction = SexAction.lookup(code);

    // Before executing this action we need to check the existing persisted
    // actions, removing the actions that might interfere with the new action
    // or should be removed for other reasons.
    TrainingController.checkPersistedActions(sexAction);

    // We then check the sex position and change it if the next action requires
    // it. Changing position might also remove some or all persisted actions.
    PositionController.checkPosition(sexAction);

    const result = SensationResult.build(code, TrainingController.getState());

    Console.log(`Executing SexAction`,{ system:'TrainingSystem', data:{
      partner: result.getPartnerSensations(),
      player: result.getPlayerSensations(),
    }});

    StateMachine.setDeltaTime(sexAction.getTime());

    TrainingController.handleSensationResult(result);
    TrainingController.persistAction(sexAction, result.getConsentResult());

    TrainingView.update();
    TrainingOutput.show(result);
  }

  function endTraining(command) {
    const state = TrainingController.getState();

    EnlightenController.startEnlightenment({
      partner: state.getPartner(),
      anima: state.getAnima(),
      animus: state.getAnimus(),
      anger: state.getEssenceOfAnger(),
    });
    StateMachine.setMode(GameMode.enlighten);
  }

  return Object.freeze({ run });

})();
