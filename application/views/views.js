global.Views = (function() {

  function initAll() {
    Casement.init();
    Confirmation.init();
    ScrollingPanel.init();
    TabController.init();
    Tooltip.init();

    MouseMonitor.init();
    WindowManager.init();

    Console.init();
    EventView.init();
    MainMenu.init();
    OptionsOverlay.init();
    TrainingView.init();
  }

  return {
    initAll
  }

})();
