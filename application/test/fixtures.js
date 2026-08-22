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
      // encounter: 'battle-fixture-1',
      // encounter: `negotiation-fixture-${Random.between(1,3)}`,
      encounter: `negotiation-fixture-2`,
      // encounter: 'test',
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
    BaseWeapon.getAllCodes().forEach(code => {
      inventory.addItem(WeaponFactory.build(code));
    });

    GameSystem.setGameMode(GameMode.location);
  }

  return {
    setupBattle,
    setupDungeon,
    setupTraining,
  };

})();
