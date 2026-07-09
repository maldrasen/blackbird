global.GameSystem = (function() {

  let state = GameState();
  let returnMode;
  let loaded = false;

  function getState() { return state; }
  function isLoaded() { return loaded; }

  // ===================
  //    Game Lifecycle
  // ===================

  // TODO: None of these are truly async yet. loadLastGame will be once it reads a save file, and startNewGame will be
  //       once it has to consult a lineage for the unlocked starting scenario.

  async function startNewGame(options={}) {
    Registry.clear();
    state = GameState({
      gameTime: options.time || 0,
      gameMode: GameMode.location,
      currentLocation: options.location || 'filthy-hovel',
    });
    loaded = true;

    if (options.setup) { return options.setup(); }

    EpisodeSystem.startEpisode(getGameStartEpisode(), {});
    setGameMode(GameMode.episode);
  }

  // TODO: Once a lineage exists this should return whatever scenario the lineage has unlocked instead of always the
  //       first one.
  function getGameStartEpisode() {
    return 'game-start-1';
  }

  async function loadLastGame() {
    console.log("TODO: Load Last Game");
  }

  async function openGame() {
    MainContent.showCover();
    MainContent.removeStylesheet('mocha');
    MainContent.hideCover({ fadeTime:2500 });
  }

  // Clears the registry and drops back to a blank, unloaded state. Used between specs and when quitting to the menu.
  function reset() {
    Registry.clear();
    state = GameState();
    returnMode = null;
    loaded = false;
  }

  // ===============
  //    Game Mode
  // ===============

  function setGameMode(mode) {
    state.setGameMode(mode);

    if (HEADLESS === false) {
      switch (mode) {
        case GameMode.battle: return BattleView.show();
        case GameMode.dungeon: return DungeonView.show();
        case GameMode.enlighten: return EnlightenView.show();
        case GameMode.episode: return EpisodeView.show();
        case GameMode.location: return LocationView.show();
        case GameMode.training: return TrainingView.show();
      }
    }
  }

  // Return mode is transient and never persisted — it should be impossible to save from the modes it returns from
  // (episodes, training, etc.).
  function getReturnMode() { return returnMode; }
  function markReturnMode() { returnMode = state.getGameMode(); }
  function returnToPreviousMode() {
    setGameMode(returnMode);
    returnMode = null;
  }

  return Object.freeze({
    getState,
    isLoaded,

    startNewGame,
    loadLastGame,
    openGame,
    reset,

    setGameMode,
    getReturnMode,
    markReturnMode,
    returnToPreviousMode,
  });

})();
