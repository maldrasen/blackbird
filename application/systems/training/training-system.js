global.TrainingSystem = (function() {

  function run(command) {
    if (command.getType() === CommandType.startTraining) { startTraining(command); }
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

  return Object.freeze({
    run
  });

})();
