global.GameController = (function() {

  // TODO: None of these functions are actually async at all, at least they're
  //       not yet. Consider making them normal once we're starting real games.
  //       (load will always be async because it needs to load a file)

  async function startNewGame(options={}) {
    GameState.initialize(options);
  }

  async function loadLastGame() {
    console.log("TODO: Load Last Game");
  }

  async function openGame(setup) {
    console.clear();
    MainContent.showCover();
    MainContent.removeStylesheet('mocha');

    if (typeof setup === 'function') {
      setup();
    }

    MainContent.hideCover({ fadeTime:2500 });
  }

  return {
    startNewGame,
    loadLastGame,
    openGame,
  };

})();
