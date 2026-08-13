global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu #startButton', startGame);
    X.onClick('#mainMenu #saveButton', saveGame);
    X.onClick('#mainMenu #continueButton', continueGame);
    X.onClick('#mainMenu #loadButton', LoadOverlay.open);
    X.onClick('#mainMenu #optionsButton', OptionsOverlay.open);
    X.onClick('#mainMenu #quitButton', GameSystem.endGame);
    X.onClick('#mainMenu #exitButton', window.close);
    X.onClick('#mainMenu a.start-fixture', startFixture);
  }

  function loadBaseMenu() {
    X.loadDocument('#mainMenu','views/templates/base-menu.html');

    const previousGame = WorldState.getPreviousGame();

    if (previousGame) {
      X.fill('#continueButton .game-name', WorldState.getSavedGames()[previousGame].legacyName);
      X.removeClass('#mainMenu #continueButton','disabled');
    }
    else {
      X.addClass('#mainMenu #continueButton','disabled');
    }

    Object.keys(WorldState.getSavedGames()).length > 0 ?
      X.removeClass('#mainMenu #loadButton','disabled'):
      X.addClass('#mainMenu #loadButton','disabled');

    if (Environment.isDevelopment) {
      X.removeClass('#mainMenu #separator','hide');
      X.removeClass('#mainMenu .start-fixture','hide');
    }

    MainContent.showCover();
    MainContent.setBackground('backgrounds/main-menu.jpg');
    MainContent.hideCover({ fadeTime:1000 });
  }

  function loadGameMenu() {
    X.loadDocument('#mainMenu','views/templates/game-menu.html');
  }

  // Show, Hide, and Close
  //    The show() and hide() functions are used to control the menu frame itself, whereas the open() and close()
  //    functions also control the menuCover. When the options or load overlays are opened they need to hide the menu,
  //    but they leave the menu cover visible.
  function show() { X.removeClass('#mainMenu','hide'); }
  function hide() { X.addClass('#mainMenu','hide'); }

  function close() {
    hide();
    X.addClass('#menuCover','hide');
    WindowManager.remove(MainMenu);
  }

  function open() {
    adjustGameMenu();
    show();
    X.removeClass('#menuCover','hide');
  }

  function isVisible() { return X.hasClass('#mainMenu','hide') === false; }

  function adjustGameMenu() {
    GameSystem.canSave() ?
      X.removeClass('#mainMenu #saveButton','disabled'):
      X.addClass('#mainMenu #saveButton','disabled');
  }

  async function startGame() {
    close();
    await GameSystem.startNewGame();
  }

  async function saveGame() {
    close();

    await GameSystem.saveGame();

    Alert.show({
      message: "Game Saved",
      fadeTime: 1000,
      type: LogType.success,
    });
  }

  async function startFixture(event) {
    close();

    const fixture = event.target.dataset.fixture

    let setup;
    if (fixture === 'dungeon') { setup = Fixtures.setupDungeon; }
    if (fixture === 'battle') { setup = Fixtures.setupBattle; }
    if (fixture === 'training') { setup = Fixtures.setupTraining; }
    if (setup == null) { throw new Error(`Bad fixture code: ${fixture}`); }

    await GameSystem.startNewGame(setup);
  }

  async function continueGame() {
    close();

    await GameSystem.loadLastGame();
  }

  return {
    init,
    loadBaseMenu,
    loadGameMenu,

    show,
    hide,
    open,
    close,

    isVisible,
  };

})();
