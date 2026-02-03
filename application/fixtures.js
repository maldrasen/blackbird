global.Fixtures = (function() {

  // This will probably end up being a temporary class. I just need something to do enough setup to put the game into
  // training mode.

  function setupTraining() {
    console.log("=== Setup Fixture ===");

    const characters = []

    characters.push(CharacterFactory.build({}));
    characters.push(CharacterFactory.build({}));
    characters.push(CharacterFactory.build({}));
    characters.forEach(id => {
      Registry.createControlledComponent(id,{ control:Random.roll(200)-100 });
      Registry.createSituatedComponent(id,{ currentLocation:'filthy-hovel' });
    });

    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  return {
    setupTraining
  }

})();