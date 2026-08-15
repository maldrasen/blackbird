global.BattleSystem = (function() {
  let state;
  let round;

  function startBattle(data) {
    state = BattleState(data);

    EncounterBuilder.buildMonsters(state);
    EncounterBuilder.rollReactionTimes(state);
    EncounterBuilder.populateThreatTables(state);

    state.setAmbushState(data.ambushState || EncounterBuilder.rollAmbush());
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

  // TODO: When a fixed time status effect is added its removal time needs to be added to the turn order because the
  //       effect goes away independent of the character's actions. Periodic effects (poison and burn) also add their
  //       next trigger time to the turn order, and removing an effect needs to clear its turn order entries.
  function addStatus(entity, code, values={}) {
    const { removed } = StatusEffects(entity).apply(code, values);
    if (removed.length > 0) { BattleInterface.updateCombatantView(entity); }
  }

  function removeStatus(entity, code) {
    StatusEffects(entity).remove(code);
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
    startRound();

    Console.log(`Advancing Battle`,{ system:'BattleSystem', level:1, data:{ acting:round.getActing() }});

    switch (state.getInterrupt()) {
      case 'victory': return battleWon();
      case 'game-over': return battleLost();
    }

    if (round.isActingMonster()) {
      MonsterSystem.executeBattleTurn();
      finishMonsterRound();
    }
    if (round.isActingCharacter()) {
      startCharacterRound();
    }
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