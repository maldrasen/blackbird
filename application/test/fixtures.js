global.Fixtures = (function() {

  function setupBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      // encounter: `kobold-${Random.between(1,5)}`,
      encounter: 'negotiation-fixture'
    });

    // So the battle has a mode to return to.
    GameSystem.setGameMode(GameMode.location);
    GameSystem.markReturnMode();
    GameSystem.setGameMode(GameMode.battle);
  }

  function setupDungeon() {
    BattleFixtures.prepareForBattle();
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1);
    GameSystem.setGameMode(GameMode.dungeon);
  }

  // The training fixture actually puts the game into the location mode, with characters available to be trained.
  function setupTraining() {
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(10, { species:'lupin',gender:'futa',triggers:['~bimbo'] });
    GameSystem.setGameMode(GameMode.location);
  }

  return Object.freeze({
    setupBattle,
    setupDungeon,
    setupTraining,
  });

})();
