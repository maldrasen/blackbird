global.GameState = (function() {

  let $gameTime;
  let $gameMode;
  let $returnMode;
  let $currentLocation;
  let $currentFloor;
  let $player;
  let $partyConfiguration;
  let $legacyName;

  // Reset is used to remove the loaded game from the state and leave it blank. This is done when the application is
  // started or when we quit a game and go back to the main menu.
  function reset() {
    Registry.clear();

    $gameTime = null;
    $gameMode = null;
    $returnMode = null;
    $currentLocation = null;
    $currentFloor = null;
    $player = null;
    $partyConfiguration = null;
    $legacyName = null;
  }

  // Start a new game. This could take an argument for a specific scenario to play.

  // TODO: We'll eventually want to map the game time onto an actual data, and we'll want to start the scenario on a
  //       specific date and time.

  // TODO: We should start the game sometime on day 8888. We will store the time as minutes from epoch (day 1), but
  //       will need functions to pull the day and time from that single number.

  // TODO: Also assuming we'll start the game in the so called filthy hovel. That'll probable change as I actually
  //       write the game story.

  function initialize(options) {
    reset();

    $gameTime = options.time || 0;
    $gameMode = GameMode.location;
    $currentLocation = options.location || 'filthy-hovel';
  }

  // ===============
  //    Game Time
  // ===============

  // TODO: Eventually we will need to check to see if there are any periodic or scheduled tasks that need to be run.
  // TODO: We might also want to do things like recover stamina, hit points, and mana in this function as well.

  function getGameTime() { return $gameTime; }
  function advanceGameTime(time) { $gameTime += time; }

  // ===============
  //    Game Mode
  // ===============

  function getGameMode() { return $gameMode; }
  function setGameMode(mode) {
    $gameMode = mode;
    if (HEADLESS === false) {
      switch(mode) {
        case GameMode.battle: return BattleView.show();
        case GameMode.dungeon: return DungeonView.show();
        case GameMode.enlighten: return EnlightenView.show();
        case GameMode.episode: return EpisodeView.show();
        case GameMode.location: return LocationView.show();
        case GameMode.training: return TrainingView.show();
      }
    }
  }

  // Return mode is not persisted as it should be impossible to save
  // from episodes, or other modes that can be returned from.
  function getReturnMode() { return $returnMode; }
  function markReturnMode() { $returnMode = $gameMode; }
  function returnToPreviousMode() {
    setGameMode($returnMode);
    $returnMode = null;
  }

  // ==========
  //    Crud
  // ==========

  function getCurrentLocation() { return $currentLocation; }
  function setCurrentLocation(location) { $currentLocation = location }

  function getPlayer() { return $player; }
  function setPlayer(player) { $player = player; }

  function getPartyConfiguration() { return $partyConfiguration; }
  function setPartyConfiguration(config) { $partyConfiguration = config; }

  function getLegacyName() { return $legacyName; }
  function setLegacyName(name) { $legacyName = name; }

  // ===================
  //    Save and Load
  // ===================

  function pack() {
    return {
      gameTime: $gameTime,
      gameMode: $gameMode,
      currentLocation: $currentLocation,
      currentFloor: $currentFloor,
      player: $player,
      partyConfiguration: $partyConfiguration,
      legacyName: $legacyName,
    }
  }

  // TODO: Need to verify that it's actually sane to set the mode directly like this when we load a game. I think the
  //       mode should only be location or dungeon. If the game is in autosave mode we should save the game when the
  //       dungeon floor is changed. When the game is loaded from the dungeon the game should load the dungeon view and
  //       build that dungeon level. Otherwise, I think we only allow saving in locations. Never during events or
  //       training though.
  function unpack(data) {
    $gameTime = data.gameTime;
    $gameMode = data.gameMode;
    $currentLocation = data.currentLocation;
    $currentFloor = data.currentFloor;
    $player = data.player;
    $partyConfiguration = data.partyConfiguration;
    $legacyName = data.legacyName;
  }

  return Object.freeze({
    reset,
    initialize,

    getGameTime,
    advanceGameTime,

    getGameMode,
    setGameMode,
    getReturnMode,
    markReturnMode,
    returnToPreviousMode,

    getCurrentLocation,
    setCurrentLocation,
    getPlayer,
    setPlayer,
    getPartyConfiguration,
    setPartyConfiguration,
    getLegacyName,
    setLegacyName,

    pack,
    unpack,
  });

})();
