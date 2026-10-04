global.GameInterface = (function() {

  function openGame() {
    if (Environment.viewPresent()) {
      MainContent.showCover();
      MainMenu.loadGameMenu();
      GameStateFrame.load();
      MainContent.hideCover({ fadeTime:2500 });
    }
  }

  function endGame() {
    if (Environment.viewPresent()) { Views.endGame(); }
  }

  function showGameMode(mode) {
    if (Environment.viewPresent()) {
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
  }

  function showAlert(alertOptions) {
    if (Environment.viewPresent()) { Alert.show(alertOptions); }
  }

  function showSkillImprovement(id, code, level) {
    if (Environment.viewPresent()) { Alert.showSkillImprovement(id, code, level); }
  }

  return {
    openGame,
    endGame,
    showGameMode,
    showAlert,
    showSkillImprovement,
  };

})();
