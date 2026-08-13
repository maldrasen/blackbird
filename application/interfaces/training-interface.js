global.TrainingInterface = (function() {

  // We mark the previous game mode when training is first proposed. We return to the previous mode when the training
  // is either denied by the partner or once the level up mode has concluded.
  function proposeTraining(characterId) {
    if (Environment.viewPresent() === false) { return; }
    EpisodeSystem.startEpisode('propose-training', { P:GameSystem.getState().getPlayer(), T:characterId });
    GameSystem.markReturnMode();
    GameSystem.setGameMode(GameMode.episode);
  }

  function startTraining() {
    if (Environment.viewPresent() === false) { return; }
    GameSystem.setGameMode(GameMode.training);
  }

  function endTraining(state) {
    if (Environment.viewPresent() === false) { return; }

    EnlightenSystem.startEnlightenment('training',{
      skillImprovements: state.getSkillImprovements(),
      partner: state.getPartner(),
      anima: state.getAnima(),
      animus: state.getAnimus(),
      anger: state.getEssenceOfAnger(),
    });

    GameSystem.setGameMode(GameMode.enlighten);
  }

  function finishSexAction(result) {
    if (Environment.viewPresent() === false) { return; }
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
