global.Fixtures = (function() {

  function setupGame(options={}) {
    const state = GameSystem.getState();
    state.setGameTime(options.time || (15*60));
    state.setCurrentLocation(options.location || 'ruined-living-room');
  }

  function setupBattle() {
    setupGame({ location:'the-well' });
    randomBullshitGo();

    BattleFixtures.prepareForBattle();
    BattleFixtures.grantMana('red',100);

    // NegotiationQuestion.setWhitelist([]);
    // NegotiationRequest.setWhitelist([]);

    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      monster: 'kobold-dick-puncher',
    });

    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1,'up','dungeon');
    GameSystem.setGameMode(GameMode.dungeon);
    GameSystem.markReturnMode();
    GameSystem.setGameMode(GameMode.battle);
  }

  function setupDungeon() {
    setupGame({ location:'the-well' });
    randomBullshitGo();

    BattleFixtures.prepareForBattle();
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1,'up','dungeon');
    GameSystem.setGameMode(GameMode.dungeon);
  }

  function setupTraining() {
    setupGame();
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(10, { triggers:[] });
    GameSystem.setGameMode(GameMode.location);
  }

  function randomBullshitGo() {
    const inventory = Inventory();
    Article.getAllCodes().forEach(code => {
      if (Random.flipCoin()) { inventory.addArticle(code, Random.flipCoin() ? 1 : Random.between(2,10)); }
    });

    const depot = EquipmentDepot('standard');
    for (let i=0; i<20; i++) {
      inventory.addItem(Random.from[depot.getArmor()])
    }

  }

  return {
    setupBattle,
    setupDungeon,
    setupTraining,
  };

})();
