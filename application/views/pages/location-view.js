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

  function characterClicked(event) {
    const id = event.target.getAttribute('data-id');
    console.log(`Select:${id}`)
  }

  function buildCharacterList(characters) {
    const characterList = X.first('#characterList');

    characters.forEach(c => {
      characterList.appendChild(X.createElement(
        `<li><a data-id='${c.id}'>${c.getFirstName()} ${c.getLastName()}</a>(${c.getGender()} ${c.getSpecies()})</li>`
      ));
    });
  }

  return Object.freeze({
    show
  });

})();
