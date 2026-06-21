global.Fixtures = (function() {

  function setupBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      encounter: `kobold-5`,
      // encounter: `kobold-${Random.between(1,5)}`,
    });

    GameState.setGameMode(GameMode.battle);
  }

  function setupDungeon() {
    DungeonSystem.createDungeon();
    GameState.setGameMode(GameMode.dungeon);
  }

  function setupFeature() {
    FeatureViewer.show()
  }

  // The training fixture actually puts the game into the location mode, with characters available to be trained.
  function setupTraining() {
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(10, { triggers:[] });
    GameState.setGameMode(GameMode.location);
  }

  return Object.freeze({
    setupBattle,
    setupDungeon,
    setupFeature,
    setupTraining,
  });

})();
