global.LocationView = (function() {

  function show() {
    const location = Location.lookup(GameState.getCurrentLocation());

    MainContent.setMainContent("views/location.html");
    MainContent.setBackground(location.getBackground());

    console.log("Name?",location.getName());
  }

  return Object.freeze({
    show
  });

})();
