global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', confirmStartGame);
    X.onClick('#mainMenu a.continue-button', continueGame);
    X.onClick('#mainMenu a.options-button', showOptions);
    X.onClick('#mainMenu a.quit-button', window.close);

    X.first('#mainMenu a.close-menu-button').style['background-image'] = X.assetURL('ui/x-icon.png');
  }

  function openFully() {
    open();
    MainContent.showCover();
    MainContent.setBackground('backgrounds/main-menu.jpg');
    MainContent.hideCover({ fadeTime:1000 });
  }

  // We should only use the show() and hide() functions in sub menus of the
  // main menu, like the options overlay.
  function show() { X.removeClass('#mainMenu','hide'); }
  function hide() { X.addClass('#mainMenu','hide'); }

  function open() {
    adjustMenu();
    show();

    // if (DungeonView.isVisible()) {
    //   ClockManager.forcePause();
    //   X.removeClass('#menuCover','hide');
    // }
  }

  function close() {
    hide();

    // if (DungeonView.isVisible()) {
    //   ClockManager.unforcePause();
    //   X.addClass('#menuCover','hide');
    // }
  }

  function isVisible() { return X.hasClass('#mainMenu','hide') === false; }

  function adjustMenu() {
    if (WorldState.hasCurrentGame()) {
      X.removeClass('#mainMenu a.continue-button','hide');
    }
    // if (DungeonView.isVisible()) {
    //   X.addClass('#mainMenu a.start-button','hide');
    //   X.addClass('#mainMenu a.continue-button','hide');
    // }
  }

  function confirmStartGame() {
    if (WorldState.hasCurrentGame() === false) {
      return startGame();
    }

    Confirmation.show({
      text: `Start a new game? This will overwrite your previous game.`,
      onConfirm: startGame,
    });
  }

  async function startGame() {
    close();
    // await GameController.startNewGame();
    // await DungeonView.open();
    // await GameController.openGame();
  }

  async function continueGame() {
    close();
    // await GameState.loadState();
    // await DungeonView.open();
    // await GameController.openGame();
  }

  function showOptions() {
    OptionsOverlay.open();
    WindowManager.push(OptionsOverlay)
  }

  function toString() { return `MainMenu` }

  return {
    init,
    openFully,
    show,
    hide,
    open,
    close,
    isVisible,
    toString,
  };

})();
