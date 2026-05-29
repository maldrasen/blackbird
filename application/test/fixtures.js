global.Fixtures = (function() {

  function setupBattle() {
    BattleFixtures.prepareForBattle();
    BattleController.startBattle({
      afterBattle: 'returnTo.mainMenu',
      encounter: 'kobold-4',
    });

    StateMachine.setMode(GameMode.battle);
    StateMachine.render();
  }

  // The fixture calls the dungeon controller directly to setup a new dungeon. This should actually all be called in
  // the StateMachine when the DungeonSystem sees the command that puts the game into the dungeon mode.
  function setupDungeon() {
    DungeonController.createDungeon();
    StateMachine.setMode(GameMode.dungeon);
    StateMachine.render();
  }

  function setupFeature() {
    FeatureViewer.show()
  }

  // The training fixture actually puts the game into the location mode, with characters available to be trained.
  function setupTraining() {
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(10, { triggers:[] });
    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  return Object.freeze({
    setupBattle,
    setupDungeon,
    setupFeature,
    setupTraining,
  });

})();
