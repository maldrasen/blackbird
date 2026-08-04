global.OptionsOverlay = (function() {

  const difficulty = {
    damage:     { default:100, min:30, max:1000, step:10, input:'#damageInput' },
    health:     { default:100, min:30, max:1000, step:10, input:'#healthInput' },
    resistance: { default:0,   min:0,  max:100,  step:1,  input:'#resistanceInput' },
  }

  let isDirty = false;
  let isBuilt = false;

  function init() {
    X.onClick('#optionsOverlay a.close-button', () => {
      WindowManager.pop();
    });

    X.onClick('#optionsOverlay a.save-button', () => {
      save();
      WindowManager.pop();
    });
  }

  function build() {
    X.loadDocument('#optionsOverlay','views/options-overlay.html');

    const options = WorldState.getOptions();

    X.first('#damageSlider').appendChild(Slider({
      value: options.difficulty.damage,
      min: difficulty.damage.min,
      max: difficulty.damage.max,
      step: difficulty.damage.step,
      inputSelector: difficulty.damage.input,
    }).getElement());

    X.first('#healthSlider').appendChild(Slider({
      value:options.difficulty.health,
      min: difficulty.health.min,
      max: difficulty.health.max,
      step: difficulty.health.step,
      inputSelector: difficulty.health.input,
    }).getElement());

    X.first('#resistanceSlider').appendChild(Slider({
      value:options.difficulty.resistance,
      min: difficulty.resistance.min,
      max: difficulty.resistance.max,
      step: difficulty.resistance.step,
      inputSelector: difficulty.resistance.input,
    }).getElement());

    isBuilt = true;
  }

  function open() {
    if (isBuilt === false) { OptionsOverlay.build(); }
    MainMenu.hide();
    X.removeClass('#optionsOverlay','hide');
  }

  function close() {
    TabController.setActiveByName(X.first('#optionsOverlay .tab-control'),'gameplay');
    X.addClass('#optionsOverlay','hide');
    MainMenu.show();
  }

  function save() {
    if (isDirty) {
      WorldState.setOptions(pack()).then(saveSuccessful);
    }
  }

  function saveSuccessful() {
    Alert.show({
      message: 'Options Saved',
      position: AlertPosition.side,
      type: LogType.success,
      fadeTime: 1000,
    });
  }

  // We need to validate the input before we save these values in the world state, but we should also validate when
  // any of the inputs are updated by hand. Can't be done on key press though. Maybe on loss of focus, but we need to
  // ensure that focus is lost before the window is closed, or maybe if the value is set to something invalid we set
  // the input to the default value before returning it.
  function difficultyValue(key) {
    const value = Number(X.first(difficulty[key].input).value);

    // Wait... Not a number is a number isn't it? But it's also not null. Test for raw NaN?
    if (typeof value != "number") { return difficulty[key].default; }
    if (value < difficulty[key].min) { return difficulty[key].min; }
    if (value > difficulty[key].max) { return difficulty[key].max; }
    return value;
  }

  function pack() {
    return {
      difficulty: {
        damage: difficultyValue('damage'),
        health: difficultyValue('health'),
        resistance: difficultyValue('resistance'),
      }
    };
  }

  function toString() { return `OptionsOverlay` }

  return {
    init,
    build,
    open,
    close,
    toString,
  };

})();
