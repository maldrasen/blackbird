global.Fixtures = (function() {

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
    buildRandomCharacters(buildRandomPlayer(), 30, { species:'sylph',triggers:[] })

    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  // When we build a player object, we set the player entity id in the GameState. This function could take character
  // options if I wanted to test a specific player type.
  function buildRandomPlayer() {
    const player = CharacterFactory.buildPlayer();
    GameState.setPlayer(player);
    return player;
  }

  // Creating random characters needs a player to exist in order to create their feelings. This fixture is still using
  // placeholder values for the control and feelings components. Should figure out what the default values there are.
  function buildRandomCharacters(player, count, options={}) {
    const characters = []

    for (let i=0; i<count; i++) {
      characters.push(CharacterFactory.build(options));
    }

    characters.forEach(id => {
      ControlledComponent.create(id,{ control:0 });
      SituatedComponent.create(id,{ currentLocation:GameState.getCurrentLocation() });
      ArousalComponent.update(id,{ arousal:Random.between(0,25) });
      FeelingsComponent.create(id,{ target:player,
        affection: Random.between(100,400),
        respect: Random.between(100,400),
        fear: Random.between(0,200)
      });
    });

    return characters;
  }

  return Object.freeze({
    setupDungeon,
    setupFeature,
    setupTraining,
  });

})();
