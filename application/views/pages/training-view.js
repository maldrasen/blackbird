global.TrainingView = (function() {

  function show(data) {
    const location = Location.lookup(GameState.getCurrentLocation());

    MainContent.setMainContent("views/training.html");
    MainContent.setBackground(location.getBackground());
  }

  return Object.freeze({
    show
  });

})();
