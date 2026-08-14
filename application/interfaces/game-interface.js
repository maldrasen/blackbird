global.GameInterface = (function() {

  function openGame() {
    if (Environment.viewPresent() === false) { return; }
    MainContent.showCover();
    MainMenu.loadGameMenu();
    GameStateFrame.load();
    MainContent.hideCover({ fadeTime:2500 });
  }

  function endGame() {
    if (Environment.viewPresent() === false) { return; }
    Views.endGame();
  }

  function showGameMode(mode) {
    if (Environment.viewPresent() === false) { return; }

    GameStateFrame.hide();
    LocationView.close();
    DungeonView.close();

    switch (mode) {
      case GameMode.battle: return BattleView.show();
      case GameMode.dungeon: return DungeonView.show();
      case GameMode.enlighten: return EnlightenView.show();
      case GameMode.episode: return EpisodeView.show();
      case GameMode.location: return LocationView.show();
      case GameMode.training: return TrainingView.show();
    }
  }

  return {
    openGame,
    endGame,
    showGameMode,
  };

})();
