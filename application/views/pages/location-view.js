global.LocationView = (function() {

  function show() {
    const location = Location.lookup(GameState.getCurrentLocation());
    const characters = CharacterMovementSystem.getCharactersAtLocation(location.getCode());

    MainContent.setMainContent("views/location.html");
    MainContent.setBackground(location.getBackground());

    X.first('#locationName').innerText = location.getName();
    X.onClick('#characterList a', characterClicked);

    buildCharacterList(characters);
  }

  // TODO: Right now clicking on a character will just start the training mode with that character. Once I have more
  //       of the game's systems done clicking a character here should either start some kind of character interaction
  //       view or character inspection view. From there you can talk to them or see their character sheet and start
  //       the training mode. You should be able to ask a character to follow you, or capture them, if you want to take
  //       them to a bedroom. Some actions might only be available if the room matches, need to consider if the room
  //       has a bed or a shower or a pillory.
  function characterClicked(event) {
    StateMachine.handleCommand(CommandType.startTraining, { characterId:event.target.getAttribute('data-id') });
  }

  function buildCharacterList(characters) {
    const characterList = X.first('#characterList');

    characters.forEach(id => {
      characterList.appendChild(buildCharacterItem(id));
    });
  }

  function buildCharacterItem(id) {
    const actor = Registry.lookupActorComponent(id)

    return X.createElement(`<li>
      <a data-id='${id}'>${actor.firstName} ${actor.lastName}</a>
      (${actor.gender} ${actor.species})</li>`);
  }

  return Object.freeze({
    show
  });

})();
