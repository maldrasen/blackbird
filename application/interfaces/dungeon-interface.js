global.DungeonInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.dungeon;
  }

  function refreshDescription() {
    if (viewActive()) { DungeonControls.refreshDescription(); }
  }

  return { refreshDescription };

})();
