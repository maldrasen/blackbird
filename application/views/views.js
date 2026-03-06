global.Views = (function() {

  function initAll() {
    Casement.init();
    CharacterOverlay.init();
    Confirmation.init();
    Console.init();
    DungeonView.init();
    EpisodeView.init();
    GameStateFrame.init();
    GeneralOverlay.init();
    MainMenu.init();
    MouseMonitor.init();
    OptionsOverlay.init();
    ScrollingPanel.init();
    TabController.init();
    Tooltip.init();
    TrainingView.init();
    WindowManager.init();
  }

  return Object.freeze({ initAll });

})();
