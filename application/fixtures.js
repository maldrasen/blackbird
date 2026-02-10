global.Fixtures = (function() {

  function setupDungeon() {
    StateMachine.setMode(GameMode.dungeon);
    StateMachine.render();
  }

  function setupTraining() {
    const player = buildRandomPlayer();
    buildRandomCharacters(player, 10, { triggers:[] })

    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  // This function could take character options if I wanted to test a specific player type.
  function buildRandomPlayer() {
    return CharacterFactory.buildPlayer();
  }

  // Creating random characters needs a player to exist in order to create their feelings.
  function buildRandomCharacters(player, count, options={}) {
    const characters = []

    for (let i=0; i<10; i++) {
      characters.push(CharacterFactory.build(options));
    }

    characters.forEach(id => {
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.createSituatedComponent(id,{ currentLocation:GameState.getCurrentLocation() });
      Registry.createFeelingsComponent(id,{ target:player, affection:-200, respect:0, fear:200 });
    });

    return characters;
  }

  return Object.freeze({
    setupDungeon,
    setupTraining,
  });

})();
