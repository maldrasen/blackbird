global.TrainingInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.training;
  }

  function finishSexAction(result) {
    if (viewActive() === false) { return; }
    TrainingView.update();
    TrainingOutput.show(result);
  }

  function updatePersistedActions() {
    if (viewActive()) { TrainingPersistedActionsPanel.update(); }
  }

  return {
    finishSexAction,
    updatePersistedActions,
  };

})();
