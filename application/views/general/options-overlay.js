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
      onChange: markDirty,
    }).getElement());

    X.first('#healthSlider').appendChild(Slider({
      value:options.difficulty.health,
      min: difficulty.health.min,
      max: difficulty.health.max,
      step: difficulty.health.step,
      inputSelector: difficulty.health.input,
      onChange: markDirty,
    }).getElement());

    X.first('#resistanceSlider').appendChild(Slider({
      value:options.difficulty.resistance,
      min: difficulty.resistance.min,
      max: difficulty.resistance.max,
      step: difficulty.resistance.step,
      inputSelector: difficulty.resistance.input,
      onChange: markDirty,
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

  function markDirty() {
    isDirty = true;
  }

  function save() {
    if (isDirty === false) { return; }

    WorldState.setOptions(pack()).then(() => {
      isDirty = false;
      Alert.show({
        message: 'Options Saved',
        position: AlertPosition.side,
        type: LogType.success,
        fadeTime: 1000,
      });
    });
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

  // TODO: Is this necessary? The Slider's change handler validates, but can save every be invoked before change is fired?
  function difficultyValue(key) {
    const value = Number(X.first(difficulty[key].input).value);

    if (isNaN(value)) { return difficulty[key].default; }
    if (value < difficulty[key].min) { return difficulty[key].min; }
    if (value > difficulty[key].max) { return difficulty[key].max; }
    return value;
  }

  // TODO: Are we ever using this or the one in the MainMenu?
  function toString() { return `OptionsOverlay` }

  return {
    init,
    build,
    open,
    close,
    toString,
  };

})();
