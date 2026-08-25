global.Views = (function() {

  function initAll() {
    BattleView.init();
    Casement.init();
    CharacterOverlay.init();
    Confirmation.init();
    ConsoleView.init();
    DungeonControls.init();
    DungeonView.init();
    EnlightenView.init();
    EpisodeView.init();
    GameStateFrame.init();
    GeneralOverlay.init();
    KeyBindingDispatcher.init();
    KeyBindingsPanel.init();
    LevelUpOverlay.init();
    LoadOverlay.init();
    LocationView.init();
    MainMenu.init();
    MouseMonitor.init();
    NegotiationOverlay.init();
    OptionsOverlay.init();
    PartyOverlay.init();
    RoomContentOverlay.init();
    ScrollKeys.init();
    Select.init();
    TabController.init();
    Tooltip.init();
    TrainingView.init();
    TrapOverlay.init();
    WindowManager.init();
  }

  // Handles the UI side of ending a game, dropping back to the base main menu.
  function endGame() {
    MainContent.clearMainContent();
    MainMenu.close();
    MainMenu.loadBaseMenu();
    MainMenu.show();
  }

  return {
    initAll,
    endGame,
  };

})();
