global.BattleInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return GameSystem.getState().getGameMode() === GameMode.battle;
  }

  function startTargeting(positions, allies) {
    if (viewActive()) { FormationPanel.startTargeting(positions, allies); }
  }

  function showCharacterCommands() {
    if (viewActive()) { CommandPanel.showCommands(CharacterAbilitySystem.getAbilities()); }
  }

  function showMonsterResult() {
    if (viewActive() === false) { return; }
    CommandPanel.hide();
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function showCharacterResult() {
    if (viewActive() === false) { return; }
    CommandPanel.hide();
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function updateCombatantView(id) {
    if (viewActive()) { FormationPanel.updateCombatant(id); }
  }

  function highlightActing() {
    if (viewActive()) { FormationPanel.highlightActing(BattleSystem.getRound().getActing()); }
  }

  function showDamageEffect(data) {
    if (viewActive()) { FormationPanel.showDamageEffect(data); }
  }

  function killEntity(id) {
    if (viewActive()) { FormationPanel.killEntity(id); }
  }

  function moveForwardOnDeath(columnData) {
    if (viewActive()) { FormationPanel.moveForwardOnDeath(columnData); }
  }

  function moveInwardOnDeath(moves) {
    if (viewActive()) { FormationPanel.moveInwardOnDeath(moves); }
  }

  // Not a call into the battle view. This starts an episode and changes the mode, so it's gated on the client being
  // present rather than on the battle view being active.
  function showGameOver() {
    if (Environment.viewPresent() === false) { return; }
    EpisodeSystem.startEpisode('game-over', {});
    GameSystem.setGameMode(GameMode.episode);
  }

  return {
    startTargeting,
    showCharacterCommands,
    showCharacterResult,
    showMonsterResult,
    updateCombatantView,
    highlightActing,
    showDamageEffect,
    killEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,
    showGameOver,
  };

})();
