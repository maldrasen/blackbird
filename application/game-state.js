global.GameState = (function() {

  let $stateRecorder;
  let $gameYear;
  let $gameDay;
  let $gameMinutes;
  let $currentLocation;

  // Reset is used to remove the loaded game from the state and leave it blank. This is done when the application is
  // started or when we quit a game and go back to the main menu.
  function reset() {
    Registry.clear();

    $stateRecorder = null;
    $gameYear = null;
    $gameDay = null;
    $gameMinutes = null;
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

    $gameYear = 1;
    $gameDay = 1;
    $gameMinutes = 0;

    $currentLocation = 'filthy-hovel';
  }

  // === CRUD ==========================================================================================================

  function setCurrentLocation(location) { $currentLocation = location }
  function getCurrentLocation() { return $currentLocation; }

  // === Save and Load =================================================================================================

  function pack() {
    return {
      gameYear: $gameYear,
      gameDay: $gameDay,
      gameMinutes: $gameMinutes,
      currentLocation: $currentLocation,
    }
  }

  function unpack(data) {
    $gameYear = data.gameYear
    $gameDay = data.gameDay
    $gameMinutes = data.gameMinutes
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
