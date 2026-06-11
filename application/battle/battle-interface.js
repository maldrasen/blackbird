global.BattleInterface = (function() {

  function showCharacterCommands() {
    if (Tests.running()) { return; }
    CommandPanel.showCommands(CharacterCommands.getCommands());
  }

  function showMonsterResult(result) {
    if (Tests.running()) { return; }
    BattleText.setMessages(result.messages);
    BattleView.update();
  }

  function showCharacterResult(result) {
    if (Tests.running()) { return; }
    CommandPanel.hide();
    BattleText.setMessages(result.messages);
    BattleView.update();
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

  // I think battles should always have a previous mode, unless it was started as a fixture. We could also advance
  // time here, but the time that battles take is pretty insignificant. We'd have to get it from the last turn order
  // before it gets overwritten.
  function showVictory() {
    if (Tests.running() === false) {
      BattleSystem.endBattle();
      GameState.setGameMode(GameMode.location);
    }
  }

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
    showDamageEffect,
    killEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,
    showVictory,
    showGameOver,
  });

})();
