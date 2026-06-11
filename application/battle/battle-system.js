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
    const interrupt = state.getInterrupt();

    if (interrupt === 'victory') { return BattleInterface.showVictory(); }
    if (interrupt === 'game-over') { return BattleInterface.showGameOver(); }

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

    // If no messages have been set then this monster has either skipped their turn or
    // they're doing something silently. Either way we can simply advance the battle.
    if (result.messages == null || result.messages.length === 0) {
      return advanceBattle();
    }

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

  // Data: { entity, damage, damageTypes, isCrit }
  // TODO: This will also need to take into account conditions like vulnerable, once we have conditions being applied.
  // TODO: The damage types really only matter when calculating damage resistances.
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

  // There's a lot that needs to be done when an entity is killed. The entities are removed from the turn order and
  // the formations. If a character was in the back row, and the character in front of them was killed they move to
  // the front rank. If a column was completely emptied then we need to move the side columns inward. We check if all
  // the monsters or the player were killed and end the battle if so.
  function killEntity(id) {
    const isMonster = state.isMonster(id);
    const isInFront = state.isInFront(id);
    const column = state.getColumnContaining(id);

    state.addCondition(id,'dead');
    state.removeFromTurnOrder({ type:(isMonster ? 'monster' : 'character'), id:id });

    BattleInterface.killEntity(id);

    // If the battle is over we don't need to worry about adjusting the positions.
    if (state.getMonsters().filter(id => state.isAlive(id)).length === 0) { return state.battleWon(); }
    if (GameState.getPlayer() === id) { return state.battleLost(); }

    // If this character is in the back rank they can be safely removed.
    if (isInFront === false) {
      state.removeFromFormation(id);
    }

    if (isInFront) {
      const column = state.getColumnContaining(id);

      // No other character is behind this one, it can be removed.
      if (column.back.id) { state.removeFromFormation(id); }

      // A character is in the rank behind this one, it must move forward.
      if (column.back.id != null) {
        FormationManager.moveForwardOnDeath(column);
        BattleInterface.moveForwardOnDeath(column);
      }
    }

    // If a monster was killed we force them to move in towards the center rank.
    if (isMonster && isColumnEmpty(id, column)) {
      FormationManager.moveInwardOnDeath(parseInt(column.front.position[2]));
    }
  }

  // Called when a monster is killed and we need to check to see if the column is empty. We pass in the id of the
  // monster that was just killed so that we know to ignore them.
  function isColumnEmpty(id, column) {
    const backEmpty = column.back.id == null || column.back.id === id;
    const frontEmpty = column.front.id == null || column.front.id === id;
    return backEmpty && frontEmpty;
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