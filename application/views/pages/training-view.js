global.TrainingView = (function() {

  function show() {
    MainContent.setMainContent("views/training.html");
    MainContent.setBackground("backgrounds/filthy-hovel.jpg");
  }

  return Object.freeze({
    show
  });

})();
