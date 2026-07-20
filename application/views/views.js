global.Views = (function() {

  function initAll() {
    BattleView.init();
    Casement.init();
    CharacterOverlay.init();
    Confirmation.init();
    Console.init();
    DungeonView.init();
    EnlightenView.init();
    EpisodeView.init();
    GameStateFrame.init();
    GeneralOverlay.init();
    LocationView.init();
    MainMenu.init();
    MouseMonitor.init();
    NegotiationOverlay.init();
    OptionsOverlay.init();
    ScrollingPanel.init();
    TabController.init();
    Tooltip.init();
    TrainingView.init();
    WindowManager.init();
  }

  return Object.freeze({ initAll });

})();
