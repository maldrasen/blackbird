global.Visions = (function() {

  function initAll() {
    Console.init();
    EventView.init();
    MainMenu.init();
    OptionsOverlay.init();
    WindowManager.init();
  }

  return {
    initAll
  }

})();
