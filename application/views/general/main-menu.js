global.MainMenu = (function() {

  function init() {
    X.onClick('#mainMenu a.start-button', startGame);
    X.onClick('#mainMenu a.start-fixture', startFixture);

    X.onClick('#mainMenu a.continue-button', continueGame);
    X.onClick('#mainMenu a.load-button', showLoadGame);
    X.onClick('#mainMenu a.options-button', showOptions);
    X.onClick('#mainMenu a.quit-button', window.close);

    X.first('#mainMenu a.close-menu-button').style['background-image'] = X.assetURL('ui/x-icon.png');

    // TODO: Show fixture in prod for now. Change this before an actual release though.
    if (Environment.isDevelopment || Environment.isProduction) {
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
    // When opened from other than main menu...
    // X.removeClass('#menuCover','hide');
  }

  function close() {
    hide();
    // When opened from other than main menu...
    // X.addClass('#menuCover','hide');
  }

  function isVisible() { return X.hasClass('#mainMenu','hide') === false; }

  function adjustMenu() {
    if (WorldState.getPreviousGame()) {
      X.removeClass('#mainMenu a.load-button','disabled');
      X.removeClass('#mainMenu a.continue-button','disabled');
    }
  }

  async function startGame() {
    close();
    await GameSystem.startNewGame();
    await GameSystem.openGame();
  }

  async function startFixture(event) {
    close();

    const fixture = event.target.dataset.fixture

    let setup;
    if (fixture === 'dungeon') { setup = Fixtures.setupDungeon; }
    if (fixture === 'battle') { setup = Fixtures.setupBattle; }
    if (fixture === 'training') { setup = Fixtures.setupTraining; }
    if (fixture === 'reports') { setup = ReportFixture.show; }
    if (setup == null) { throw new Error(`Bad fixture code: ${fixture}`); }

    await GameSystem.startNewGame({ setup });
    await GameSystem.openGame();
  }

  async function continueGame() {
    close();

    await GameSystem.loadLastGame();
    await GameSystem.openGame();
  }

  function showLoadGame() {
    console.log("TODO: Show Load Game")
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
