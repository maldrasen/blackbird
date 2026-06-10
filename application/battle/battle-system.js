global.BattleSystem = (function() {
  let state;

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

  function advanceBattle() {
    const next = state.getNext();

    if (next.type === 'monster') {
      state.setActingMonster(next.id);
      finishMonsterTurn(MonsterSimulator.executeBattleTurn(next.id));
    }
    if (next.type === 'character') {
      state.setActingCharacter(next.id);
      startCharacterTurn();
    }
  }

  function startCharacterTurn() {
    BattleInterface.showCharacterCommands();
  }

  function finishMonsterTurn(result) {
    const next = state.getNext();
    const acting = state.getActingMonster();

    if (next.id !== acting) {
      throw new Error(`BattleSystem Error: The next monster is not the acting monster.`);
    }

    next.time += result.time;
    state.setTurnOrder(next);

    BattleInterface.showMonsterResult(result);
  }

  function finishCharacterTurn(result) {
    const next = state.getNext();
    const acting = state.getActingCharacter();

    if (next.id !== acting) {
      throw new Error(`BattleSystem Error: The next character is not the acting character.`);
    }

    next.time += result.time;
    state.setTurnOrder(next);

    BattleInterface.showCharacterResult(result);
  }

  // TODO: This will need to take into account conditions like vulnerable, once
  //       we have conditions being applied.
  function applyDamage(entity, damage) {
    const health = HealthComponent.lookup(entity);
    health.currentHealth -= damage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      console.log(`Oh no, ${entity} is dead. What now?`);
    }

    HealthComponent.update(entity, health);
  }

  return Object.freeze({
    startBattle,
    endBattle,
    advanceBattle,
    finishCharacterTurn,

    getState: () => { return state },
    applyDamage,
  });

})()