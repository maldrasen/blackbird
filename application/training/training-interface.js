global.TrainingInterface = (function() {

  // We mark the previous game mode when training is first proposed. We return to the previous mode when the training
  // is either denied by the partner or once the level up mode has concluded.
  function proposeTraining(characterId) {
    if (Tests.running()) { return; }
    EpisodeSystem.startEpisode('propose-training', { P:GameState.getPlayer(), T:characterId });
    GameState.markReturnMode();
    GameState.setGameMode(GameMode.episode);
  }

  function startTraining() {
    if (Tests.running()) { return; }
    GameState.setGameMode(GameMode.training);
  }

  function endTraining(state) {
    if (Tests.running()) { return; }

    EnlightenSystem.startEnlightenment('training',{
      partner: state.getPartner(),
      anima: state.getAnima(),
      animus: state.getAnimus(),
      anger: state.getEssenceOfAnger(),
    });

    GameState.setGameMode(GameMode.enlighten);
  }

  function finishSexAction(result) {
    if (Tests.running()) { return; }
    TrainingView.update();
    TrainingOutput.show(result);
  }

  return Object.freeze({
    proposeTraining,
    startTraining,
    endTraining,
    finishSexAction,
  });

})();
