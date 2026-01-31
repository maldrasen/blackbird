global.CharacterMovementSystem = (function() {

  // TODO: As time passes characters will move around, following their schedules, or sometimes deviating from those
  //       schedules. Even if we're only implementing the 'house' version characters will move from room to room. If
  //       I end up adding a city to explore characters will roam the city as well.
  //
  // TODO: Characters who are interacting with the player shouldn't wander off though. The character the player is
  //       interacting with should be in the command. A situation like a threesome might be tricky though.
  //
  function run(command) {}

  // Find all the characters that are at the specified location. If the location is the current location, we also need
  // the characters who are following or are held captive by the player.
  function getCharactersAtLocation(code) {
    const entities = Registry.findComponentsWith(ComponentType.atLocation, data => {
      console.log(`${code} ? `,data)
      return data.location === code
    });

    return entities.map(id => Character(id));
  }

  return Object.freeze({
    run,
    getCharactersAtLocation,
  });

})();