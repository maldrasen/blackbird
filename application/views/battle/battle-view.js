global.BattleView = (function() {

  function init() {

  }

  function show() {
    MainContent.setMainContent("views/battle.html");
    MainContent.setBackground("backgrounds/battle.jpg");
    FormationPanel.build();
  }

  return Object.freeze({
    init,
    show
  });

})();
