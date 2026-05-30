global.BattleView = (function() {

  function init() {
    BattleText.init();
  }

  function show() {
    MainContent.setMainContent("views/battle.html");
    MainContent.setBackground("backgrounds/battle.jpg");

    FormationPanel.build();
    BattleText.build();
    BattleText.showBattleStartText();
  }

  return Object.freeze({
    init,
    show
  });

})();
