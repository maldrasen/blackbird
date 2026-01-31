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
    MainContent.setMainContent('views/home.html');
    MainContent.setBackground('backgrounds/wood.png')
    MainContent.hideCover({ fadeTime:2500 });

    Fixtures.setup()
  }

  return {
    startNewGame,
    loadLastGame,
    openGame,
  };

})();
