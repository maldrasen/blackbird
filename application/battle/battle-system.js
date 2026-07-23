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

  function endBattle() {
    state.cleanup();
    state = null;
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
    endBattle();
    BattleInterface.showGameOver();
  }

  // TODO: Generate loot from dead monsters.
  function battleWon() {
    const totalEssence = state.getTotalEssence();
    const skillImprovements = state.getSkillImprovements();
    const revived = BattleDeathSystem.reviveKnockedOut();
    const loot = [];

    endBattle();

    EnlightenSystem.startEnlightenment('battle', {
      skillImprovements,
      totalEssence,
      revived,
      loot,
    });

    GameSystem.setGameMode(GameMode.enlighten);
  }

  return Object.freeze({
    startBattle,
    endBattle,
    advanceBattle,
    startRound,
    specRound,
    finishCharacterRound,

    getState: () => { return state; },
    getRound: () => { return round; },
  });

})()