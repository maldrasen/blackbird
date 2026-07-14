global.EnlightenView = (function() {

  function init() {
    X.onClick('#enlightenView .button-complete', complete);
  }

  function show() {
    MainContent.setMainContent("views/enlighten.html");
  }

  function complete() {
    GameSystem.returnToPreviousMode();
  }

  return Object.freeze({
    init: init,
    show: show,
  });

})();
