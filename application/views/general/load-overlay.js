global.LoadOverlay = (function() {

  function init() {
    X.onClick('#loadOverlay a.close-button', WindowManager.pop);
    X.onClick('#loadOverlay #savedGameList a', savedGameClicked);
  }

  // The overlay is rebuilt every time it's opened because the list of saved games can change between opens.
  function open() {
    X.loadDocument('#loadOverlay','views/load-overlay.html');
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

    return X.createElement(`<li>
      <a href='#' class='button' data-key='${key}'>
        <span class='legacy-name'>${metadata.legacyName}</span>
        <span class='details'>${metadata.playerName} · ${metadata.locationName} · Day ${day}, ${time}</span>
      </a>
    </li>`);
  }

  // Loading a game skips close() because the main menu should stay hidden while the game opens.
  async function savedGameClicked(event) {
    WindowManager.remove(LoadOverlay);
    X.addClass('#loadOverlay','hide');
    await GameSystem.loadGame(event.target.closest('a[data-key]').dataset.key);
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
