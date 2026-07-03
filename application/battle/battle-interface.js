global.BattleInterface = (function() {

  function showCharacterCommands() {
    if (Tests.running()) { return; }
    CommandPanel.showCommands(CharacterAbilitySystem.getAbilities());
  }

  function showMonsterResult() {
    if (Tests.running()) { return; }
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function showCharacterResult() {
    if (Tests.running()) { return; }
    CommandPanel.hide();
    BattleText.setMessages(BattleSystem.getRound().getMessages());
    BattleView.update();
  }

  function updateCombatantView(id) {
    if (Tests.running()) { return; }
    FormationPanel.updateCombatant(id)
  }

  function highlightActing() {
    if (Tests.running()) { return; }
    FormationPanel.highlightActing(BattleSystem.getRound().getActing());
  }

  function showDamageEffect(data) {
    if (Tests.running()) { return; }
    FormationPanel.showDamageEffect(data);
  }

  function killEntity(id) {
    if (Tests.running()) { return; }
    FormationPanel.killEntity(id);
  }

  function moveForwardOnDeath(columnData) {
    if (Tests.running()) { return; }
    FormationPanel.moveForwardOnDeath(columnData);
  }

  function moveInwardOnDeath(moves) {
    if (Tests.running()) { return; }
    FormationPanel.moveInwardOnDeath(moves);
  }

  // TODO: The battle enlighten view will need a list of the monsters killed to generate loot and experience, and a
  //       list of skills increased during the battle.
  function showVictory() {
    if (Tests.running() === false) {
      BattleSystem.endBattle();
      EnlightenSystem.startEnlightenment('battle',{});
      GameState.setGameMode(GameMode.enlighten);
    }
  }

  // TODO: Rather than going back to the location we need to show an actual game over screen. This will kick the
  //       player back to the main menu and reset the game state, allowing the last saved game to be loaded.
  function showGameOver() {
    if (Tests.running() === false) {
      BattleSystem.endBattle();
      GameState.setGameMode(GameMode.location);
    }
  }

  return Object.freeze({
    showCharacterCommands,
    showCharacterResult,
    showMonsterResult,
    updateCombatantView,
    highlightActing,
    showDamageEffect,
    killEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,
    showVictory,
    showGameOver,
  });

})();
