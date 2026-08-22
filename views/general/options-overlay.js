global.OptionsOverlay = (function() {

  const difficulty = {
    damage:     { min:30, max:1000, step:10, input:'#damageInput' },
    mitigation: { min:30, max:1000, step:10, input:'#mitigationInput' },
    resistance: { min:0,  max:100,  step:1,  input:'#resistanceInput' },
  }

  const sliders = {};

  let isDirty = false;

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
    X.loadDocument('#optionsOverlay','views/templates/options-overlay.html');

    const options = WorldState.getOptions();

    Object.keys(difficulty).forEach(key => {
      sliders[key] = Slider({
        value: options.difficulty[key],
        min: difficulty[key].min,
        max: difficulty[key].max,
        step: difficulty[key].step,
        inputSelector: difficulty[key].input,
        onChange: markDirty,
      });
      X.first(`#${key}Slider`).appendChild(sliders[key].getElement());
    });

    KeyBindingsPanel.build(X.first('#keyBindings .key-bindings-area'), KeyBindings.getBindings(), { onChange:markDirty });
  }

  // The overlay is rebuilt from the saved options every time it opens, so closing without saving discards any edits.
  function open() {
    build();
    isDirty = false;
    MainMenu.hide();
    X.removeClass('#optionsOverlay','hide');
    WindowManager.push(OptionsOverlay);
  }

  function close() {
    KeyBindingsPanel.cancelCapture();
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

  // Only what's shown here is packed, so the rest of the options are carried over untouched.
  function pack() {
    return {
      ...WorldState.getOptions(),
      difficulty: {
        damage: sliders.damage.getValue(),
        mitigation: sliders.mitigation.getValue(),
        resistance: sliders.resistance.getValue(),
      },
      keyBindings: KeyBindingsPanel.getBindings(),
    };
  }

  return {
    init,
    build,
    open,
    close,
  };

})();
