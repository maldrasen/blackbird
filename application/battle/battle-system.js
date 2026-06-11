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

    const isMonster = state.isMonster(id);
    const isInFront = state.isInFront(id);

    state.addCondition(id,'dead');
    state.removeFromTurnOrder({ type:(isMonster ? 'monster' : 'character'), id:id });

    BattleInterface.killEntity(id);

    // Remove characters from threat tables.
    if (isMonster === false) {
      state.getMonsters().forEach(mon => {
        Monster(mon).updateThreat(id, 0);
      })
    }

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