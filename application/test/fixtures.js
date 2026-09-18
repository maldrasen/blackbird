global.Fixtures = (function() {

  function setupGame(options={}) {
    const state = GameSystem.getState();
    state.setGameTime(options.time || (15*60));
    state.setCurrentLocation(options.location || 'ruined-living-room');
  }

  function setupBattle() {
    setupGame({ location:'the-well' });
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      monster: 'crawling-claw',
      // monster: 'kobold-tosser',
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
    const player = GameSystem.getState().getPlayer();
    const inventory = InventoryManager(player);
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
