global.Views = (function() {

  function initAll() {
    Casement.init();
    Confirmation.init();
    ScrollingPanel.init();
    TabController.init();
    Tooltip.init();

    MouseMonitor.init();
    WindowManager.init();

    GameStateFrame.init();

    Console.init();
    DungeonView.init();
    EventView.init();
    MainMenu.init();
    OptionsOverlay.init();
    TrainingView.init();
  }

  return Object.freeze({ initAll });

})();
