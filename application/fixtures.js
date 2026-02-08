global.Fixtures = (function() {

  function setupTraining() {
    console.log("=== Setup Fixture ===");

    const player = CharacterFactory.buildPlayer();
    const characters = []

    for (let i=0; i<20; i++) {
      characters.push(CharacterFactory.build({ triggers:['slut'] }));
    }

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
