global.GameStateFrame = (function() {

  function init() {
    X.onClick('#gameStateFrame .click-player', playerClicked);
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

    const player = GameSystem.getState().getPlayer();

    X.fill('#gameStateFrame .name',     getPlayerLink(player));
    X.fill('#gameStateFrame .status',   getStatusIcons(player));
    X.fill('#gameStateFrame .health',   getHealthBar(player));
    X.fill('#gameStateFrame .stamina',  getStaminaBar(player));
    X.fill('#gameStateFrame .mana',     getManaBar(player));
    X.fill('#gameStateFrame .arousal',  getArousalBar(player));
    X.fill('#gameStateFrame .location', getLocationName());
    X.fill('#gameStateFrame .time',     getTime());
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
    const max = Math.round(Attributes(player).getMaxStamina());
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

  function getTime() {
    return TimeHelper.getTimeOfDay(GameSystem.getState().getGameTime());
  }

  function getLocationName() {
    return Location.lookup(GameSystem.getState().getCurrentLocation()).getName();
  }

  function playerClicked() {
    CharacterOverlay.open(GameSystem.getState().getPlayer());
  }

  return Object.freeze({
    init,
    show,
    hide,
    update,
  })

})();