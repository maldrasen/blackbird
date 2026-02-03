global.Fixtures = (function() {

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