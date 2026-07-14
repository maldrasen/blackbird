global.LocationView = (function() {

  // Bound once. X.onClick attaches a delegated listener to the window, so binding these in show() would stack up a new
  // listener every time the player moves.
  function init() {
    NavigationOverlay.init();

    X.onClick('#characterList a', characterClicked);
    X.onClick('#locationActions a', actionClicked);
    X.onClick('.local-map-button', NavigationOverlay.showLocalMap);
    X.onClick('.city-map-button', NavigationOverlay.showCityMap);
  }

  function show() {
    MainContent.setMainContent("views/location.html");
    GameStateFrame.show();
    showLocationControls();
    update();
  }

  function close() {
    hideLocationControls();
  }

  // Game state frame will need to update.
  function update() {
    if (HEADLESS) { return; }

    const location = Location.lookup(GameSystem.getState().getCurrentLocation());
    const characters = CharacterMovementSystem.getCharactersAtLocation(location.getCode());

    MainContent.setBackground(location.getBackground());

    console.log("Location Changed:",location)

    X.first('#locationName').innerText = location.getName();

    buildCharacterList(characters);
    buildActionList(location.getActions());
  }

  function showLocationControls() { X.removeClass('#locationControls','hide'); }
  function hideLocationControls() { X.addClass('#locationControls','hide'); }

  function characterClicked(event) {
    const characterId = event.target.getAttribute('data-id');

    CharacterOverlay.open({ id:characterId });

    CharacterOverlay.addInteraction('Start Training', () => {
      CharacterOverlay.close();
      TrainingInterface.proposeTraining(characterId);
    });
  }

  function actionClicked(event) {
    const location = Location.lookup(GameSystem.getState().getCurrentLocation());
    location.getActions()[event.target.dataset.index].onClick();
  }

  function buildCharacterList(characters) {
    const characterList = X.first('#characterList');

    characters.forEach(id => {
      characterList.appendChild(buildCharacterItem(id));
    });
  }

  function buildCharacterItem(id) {
    const actor = ActorComponent.lookup(id);
    const personality = PersonalityComponent.lookup(id);

    return X.createElement(`<li>
      <a data-id='${id}'>${actor.title||''} ${actor.name} ${actor.surname||''}</a>
      (${actor.gender} ${actor.species}) - ${personality.archetype}</li>`);
  }

  function buildActionList(actions) {
    const actionList = X.first('#locationActions');

    actions.forEach((action,index) => {
      actionList.appendChild(X.createElement(
        `<a href='#' class='button' data-index='${index}'>${action.label}</a>`));
    });
  }

  return Object.freeze({
    init,
    show,
    close,
    update,
  });

})();
