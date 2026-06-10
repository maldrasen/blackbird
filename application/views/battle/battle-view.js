global.BattleView = (function() {

  function init() {
    BattleText.init();
    CommandPanel.init();
    FormationPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/battle.html");
    MainContent.setBackground("backgrounds/battle.jpg");

    FormationPanel.build();
    BattleText.build();
    BattleText.showBattleStartText();
  }

  function update() {
    const state = BattleInterface.getState();
    FormationPanel.updateAll(state);
  }

  return Object.freeze({
    init,
    show,
    update,
  });

})();
