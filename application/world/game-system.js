global.GameSystem = (function() {

  const saveDirectory = `${DATA}/Saves`;

  let state = GameState();
  let loaded = false;
  let returnMode;

  function getState() { return state; }
  function isLoaded() { return loaded; }

  // A game can only be saved when we're in the location view. So as not to couple this to the view though we check to
  // see if any of the system states are present. These states are never persisted, so if they exist that indicates
  // that we're in a non-savable state.
  function canSave() {
    if (BattleSystem.getState()) { return false; }
    if (DungeonSystem.getDungeonState()) { return false; }
    if (EpisodeSystem.getState()) { return false; }
    return true;
  }

  async function saveGame() {
    if (canSave() === false) { throw new Error(`Cannot save the game in its current state.`); }
    if (HEADLESS) { return; }

    WorldState.updateSaveMetadata();

    if (fs.existsSync(saveDirectory) === false) { fs.mkdirSync(saveDirectory); }

    await FileHelper.writeJSON(`${saveDirectory}/${state.getSaveKey()}.json`, {
      version: Environment.version,
      state: state.pack(),
      registry: Registry.pack(),
    });
  }

  // ===================
  //    Game Lifecycle
  // ===================

  async function startNewGame(setup=null) {
    Registry.clear();
    state = GameState();
    loaded = true;
    EpisodeQueue.seed(getStartingEpisodes());

    if (typeof setup === "function") { return setup(); }

    EpisodeSystem.startEpisode(getGameStartEpisode(), {});
    openGame();
    setGameMode(GameMode.episode);
  }

  // TODO: Once a lineage exists this should return whatever scenario the lineage has unlocked instead of always the
  //       first one.
  function getGameStartEpisode() {
    return 'game-start-1';
  }

  // TODO: Like the start episode, the starting episode queue should eventually come from the scenario.
  function getStartingEpisodes() {
    return [];
  }

  async function loadLastGame() {
    await loadGame(WorldState.getPreviousGame());
  }

  async function loadGame(key) {
    const saveData = await FileHelper.readJSON(`${saveDirectory}/${key}.json`);

    if (saveData.version !== Environment.version) {
      throw new Error(`Incorrect game version: ${saveData.version}`)
    }

    Registry.unpack(saveData.registry);
    state = GameState(saveData.state);
    loaded = true;

    openGame();
    setGameMode(state.getGameMode());
  }

  function openGame() {
    if (HEADLESS === false) {
      MainContent.showCover();
      MainMenu.loadGameMenu();
      GameStateFrame.load();
      MainContent.hideCover({ fadeTime:2500 });
    }
  }

  // Ends the current game, resetting the state and returning to the main menu.
  function endGame() {
    reset();

    if (HEADLESS === false && Tests.running() === false) {
      Views.endGame();
    }
  }

  function reset() {
    Registry.clear();

    EpisodeSystem.reset();
    BattleSystem.reset();
    NegotiationSystem.reset();
    DungeonSystem.reset();

    state = GameState();
    loaded = false;
    returnMode = null;
  }

  // ===============
  //    Game Mode
  // ===============

  function setGameMode(mode) {
    state.setGameMode(mode);

    if (HEADLESS === false && Tests.running() === false) {
      GameStateFrame.hide();
      LocationView.close();
      DungeonView.close();

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
    canSave,
    saveGame,

    startNewGame,
    loadLastGame,
    loadGame,
    endGame,
    reset,

    setGameMode,
    getReturnMode,
    markReturnMode,
    returnToPreviousMode,
  });

})();
