global.Fixtures = (function() {

  function setupTraining() {
    console.log("=== Setup Fixture ===");

    const player = CharacterFactory.buildPlayer();
    const characters = []

    characters.push(CharacterFactory.build({}));
    characters.push(CharacterFactory.build({}));
    characters.push(CharacterFactory.build({}));
    characters.forEach(id => {
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.createSituatedComponent(id,{ currentLocation:'filthy-hovel' });
      Registry.createFeelingsComponent(id,{ target:player, affection:-200, respect:0, fear:200 });
    });

    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  return {
    setupTraining
  }

})();
