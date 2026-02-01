global.TrainingSystem = (function() {

  function run(command) {
    if (command.getType() === CommandType.startTraining) { startTraining(command); }
  }

  function startTraining(command) {
    const characterId = command.getValue('characterId');
    console.log("Start Training on ",characterId);

    TrainingView.show({
      characterId,
    });

    StateMachine.setMode(GameMode.training);
  }

  return Object.freeze({
    run
  });

})();
