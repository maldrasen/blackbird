global.BattleView = (function() {

  function init() {

  }

  function show() {
    console.log("Show Battle View")
    MainContent.setMainContent("views/battle.html");
    MainContent.setBackground("backgrounds/battle.jpg");
  }

  return Object.freeze({
    init,
    show
  });

})();
