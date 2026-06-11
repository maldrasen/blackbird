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

  return Object.freeze({
    showCharacterCommands,
    showCharacterResult,
    showMonsterResult,
    showDamageEffect,
    killEntity,
    moveForwardOnDeath,
  });

})();
