global.TrainingSystem = (function() {

  function run(command) {
    switch (command.getType()) {
      case CommandType.trainingPropose: return proposeTraining(command);
      case CommandType.trainingStart: return startTraining(command);
      case CommandType.trainingSexAction: return handleSexAction(command);
      case CommandType.trainingEnd: return endTraining(command);
    }
  }

  function proposeTraining(command) {
    const characterId = command.getValue('characterId');
    const player = GameState.getPlayer();

    EpisodeController.startEpisode('propose-training', { P:player, T:characterId });

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
    const result = SensationResult(code,TrainingController.getContext());
    const sexAction = SexAction.lookup(result.getSexAction());

    result.applyFactors();

    Console.log(`Executing SexAction`,{ system:'TrainingSystem', data:{
      partner: result.getPartnerSensations(),
      player: result.getPlayerSensations(),
    }});

    StateMachine.setDeltaTime(sexAction.getTime());

    TrainingController.handleSensationResult(result);
  }

  function endTraining() {

  }

  return Object.freeze({
    run
  });

})();
