global.OptionsOverlay = (function() {

  let $isDirty = false;
  let $isBuilt = false;

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
    console.log("We keep building this don't we?")
    X.loadDocument('#optionsOverlay','views/options-overlay.html');
  }

  function open() {
    if ($isBuilt === false) { OptionsOverlay.build(); }

    MainMenu.hide();
    X.removeClass('#optionsOverlay','hide');
  }

  function close() {
    TabController.setActiveByName(X.first('#optionsOverlay .tab-control'),'stuff');
    X.addClass('#optionsOverlay','hide');
    MainMenu.show();
  }

  function save() {
    if ($isDirty) {
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

  // Pack all the options, but mostly keybindings for now.
  function pack() {
    let options = { ... WorldState.getOptions() };
    let listItems = X("#keyBindingList li");

    for (let i=0; i<listItems.length; i++) {
      let listItem = listItems[i];
      let code1 = listItem.querySelector('.b-1').dataset.code;
      let code2 = listItem.querySelector('.b-2').dataset.code;

      // Nulls are saved as empty strings on the data attributes, but need to
      // be saved as actual nulls.
      code1 = code1 === '' ? null : code1;
      code2 = code2 === '' ? null : code2;

      options.keyBindings[i].codes[0] = code1
      options.keyBindings[i].codes[1] = code2
    }

    return options;
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
