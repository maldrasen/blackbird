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

  function knockOutEntity(id) {
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

  // Essence has to be awarded before endBattle(), which deletes the dead monsters from the registry. Knocked out
  // characters were removed from the battle formation, so they're revived and added back into the party here to
  // share in the battle's rewards.
  function showVictory() {
    if (Tests.running()) { return; }

    const state = BattleSystem.getState();
    const revived = BattleDeathSystem.reviveKnockedOut();
    const party = [...state.getCharacters().filter(id => state.isAlive(id)), ...revived];
    const essenceAwards = EssenceSystem.awardBattleEssence(state.getDeadMonsters(), party);

    BattleSystem.endBattle();
    EnlightenSystem.startEnlightenment('battle',{
      skillImprovements: state.getSkillImprovements(),
      essenceAwards,
      party,
      revived,
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
    knockOutEntity,
    moveForwardOnDeath,
    moveInwardOnDeath,
    showVictory,
    showGameOver,
  });

})();
