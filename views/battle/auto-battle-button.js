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

    if (state.isAutoBattle()) { takeOverRound(); }
  }

  // Turning auto mode on while a character is waiting for a command takes their turn immediately, cancelling any
  // targeting that was in progress first.
  function takeOverRound() {
    if (FormationPanel.isTargeting()) { FormationPanel.cancelTargeting(); }
    if (X.hasClass('#commandPanel','hide') === false) { AutoBattleSystem.takeTurn(); }
  }

  return {
    init,
    update,
  };

})();
