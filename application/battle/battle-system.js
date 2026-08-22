global.BattleSystem = (function() {
  let state;
  let round;

  function startBattle(data) {
    state = BattleState(data);

    const source = buildEncounter(data);
    BattleInitializer.rollReactionTimes();
    BattleInitializer.populateThreatTables();

    state.setAmbushState(data.ambushState || BattleInitializer.rollAmbush());

    // Once the formation is in place and the ambush state is known, the battle start text can be resolved from
    // whichever record the encounter was built from. It's stored as a plain string so the state holds no live
    // record objects. Battles built from a single monster or raw record data have no source and no start text.
    if (source) { state.setStartText(source.getStartText(state.getAmbushState())); }
  }

  function buildEncounter(data) {
    if (data.encounter) { return EncounterBuilder.buildFromRecord(data.encounter); }
    if (data.monster) { return EncounterBuilder.buildFromMonster(data.monster); }
    if (data.formation) { return EncounterBuilder.buildFromRecordData(data.formation, data.monsters); }
    return EncounterBuilder.build(data);
  }

  function reset() {
    if (state) { state.cleanup(); }
    removeBattleEffects();
    state = null;
    round = null;
  }

  // It's more efficient to hit the registry directly here, deleting any status effect that should be cleared after
  // the battle. This works just as well as looping through all the characters and monsters, though I'm assuming that
  // removing battle status effects will never have some kind side effect.
  function removeBattleEffects() {
    Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return StatusEffectType.lookup(data.code).isClearedAfterBattle();
    }).forEach(Registry.deleteEntity);
  }

  function addStatus(entity, code, values={}) {
    const { removed } = StatusEffects(entity).apply(code, values);
    StatusEffectSystem.scheduleTick(entity, code);
    if (removed.length > 0) { BattleInterface.updateCombatantView(entity); }
  }

  function removeStatus(entity, code) {
    StatusEffects(entity).remove(code);
    state.removeStatusEffectsFromTurnOrder(entity, code);
    BattleInterface.updateCombatantView(entity);
  }

  function startRound() {
    round = BattleRound(state.getNext().id);
    round.compileWeaponData();
    BattleInterface.highlightActing();
    StatusEffectSystem.processStartRound();
  }

  function specRound(acting,options={}) {
    round = BattleRound(acting);
    round.compileWeaponData();
    if (options.target) { round.setTarget(options.target); }
    StatusEffectSystem.processStartRound();
  }

  function advanceBattle() {
    switch (state.getInterrupt()) {
      case 'victory': return battleWon();
      case 'game-over': return battleLost();
    }

    const next = state.getNext();
    Console.log(`Advancing Battle`,{ system:'BattleSystem', level:1, data:{ next:next.key }});

    if (next.type === 'status') { return statusEffectRound(next); }

    startRound();

    if (round.isActingMonster()) {
      MonsterSystem.executeBattleTurn();
      finishMonsterRound();
    }
    if (round.isActingCharacter()) {
      startCharacterRound();
    }
  }

  function statusEffectRound(entry) {
    round = BattleRound(entry.id);
    StatusEffectSystem.processTick(entry);
    round.getMessages().length === 0 ? advanceBattle() : BattleInterface.showMonsterResult();
  }

  function startCharacterRound() {
    BattleInterface.showCharacterCommands();
  }

  function finishMonsterRound() {
    finishRound();
    round.getMessages().length === 0 ? advanceBattle() : BattleInterface.showMonsterResult();
  }

  function finishCharacterRound() {
    finishRound();
    BattleInterface.showCharacterResult();
  }

  function finishRound() {
    round.validate();
    StealthSystem.processRound();
    StatusEffectSystem.processEndRound();
    state.updateTime(round.getActing(), round.getTime());
  }

  function battleLost() {
    reset();
    EpisodeSystem.startEpisode('game-over', {});
    GameSystem.setGameMode(GameMode.episode);
  }

  // TODO: Generate loot from dead monsters.
  function battleWon() {
    const totalEssence = state.getTotalEssence();
    const skillImprovements = state.getSkillImprovements();
    const revived = BattleDeathSystem.reviveKnockedOut();
    const loot = [];

    // The survivors' home positions become the new party configuration. This is the only point where a battle
    // writes the persistent configuration.
    PartyConfiguration.setConfiguration(state.getHomePositions());

    reset();

    EnlightenSystem.startEnlightenment('battle', {
      skillImprovements,
      totalEssence,
      revived,
      loot,
    });

    GameSystem.setGameMode(GameMode.enlighten);
  }

  return {
    startBattle,
    reset,
    addStatus,
    removeStatus,
    advanceBattle,
    startRound,
    specRound,
    finishCharacterRound,
    finishRound,

    getState: () => { return state; },
    getRound: () => { return round; },
  };

})()