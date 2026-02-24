global.TrainingSystem = (function() {

  function run(command) {
    switch (command.getType()) {
      case CommandType.trainingStart: return startTraining(command);
      case CommandType.trainingSexAction: return handleSexAction(command);
    }
  }

  function startTraining(command) {
    const characterId = command.getValue('characterId');

    // Theoretically, the 'player' in the training system could be another
    // character entirely, in case we do some kind of 'possession' mechanic.
    TrainingController.start({
      player: GameState.getPlayer(),
      partner: characterId
    });

    StateMachine.setMode(GameMode.training);
  }

  function handleSexAction(command) {
    const code = command.getValue('code');
    const result = SensationResult(code,TrainingController.getContext());

    TrainingView.update();
  }

  return Object.freeze({
    run
  });

})();
