global.GameSystem = (function() {

  const saveDirectory = `${DATA}/Saves`;
  const saveVersion = 1;

  let state = GameState();
  let loaded = false;
  let returnMode;

  function getState() { return state; }
  function isLoaded() { return loaded; }

  // A game can only be saved when we're in the location view. So as not to couple this to the view, we check to see if
  // any of the system states are present. These states are never persisted, so if they exist that indicates that we're
  // in a non-savable state.
  function canSave() {
    if (BattleSystem.getState()) { return false; }
    if (DungeonSystem.getDungeonFloor()) { return false; }
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
      saveVersion: saveVersion,
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
    openGame();

    if (typeof setup === "function") { return setup(); }

    EpisodeSystem.startEpisode(getGameStartEpisode(), {});
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

  // TODO: Eventually, if the save version doesn't match, we'll want to run it through a migration rather than throwing
  //       an error. No need to worry about that until there's some sort of distributed beta version.
  async function loadGame(key) {
    const saveData = await FileHelper.readJSON(`${saveDirectory}/${key}.json`);

    if (saveData.saveVersion !== saveVersion) {
      throw new Error(`Incompatible save version: ${saveData.saveVersion} (expected ${saveVersion})`);
    }

    Registry.unpack(saveData.registry);
    state = GameState(saveData.state);
    loaded = true;

    openGame();
    setGameMode(state.getGameMode());
  }

  function openGame() {
    GameInterface.openGame();
  }

  function endGame() {
    reset();
    GameInterface.endGame();
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
    GameInterface.showGameMode(mode);
  }

  function getReturnMode() { return returnMode; }
  function markReturnMode() { returnMode = state.getGameMode(); }
  function returnToPreviousMode() {
    setGameMode(returnMode);
    returnMode = null;
  }

  return {
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
  };

})();
