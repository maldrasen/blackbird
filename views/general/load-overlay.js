global.LoadOverlay = (function() {

  function init() {
    X.onClick('#loadOverlay a.close-button', WindowManager.pop);
    X.onClick('#loadOverlay #savedGameList a.load-button', savedGameClicked);
    X.onClick('#loadOverlay #savedGameList a.delete-button', deleteClicked);
  }

  // The overlay is rebuilt every time it's opened because the list of saved games can change between opens.
  function open() {
    X.loadDocument('#loadOverlay','views/templates/load-overlay.html');
    buildSavedGameList();
    MainMenu.hide();
    X.removeClass('#loadOverlay','hide');
    WindowManager.push(LoadOverlay);
  }

  function buildSavedGameList() {
    const savedGames = WorldState.getSavedGames();

    const entries = Object.keys(savedGames).sort((a,b) => {
      return (savedGames[b].savedAt || 0) - (savedGames[a].savedAt || 0);
    }).map(key => buildEntry(key, savedGames[key]));

    X.fill('#savedGameList', entries);
  }

  function buildEntry(key, metadata) {
    const day = TimeHelper.getDayNumber(metadata.gameTime);
    const time = TimeHelper.getTimeOfDay(metadata.gameTime);

    return X.createElement(`<li data-key='${key}'>
      <a href='#' class='load-button button'>
        <span class='legacy-name'>${metadata.legacyName}</span>
        <span class='details'>${metadata.playerName} · ${metadata.locationName} · Day ${day}, ${time}</span>
      </a>
      <a href='#' class='delete-button button button-danger button-small'>Delete</a>
    </li>`);
  }

  function savedGameKey(event) {
    return event.target.closest('li[data-key]').dataset.key;
  }

  // Loading a game skips close() because the main menu should stay hidden while the game opens.
  async function savedGameClicked(event) {
    WindowManager.remove(LoadOverlay);
    X.addClass('#loadOverlay','hide');
    await GameSystem.loadGame(savedGameKey(event));
  }

  function deleteClicked(event) {
    const key = savedGameKey(event);
    const name = WorldState.getSavedGames()[key].legacyName;

    Confirmation.show({ text:`Delete the saved game "${name}"?`, onConfirm:() => deleteSave(key) });
  }

  // Deleting the last save leaves nothing to load, so the overlay closes itself rather than showing an empty list.
  async function deleteSave(key) {
    await GameSystem.deleteSave(key);
    MainMenu.adjustBaseMenu();

    Object.keys(WorldState.getSavedGames()).length > 0 ? buildSavedGameList() : WindowManager.pop();
  }

  function close() {
    X.addClass('#loadOverlay','hide');
    MainMenu.show();
  }

  return {
    init,
    open,
    close,
  };

})();
