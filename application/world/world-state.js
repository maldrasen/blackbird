global.WorldState = (function() {

  // The WorldState is used to save any game data that isn't associated with a single game. Currently, that's only a
  // reference to the last played game, which we keep in order to continue a game. The WorldState will also store the
  // game settings, though there currently aren't any.

  const filePath = `${DATA}/World-State.json`;
  const worldStateRecorder = new StateRecorder(filePath);
  const defaultState = {
    options:{
      difficulty: { damage:100, mitigation:100, resistance:0 }
    },
    savedGames: {},
  }

  let worldState;

  function getState() {
    if (worldState == null) { worldState = structuredClone(defaultState); }
    return worldState;
  }

  function reset() {
    worldState = undefined;
  }

  function getValue(key) {
    return getState()[key];
  }

  async function setValue(key,value) {
    getState()[key] = value;
    await saveState();
  }

  function getPreviousGame() { return getValue('previousGame'); }
  async function setPreviousGame(id) { await setValue('previousGame',id); }

  function getOptions() { return getValue('options'); }
  async function setOptions(options) { await setValue('options',options); }


  // === Save and Load =========================================================

  function updateSaveMetadata() {
    const state = GameSystem.getState();
    worldState.savedGames[state.getSaveKey()] = state.getSaveMetadata();
    saveState();
  }

  async function saveState() {
    if (HEADLESS) { return; }
    localLog("Saving World State");
    await worldStateRecorder.saveState(worldState);
  }

  // If the world state doesn't exist yet, then save the default state as the world state.
  async function loadState() {
    if (fs.existsSync(filePath) === false) {
      worldState = structuredClone(defaultState);
      return await saveState();
    }

    worldState = mergeDefaults(await worldStateRecorder.loadState());
    localLog("Loaded World State");
  }

  // A world state file written before an option existed won't contain it, so anything missing from the loaded state
  // is filled in from the defaults.
  function mergeDefaults(loaded) {
    return ObjectHelper.merge(structuredClone(defaultState), loaded || {});
  }

  function localLog(message) {
    Console.log(message, { system:"WorldState", level:1 });
  }

  return Object.freeze({
    reset,
    mergeDefaults,

    getValue,
    setValue,
    getPreviousGame,
    setPreviousGame,
    getOptions,
    setOptions,

    updateSaveMetadata,
    saveState,
    loadState,
  });

})();
