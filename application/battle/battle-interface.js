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

  // Essence has to be awarded before endBattle(), which deletes the dead monsters from the registry.
  function showVictory() {
    if (Tests.running()) { return; }

    const state = BattleSystem.getState();
    const survivors = state.getCharacters().filter(id => state.isAlive(id));
    const essenceAwards = EssenceSystem.awardBattleEssence(state.getDeadPile(), survivors);

    BattleSystem.endBattle();
    EnlightenSystem.startEnlightenment('battle',{
      skillImprovements: state.getSkillImprovements(),
      essenceAwards,
      party: survivors,
    });
    GameSystem.setGameMode(GameMode.enlighten);
  }

  function showGameOver() {
    if (Tests.running()) { return; }

    BattleSystem.endBattle();
    EpisodeSystem.startEpisode('game-over', {});
    GameSystem.setGameMode(GameMode.episode);
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
