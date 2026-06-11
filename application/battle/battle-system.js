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

  // When damage is applied to a character most of the time all we need to do is reduce their health and play the hit
  // effect. If a character dies from this damage though we need to show a death effect, then once the effect has
  // played, if a character is behind the character that died that character must move up. If the death clears a colum
  // we need to move everyone in towards the center. I think we need to animate the moves to make it clear who went
  // where. As these animations are playing though we need to lock the interface, preventing the battle from advancing
  // until all the movement animations are done playing. If no movement is required though, we don't need to lock
  // anything.
  //
  // Data: { entity, damage, type, isCrit }
  //
  // TODO: This will also need to take into account conditions like vulnerable, once we have conditions being applied.
  //
  function applyDamage(data) {
    let killed = false;

    const health = HealthComponent.lookup(data.entity);
    health.currentHealth -= data.damage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      killed = true;
      killEntity(data.entity);
    }

    BattleInterface.showDamageEffect({ killed, ...data });
    HealthComponent.update(data.entity, health);
  }

  // Remove from turn order.
  // Remove monster from formation once the death animation finishes.
  function killEntity(id) {

    console.log(`=== ${id} was killed ===`);

    if (state.isInFront(id)) {
      const column = state.getColumnContaining(id);
      if (column.back.id != null) {
        console.log(`Entity:${id} was killed. Entity:${column.back.id} is behind them and must move forward.`);
        FormationManager.moveForwardOnDeath(column);
      }
    }

    // May need to do something different for monsters and players.
    // (state.isMonster(id) ? killMonster(id) : killCharacter(id));
  }

  function killMonster(id) {
    console.log("TODO: Kill Monster")
  }
  function killCharacter(id) {
    console.log("TODO: Kill Character")
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