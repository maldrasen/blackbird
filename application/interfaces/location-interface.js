global.LocationInterface = (function() {

  function viewPresent() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.location;
  }

  function update() {
    if (viewPresent()) { LocationView.update(); }
  }

  return { update };

})();
