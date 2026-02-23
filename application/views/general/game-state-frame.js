global.GameStateFrame = (function() {

  function init() {
    X.onClick('#gameStateFrame .click-player', playerClicked);
    X.onClick('#gameStateFrame .click-location', locationClicked);
  }

  function show() {
    X.removeClass('#gameStateFrame','hide');
    update();
  }

  function hide() {
    X.addClass('#gameStateFrame','hide');
  }

  function clear() {
    X.empty('#gameStateFrame .name');
    X.empty('#gameStateFrame .status');
    X.empty('#gameStateFrame .health');
    X.empty('#gameStateFrame .stamina');
    X.empty('#gameStateFrame .mana');
    X.empty('#gameStateFrame .arousal');
    X.empty('#gameStateFrame .location');
    X.empty('#gameStateFrame .time');
  }

  function update() {
    clear();

    const player = GameState.getPlayer();

    X.fill('#gameStateFrame .name',     getPlayerLink(player));
    X.fill('#gameStateFrame .status',   getStatusIcons(player));
    X.fill('#gameStateFrame .health',   getHealthBar(player));
    X.fill('#gameStateFrame .stamina',  getStaminaBar(player));
    X.fill('#gameStateFrame .mana',     getManaBar(player));
    X.fill('#gameStateFrame .arousal',  getArousalBar(player));
    X.fill('#gameStateFrame .location', getLocationLink())
    X.fill('#gameStateFrame .time',     getTime())
  }

  function getPlayerLink(player) {
    const actor = ActorComponent.lookup(player);
    return X.createElement(`<a class='click-player' href='#'>${actor.name}</a>`);
  }

  // TODO: Status effects and their icons.
  function getStatusIcons(player) {
    return ``;
  }

  function getHealthBar(player) {
    const health = HealthComponent.lookup(player);
    return BarDisplay({
      label: 'Health',
      currentValue: health.currentHealth,
      minValue: 0,
      maxValue: health.maxHealth,
      color: 'health',
    }).getElement();
  }

  function getStaminaBar(player) {
    const current = Math.round(HealthComponent.lookup(player).currentStamina);
    const max = Math.round(AttributesComponent.createWrapper({ id:player }).getMaxStamina());
    return BarDisplay({
      label: 'Stamina',
      currentValue: current,
      minValue: 0,
      maxValue: max,
      color: 'stamina',
    }).getElement();
  }

  function getManaBar(player) {
    return BarDisplay({
      label: 'Mana',
      currentValue: 0,
      minValue: 0,
      maxValue: 0,
      color: 'mana',
    }).getElement();
  }

  function getArousalBar(player) {
    return BarDisplay({
      label: 'Arousal',
      currentValue: ArousalComponent.lookup(player).arousal,
      minValue: 0,
      maxValue: 100,
      color: 'arousal',
    }).getElement();
  }

  // TODO: The raw game time is the number of minutes since some date in the
  //       past. We'll need to first determine the game start time and have all
  //       the date math and format functions to do this. Clicking on the time
  //       could also give you a 'wait around' action if that's needed.
  function getTime() {
    return `(time:${GameState.getGameTime()})`
  }

  function getLocationLink() {
    const location = GameState.getCurrentLocation();
    const name = Location.lookup(location).getName()
    return X.createElement(`<a class='click-location' href='#'>${name}</a>`);
  }

  function playerClicked() {
    CharacterOverlay.open({ id:GameState.getPlayer(), isPlayer:true });
  }

  function locationClicked() {
    console.log("TODO: Show like a map or something I guess.")
  }

  return Object.freeze({
    init,
    show,
    hide,
    update,
  })

})();