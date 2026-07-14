global.BattleView = (function() {

  function init() {
    BattleText.init();
    CommandPanel.init();
    FormationPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/battle.html");
    FormationPanel.build();
    BattleText.build();
    BattleText.showBattleStartText();
  }

  function update() {
    const state = BattleSystem.getState();
    FormationPanel.updateAll(state);
  }

  return Object.freeze({
    init,
    show,
    update,
  });

})();
