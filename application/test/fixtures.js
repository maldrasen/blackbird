global.Fixtures = (function() {

  function setupGame(options={}) {
    const state = GameSystem.getState();
    state.setGameTime(options.time || (15*60));
    state.setCurrentLocation(options.location || 'ruined-living-room');
  }

  function setupBattle() {
    setupGame();
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({
      afterBattle: 'returnTo.mainMenu',
      encounter: 'kobold-1'

      // encounter: `kobold-${Random.between(1,5)}`,
      // encounter: 'negotiation-fixture'
    });

    // So the battle has a mode to return to.
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

  // The training fixture actually puts the game into the location mode, with characters available to be trained.
  function setupTraining() {
    setupGame();
    CharacterFixtures.randomPlayer();
    CharacterFixtures.randomCharacters(30, { triggers:[] });

    // TEMP: Inventory Testing
    const player = GameSystem.getState().getPlayer();
    const inventory = InventoryManager(player);
    BaseWeapon.getAllCodes().forEach(code => {
      if (code !== 'fist') { inventory.addItem(WeaponFactory.build(code)); }
    });

    GameSystem.setGameMode(GameMode.location);
  }

  return Object.freeze({
    setupBattle,
    setupDungeon,
    setupTraining,
  });

})();
