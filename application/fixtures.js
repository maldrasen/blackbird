global.Fixtures = (function() {

  // This will probably end up being a temporary class. I just need something to do enough setup to put the game into
  // training mode.

  function setupTraining() {
    console.log("=== Setup Fixture ===");

    CharacterFactory.build({ gender:'female' });
    CharacterFactory.build({ gender:'female' });
    CharacterFactory.build({ gender:'female' });

    StateMachine.setMode(GameMode.location);
    StateMachine.render();
  }

  return {
    setupTraining
  }

})();