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

  // Useful function for debugging turn order. Eventually I'd like to just have a turn order widget on the side of the
  // battle view, although having the order hidden does add a certain uncertainty.
  function printTurnOrder() {
    console.log("");
    console.log("=== Turn Order ===")
    state.getTurnOrder().forEach(entry => {
      const name = entry.type === 'character' ? Character(entry.id).getName() : `${Monster(entry.id).getBaseName()} [${state.getPosition(entry.id)}]`;
      console.log(`[${entry.time}] ${name}`);
    });
    console.log("");
  }

  function advanceBattle() {
    startRound();

    Console.log(`Advancing Battle`,{ system:'BattleSystem', level:1, data:{ acting:round.getActing() }});

    switch (state.getInterrupt()) {
      case 'victory': return BattleInterface.showVictory();
      case 'game-over': return BattleInterface.showGameOver();
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