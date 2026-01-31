global.GameController = (function() {

  async function startNewGame() {
    GameState.initialize();
  }

  async function loadLastGame() {
    console.log("TODO: Load Last Game")
  }

  async function openGame() {
    MainContent.setMainContent(`views/home.html`)
  }

  return {
    startNewGame,
    loadLastGame,
    openGame,
  };

})();