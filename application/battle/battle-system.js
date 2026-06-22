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
      case 'victory': return BattleInterface.showVictory();
      case 'game-over': return BattleInterface.showGameOver();
    }

    if (round.isActingMonster()) {
      MonsterSimulator.executeBattleTurn();
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
    const round = BattleSystem.getRound();
    console.log("--- Finish Monster Round ---")
    console.log("Messages:",round.getMessages());
    console.log("Time:",round.getTime())
    round.validate();

    BattleSystem.getState().updateTime(round.getActing(), round.getTime());
    round.getMessages().length === 0 ? advanceBattle() : BattleInterface.showMonsterResult();
  }

  function finishCharacterRound() {
    const round = BattleSystem.getRound();
    console.log("--- Finish Character Round ---")
    console.log("Messages:",round.getMessages());
    console.log("Time:",round.getTime())
    round.validate();

    BattleSystem.getState().updateTime(round.getActing(), round.getTime());
    BattleInterface.showCharacterResult();
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