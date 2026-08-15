global.LocationInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.location;
  }

  function update() {
    if (viewActive()) { LocationView.update(); }
  }

  return { update };

})();
