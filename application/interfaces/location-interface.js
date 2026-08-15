global.LocationInterface = (function() {

  // Systems update the location whenever they change something the view displays, which can happen while another view
  // owns the main content. The location view refreshes itself when it's shown again, so those updates are dropped.
  function update() {
    if (Environment.viewPresent() === false) { return; }
    if (GameSystem.getState().getGameMode() !== GameMode.location) { return; }
    LocationView.update();
  }

  return { update };

})();
