global.GameState = (function() {

  let $gameTime;
  let $currentLocation;

  // Reset is used to remove the loaded game from the state and leave it blank. This is done when the application is
  // started or when we quit a game and go back to the main menu.
  function reset() {
    Registry.clear();

    $gameTime = null;
    $currentLocation = null;
  }

  // Start a new game. This could take an argument for a specific scenario to play.
  //
  // TODO: We'll eventually want to map the game time onto an actual data,
  //       and we'll want to start the scenario on a specific date and time.
  // TODO: Also assuming we'll start the game in the so called filthy hovel.
  //       That'll probable change as I actually write the game story.
  function initialize() {
    Registry.clear();

    $gameTime = 0;
    $currentLocation = 'filthy-hovel';
  }

  // === CRUD ==========================================================================================================

  function setCurrentLocation(location) { $currentLocation = location }
  function getCurrentLocation() { return $currentLocation; }

  // === Save and Load =================================================================================================

  function pack() {
    return {
      gameTime: $gameTime,
      currentLocation: $currentLocation,
    }
  }

  function unpack(data) {
    $gameTime = data.gameTime
    $currentLocation = currentLocation
  }

  return Object.freeze({
    reset,
    initialize,
    setCurrentLocation,
    getCurrentLocation,
    pack,
    unpack,
  });

})();
