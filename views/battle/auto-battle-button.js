global.AutoBattleButton = (function() {

  function init() {
    X.onClick('#autoBattleButton', toggle);
  }

  function update() {
    const on = BattleSystem.getState().isAutoBattle();
    on ? X.addClass('#autoBattleButton','on') : X.removeClass('#autoBattleButton','on');
  }

  function toggle() {
    const state = BattleSystem.getState();
    state.setAutoBattle(state.isAutoBattle() === false);
    update();

    state.isAutoBattle() ? takeOverRound() : BattleText.cancelAutoAdvance();
  }

  function takeOverRound() {
    if (FormationPanel.isTargeting()) { FormationPanel.cancelTargeting(); }
    if (X.hasClass('#commandPanel','hide') === false) { return AutoBattleSystem.takeTurn(); }

    BattleText.scheduleAutoAdvance();
  }

  return {
    init,
    update,
  };

})();
