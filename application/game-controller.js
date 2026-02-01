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

    // TODO: We just temporarily force the game into a mode while developing the game's systems. I might work on a way
    //       to make fixtures a more permanent feature. Perhaps a fixture can be started from the console while on the
    //       main menu.
    Fixtures.setupTraining()

    MainContent.hideCover({ fadeTime:2500 });
  }

  return {
    startNewGame,
    loadLastGame,
    openGame,
  };

})();
