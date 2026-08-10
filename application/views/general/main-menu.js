global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu #startButton', startGame);
    X.onClick('#mainMenu #saveButton', saveGame);
    X.onClick('#mainMenu #continueButton', continueGame);
    X.onClick('#mainMenu #loadButton', LoadOverlay.open);
    X.onClick('#mainMenu #optionsButton', OptionsOverlay.open);
    X.onClick('#mainMenu #quitButton', window.close);

    X.onClick('#mainMenu a.start-fixture', startFixture);
    X.first('#mainMenu a.close-menu-button').style['background-image'] = X.assetURL('ui/x-icon.png');

    if (Environment.isDevelopment) {
      X.removeClass('#mainMenu .start-fixture','hide');
    }
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
    if (GameSystem.isLoaded()) { X.removeClass('#menuCover','hide'); }
  }

  function close() {
    hide();
    X.addClass('#menuCover','hide');
  }

  function isVisible() { return X.hasClass('#mainMenu','hide') === false; }

  function adjustMenu() {
    const previousGame = WorldState.getPreviousGame();

    if (WorldState.getPreviousGame()) {
      X.removeClass('#mainMenu a.load-button','disabled');
      X.removeClass('#mainMenu a.continue-button','disabled');
    }
    if (GameSystem.isLoaded()) {
      X.removeClass('#mainMenu #saveButton','hide');
      X.addClass('#mainMenu #startButton','hide');
      X.addClass('#mainMenu #continueButton','hide');
      X.addClass('#mainMenu #loadButton','hide');
      X.addClass('#mainMenu #separator','hide');
      X.addClass('#mainMenu .start-fixture','hide');
    }
    if (GameSystem.isLoaded() === false) {
      X.addClass('#mainMenu #saveButton','hide');
      X.removeClass('#mainMenu #startButton','hide');
      X.removeClass('#mainMenu #continueButton','hide');
      X.removeClass('#mainMenu #loadButton','hide');
    }

    GameSystem.canSave() ?
      X.removeClass('#mainMenu #saveButton','disabled'):
      X.addClass('#mainMenu #saveButton','disabled');

    previousGame ?
      X.removeClass('#mainMenu #continueButton','disabled'):
      X.addClass('#mainMenu #continueButton','disabled');

    Object.keys(WorldState.getSavedGames()).length > 0 ?
      X.removeClass('#mainMenu #loadButton','disabled'):
      X.addClass('#mainMenu #loadButton','disabled');

    if (previousGame) {
      X.fill('#continueButton .game-name', WorldState.getSavedGames()[previousGame].legacyName);
    }
  }

  async function startGame() {
    close();
    await GameSystem.startNewGame();
    await GameSystem.openGame();
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
    await GameSystem.openGame();
  }

  async function continueGame() {
    close();

    await GameSystem.loadLastGame();
    await GameSystem.openGame();
  }

  return {
    init,
    openFully,
    show,
    hide,
    open,
    close,
    isVisible,
  };

})();
