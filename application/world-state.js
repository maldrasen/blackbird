global.WorldState = (function() {

  // The WorldState is used to save any game data that isn't associated with a single game.
  //
  // Currently, that's only a reference to the last played game, which we keep in order to continue a game.
  //
  // The WorldState will also store the game options, though there currently aren't any.
  //
  // I may include some rogue light elements in the future, things that would change or improve over successive runs.
  // I'm still in the planning stages though. If I did something like that I would need some kind of mechanic that
  // would force the current game to come to a conclusion of some sort. Still I can see the meta progression being used
  // to unlock different scenarios, different starting species, or abilities.

  const filePath = `${DATA}/World-State.json`;
  const worldStateRecorder = new StateRecorder(filePath);
  const defaultState = {
    options:{},
  }

  let $worldState;

  function getValue(key) {
    return $worldState[key];
  }

  async function setValue(key,value) {
    $worldState[key] = value;
    await saveState();
  }

  function getPreviousGame() { return getValue('previousGame'); }
  async function setPreviousGame(id) { await setValue('previousGame',id); }

  function getOptions() { return getValue('options'); }
  async function setOptions(options) { await setValue('options',options); }

  // === Save and Load =========================================================

  async function saveState() {
    localLog("Saving World State");
    await worldStateRecorder.saveState($worldState);
  }

  // If the world state doesn't exist yet, then save the default state as the world state.
  async function loadState() {
    if (fs.existsSync(filePath) === false) {
      $worldState = defaultState;
      return await saveState();
    }

    $worldState = await worldStateRecorder.loadState();
    localLog("Loaded World State");
  }

  function localLog(message) {
    log(message, { system:"WorldState", level:1 });
  }

  return Object.freeze({
    getValue,
    setValue,

    getPreviousGame,
    setPreviousGame,

    saveState,
    loadState,
  });

})();
