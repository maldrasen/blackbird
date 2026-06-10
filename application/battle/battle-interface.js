global.BattleInterface = (function() {

  function showCharacterCommands() {
    CommandPanel.showCommands(CharacterCommands.getCommands());
  }

  function showMonsterResult(result) {
    BattleText.setMessages(result.messages);
    BattleView.update();
  }

  function showCharacterResult(result) {
    CommandPanel.hide();
    BattleText.setMessages(result.messages);
    BattleView.update();
  }

  return Object.freeze({
    showCharacterCommands,
    showCharacterResult,
    showMonsterResult,
  });

})();
