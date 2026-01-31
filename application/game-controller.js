global.GameController = (function() {

  async function startNewGame() {
    GameState.initialize();
  }

  async function loadLastGame() {
    console.log("TODO: Load Last Game");
  }

  async function openGame() {
    console.clear();
    MainContent.showCover();
    MainContent.removeStylesheet('mocha');

    Fixtures.setup()

    MainContent.hideCover({ fadeTime:2500 });
  }

  return {
    startNewGame,
    loadLastGame,
    openGame,
  };

})();
