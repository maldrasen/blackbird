global.EnlightenView = (function() {

  function init() {
    X.onClick('#enlightenView .button-complete', complete);
  }

  function show() {
    MainContent.setMainContent("views/enlighten.html");
    MainContent.setBackground(`backgrounds/training.jpg`);
    GameStateFrame.hide();
  }

  function complete() {
    GameStateFrame.show();
    StateMachine.returnToPreviousMode();
  }

  return Object.freeze({
    init: init,
    show: show,
  });

})();
