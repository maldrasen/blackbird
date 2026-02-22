global.LocationView = (function() {

  function show() {
    const location = Location.lookup(GameState.getCurrentLocation());
    const characters = CharacterMovementSystem.getCharactersAtLocation(location.getCode());

    MainContent.setMainContent("views/location.html");
    MainContent.setBackground(location.getBackground());

    X.first('#locationName').innerText = location.getName();
    X.onClick('#characterList a', characterClicked);

    buildCharacterList(characters);
    GameStateFrame.show();
  }

  function characterClicked(event) {
    const characterId = event.target.getAttribute('data-id');

    CharacterOverlay.open({ id:characterId });

    CharacterOverlay.addInteraction('Start Training', () => {
      CharacterOverlay.close();
      StateMachine.handleCommand(CommandType.startTraining, { characterId:characterId });
    });
  }

  function buildCharacterList(characters) {
    const characterList = X.first('#characterList');

    characters.forEach(id => {
      characterList.appendChild(buildCharacterItem(id));
    });
  }

  function buildCharacterItem(id) {
    const actor = ActorComponent.lookup(id)

    return X.createElement(`<li>
      <a data-id='${id}'>${actor.title||''} ${actor.name} ${actor.surname||''}</a>
      (${actor.gender} ${actor.species})</li>`);
  }

  return Object.freeze({
    show
  });

})();
