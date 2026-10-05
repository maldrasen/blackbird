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
    EquipmentPanel.init();
    GameStateFrame.init();
    GeneralOverlay.init();
    InventoryOverlay.init();
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
    ScrollKeys.init();
    Select.init();
    TabController.init();
    Tooltip.init();
    TrainingView.init();
    WindowManager.init();
  }

  // Handles the UI side of ending a game, dropping back to the base main menu.
  function endGame() {
    reset();
    MainContent.clearMainContent();
    MainMenu.close();
    MainMenu.loadBaseMenu();
    MainMenu.show();
  }

  // Closes everything that lives outside the main content, so nothing from the game being quit can linger under the
  // menu. The stacked windows and the free-floating elements are closed without regard for whether they're open, and
  // the mode views that keep timers or animation frames running are stopped the same way a mode change stops them.
  function reset() {
    WindowManager.forceCloseAll();
    NegotiationOverlay.close();
    Confirmation.hide();
    Select.close();
    MainContent.unhalt();
    LocationView.close();
    DungeonView.close();
  }

  return {
    initAll,
    endGame,
  };

})();
