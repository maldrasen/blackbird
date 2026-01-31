global.Fixtures = (function() {

  // This will probably end up being a temporary class. I just need something to do enough setup to put the game into
  // training mode.

  function setup() {
    console.log("=== Setup Fixture ===");

    const characterId = CharacterBuilder.build({ gender:'female' });
    const character = Character(characterId);

    console.log(character.toString());
  }

  return {
    setup
  }

})();