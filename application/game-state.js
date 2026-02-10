global.GameState = (function() {

  let $gameTime;
  let $currentLocation;
  let $currentFloor;

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
  function initialize(options) {
    Registry.clear();

    $gameTime = options.time || 0;
    $currentLocation = options.location || 'filthy-hovel';
  }

  // === CRUD ==========================================================================================================

  function setCurrentLocation(location) { $currentLocation = location }
  function getCurrentLocation() { return $currentLocation; }

  // === Save and Load =================================================================================================

  function pack() {
    return {
      gameTime: $gameTime,
      gameMode: StateMachine.getMode(),
      currentLocation: $currentLocation,
      currentFloor: $currentFloor,
    }
  }

  // TODO: Need to verify that it's actually sane to set the mode directly like this when we load a game. I think the
  //       mode should only be location or dungeon. If the game is in autosave mode we should save the game when the
  //       dungeon floor is changed. When the game is loaded from the dungeon the game should load the dungeon view and
  //       build that dungeon level. Otherwise, I think we only allow saving in locations. Never during events or
  //       training though.
  function unpack(data) {
    $gameTime = data.gameTime;
    $currentLocation = data.currentLocation;
    $currentFloor = data.currentFloor;
    StateMachine.setMode(data.gameMode);
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
