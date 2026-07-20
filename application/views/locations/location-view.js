global.LocationView = (function() {

  // Bound once. X.onClick attaches a delegated listener to the window, so binding these in show() would stack up a new
  // listener every time the player moves.
  function init() {
    NavigationOverlay.init();

    X.onClick('#locationControls .open-map', NavigationOverlay.open);
    X.onClick('#locationView #characterList a', characterClicked);
    X.onClick('#locationView #actionList a', actionClicked);
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

  function update() {
    if (HEADLESS) { return; }

    const locationCode = GameSystem.getState().getCurrentLocation();
    const location = Location.lookup(locationCode);
    const characters = CharacterMovementSystem.getCharactersAtLocation(locationCode);

    setLocationName(location.getName());
    buildCharacterList(characters);
    buildActionList(location.getActions());

    GameStateFrame.update();
    MainContent.setBackground(location.getBackground());
  }

  function showLocationControls() { X.removeClass('#locationControls','hide'); }
  function hideLocationControls() { X.addClass('#locationControls','hide'); }
  function setLocationName(name) { X.first('#locationName').innerText = name; }

  // =====================
  //    Characters List
  // =====================

  function buildCharacterList(characters) {
    const characterList = X.first('#characterList');

    X.empty(characterList);
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

  // Only roster characters can be inspected. Monster and NPC inspect panels are future tasks.
  function characterClicked(event) {
    const characterId = event.target.getAttribute('data-id');

    if (GameSystem.getState().isInRoster(characterId) === false) { return; }

    CharacterOverlay.open({ id:characterId });

    CharacterOverlay.addInteraction('Start Training', () => {
      CharacterOverlay.close();
      TrainingInterface.proposeTraining(characterId);
    });
  }

  // =================
  //    Action List
  // =================

  // TODO: We'll eventually need to look at location actions and make them a bit more robust. They'll probably need
  //       requirements at the very least. Currently, actions have a label and a code. The code is picked up by the
  //       actionClicked() handler and executed. This however puts the business logic for the buttons in the view.
  //       The view may need to perform some work when an action is clicked, so I think the first event handler is
  //       still valid, but actions should then be passed to the location system, or something else entirely. This
  //       might be fine though if the actions don't need to do anything complicated. We'll figure it out when we get
  //       to it.

  function buildActionList(actions) {
    const actionList = X.first('#actionList');

    X.empty(actionList);
    actions.forEach(action => {
      actionList.appendChild(buildActionItem(action));
    });
  }

  function buildActionItem(action) {
    return X.createElement(`<li><a href='#' class='button' data-code='${action.actionCode}'>${action.label}</a></li>`);
  }

  function actionClicked(event) {
    switch (event.target.dataset.code) {
      case 'enter-the-dungeon': return DungeonSystem.enterDungeon();
      default: throw new Error(`No handler for: ${event.target.dataset.code}`);
    }
  }

  return Object.freeze({
    init,
    show,
    close,
    update,
  });

})();
