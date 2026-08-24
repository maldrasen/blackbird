global.BattleView = (function() {

  function init() {
    BattleText.init();
    CommandPanel.init();
    FormationPanel.init();
    AutoBattleButton.init();
  }

  function show() {
    MainContent.setMainContent('views/templates/battle.html');
    MainContent.setBackground('backgrounds/battle.jpg');
    FormationPanel.build();
    BattleText.build();
    BattleText.showBattleStartText();
    AutoBattleButton.update();
  }

  function update() {
    const state = BattleSystem.getState();
    FormationPanel.updateAll(state);
  }

  return {
    init,
    show,
    update,
  };

})();
