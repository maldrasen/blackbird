global.WorldState = (function() {

  const DefaultState = {
    gameCount: 0,
  }

  const $stateRecorder = new StateRecorder(`${DATA}/World.json`);

  let $testState = DefaultState;
  let $realState;

  function activeState() { return Tests.running() ? $testState : $realState; }
  function hasValue(key) { return activeState()[key] != null; }
  function getValue(key) { return activeState()[key]; }

  async function setValue(key,value) {
    activeState()[key] = value;
    await saveState();
  }

  // Resetting the world state removes all the game progression. This is called
  // when the specs are started in order to baseline the world state, but would
  // very rarely if ever be called in production. Maybe if the game version
  // changes, but even then we'd probably want to migrate the state rather than
  // resetting, so perhaps only if a migration fails, or an error is thrown by
  // loadState().
  async function reset() {
    if (Tests.running()) {
      $testState = { ...DefaultState };
    }
    else {
      log("Resetting World State",{ system:'WorldState', level:1, type:LogType.warning });
      $realState = { ...DefaultState };
    }

    await saveState();
  }

  async function startNewGame() {
    const count = getValue('gameCount') + 1;
    const state = activeState();

    state.gameCount = count;
    state.currentGame = { gameNumber:count };

    await saveState();
  }

  function getCurrentGame() { return getValue('currentGame'); }
  function hasCurrentGame() { return hasValue('currentGame'); }

  async function setOptions(options) { await setValue('options',options); }
  function getOptions() { return getValue('options'); }

  // === Save and Load =========================================================

  async function saveState() {
    if (Tests.running() === false) {
      localLog("Saving World State",$realState);
      await $stateRecorder.saveState($realState);
    }
  }

  async function loadState() {
    if (Tests.running()) { return await reset(); }

    try {
      const loadedState = await $stateRecorder.loadState();
      if (loadedState) {
        $realState = loadedState;
      }
    } catch(error) {
      logError("Error Loading World State", error, { system:"WorldState" });
    }

    if ($realState == null) {
      await reset();
    }

    localLog("Loaded World State",{
      chapter: $realState.chapter,
    });
  }

  function localLog(message, data) {
    log(message, { system:"WorldState", data:data });
  }

  return Object.freeze({
    reset,
    startNewGame,
    getCurrentGame,
    hasCurrentGame,
    setOptions,
    getOptions,
    saveState,
    loadState,
  });

})();
