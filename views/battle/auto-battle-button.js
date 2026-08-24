global.AutoBattleButton = (function() {

  function init() {
    X.onClick('#autoBattleButton', toggle);
    KeyBindingDispatcher.register('autoBattle', { isActive, perform:toggle });
  }

  function isActive() {
    return X.first('#battleView') != null && BattleSystem.getState() != null;
  }

  function update() {
    const button = X.first('#autoBattleButton');
    button.innerHTML = `Auto${keyHint()}`;

    BattleSystem.getState().isAutoBattle() ? X.addClass(button,'on') : X.removeClass(button,'on');
  }

  function keyHint() {
    const key = KeyBindings.getBinding('autoBattle','toggle');
    return key ? `<span class='key-hint'>${KeyBindings.labelFor(key)}</span>` : '';
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
