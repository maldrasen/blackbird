global.Fixtures = (function() {

  function setupGame(options={}) {
    const state = GameSystem.getState();
    state.setGameTime(options.time || (15*60));
    state.setCurrentLocation(options.location || 'ruined-living-room');
  }

  function setupBattle() {
    setupGame({ location:'the-well' });

    BattleFixtures.prepareForBattle();
    BattleFixtures.grantMana('red',100);

    NegotiationQuestion.setWhitelist([]);
    NegotiationRequest.setWhitelist(['have-anything-unusual']);

    Inventory().addArticle('rhysh-apple',10);
    Inventory().addArticle('string-of-teeth',4);
    Inventory().addArticle('rattlebones',2);
    Inventory().addArticle('grim-totem',3);
    Inventory().addArticle('impressive-ball-bag',2);

    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      // monster: 'crawling-claw',
      monster: 'kobold-dick-puncher',
      // encounter: 'orchard-kobolds',
    });

    GameSystem.setGameMode(GameMode.location);
    GameSystem.markReturnMode();
    GameSystem.setGameMode(GameMode.battle);
  }

  function setupDungeon() {
    setupGame({ location:'the-well' });
    BattleFixtures.prepareForBattle();
    DungeonSystem.createDungeon();
    DungeonSystem.setLevel(1,'up','dungeon');
    GameSystem.setGameMode(GameMode.dungeon);
  }

  function setupTraining() {
    setupGame();
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(10, { triggers:[] });

    // TEMP: Inventory Testing
    const inventory = Inventory();
    const factory = EquipmentFactory();
    BaseEquipment.getAllCodes().filter(code => BaseEquipment.lookup(code).isWeapon()).forEach(code => {
      inventory.addItem(factory.build(code));
    });

    GameSystem.setGameMode(GameMode.location);
  }

  return {
    setupBattle,
    setupDungeon,
    setupTraining,
  };

})();
