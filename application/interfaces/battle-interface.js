global.BattleInterface = (function() {

  function startTargeting(positions, allies) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.startTargeting(positions, allies);
  }

  function showCharacterCommands() {
    if (Environment.viewPresent() === false) { return; }
    CommandPanel.showCommands(CharacterAbilitySystem.getAbilities());
  }

  function showMonsterResult() {
    if (Environment.viewPresent() === false) { return; }
    CommandPanel.hide();
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function showCharacterResult() {
    if (Environment.viewPresent() === false) { return; }
    CommandPanel.hide();
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function updateCombatantView(id) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.updateCombatant(id)
  }

  function highlightActing() {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.highlightActing(BattleSystem.getRound().getActing());
  }

  function showDamageEffect(data) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.showDamageEffect(data);
  }

  function killEntity(id) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.killEntity(id);
  }

  function moveForwardOnDeath(columnData) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.moveForwardOnDeath(columnData);
  }

  function moveInwardOnDeath(moves) {
    if (Environment.viewPresent() === false) { return; }
    FormationPanel.moveInwardOnDeath(moves);
  }

  function showGameOver() {
    if (Environment.viewPresent() === false) { return; }
    EpisodeSystem.startEpisode('game-over', {});
    GameSystem.setGameMode(GameMode.episode);
  }

  return Object.freeze({
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
  });

})();
