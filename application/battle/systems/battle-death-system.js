global.BattleDeathSystem = (function() {

  // TODO: This function is Just a stub for now, but it's situation that will come up. When a monster or character is
  //       disabled, but not killed, they need to remain in the battle formation. Being paralysed for instance should
  //       force a character behind that character to move forward in the formation. A paralysed character can't act
  //       as a blocker, but they are still physically in the formation. When the battle is over we delete dead
  //       monsters, but monsters who are alive but disabled will carry over into a follow on event where we decide
  //       what to do with them. If they're added to the party we make them permanent, or we delete them.

  function disableEntity(id) {
    throw new Error(`Implement disableEntity()`);
  }

  // TODO: These function will need also need to change. If all of the living monsters are disabled (fully bound,
  //       paralysed, turned to stone, whatever) then the battle is also won, and we start a follow on event with the
  //       living monsters, currently in the monster formation in the state.

  function isBattleWon() {
    const state = BattleSystem.getState();
    return state.getActiveMonsters().length === 0
  }

  function isBattleLost(killed) {
    return GameSystem.getState().getPlayer() === killed;
  }

  // There's a lot that needs to be done when an entity is killed. The entities are removed from the turn order and
  // the formations. If a character was in the back row, and the character in front of them was killed they move to
  // the front rank. If a column was completely emptied then we need to move the side columns inward. The battle ends
  // when all the monsters are dead, when the player is killed, or when the party formation has been emptied.
  function killEntity(id) {
    const state = BattleSystem.getState();
    const isMonster = state.isMonster(id);
    const isInFront = state.isInFront(id);
    const column = state.getColumnContaining(id);

    state.setCondition(id, BattleCondition.dead);
    state.removeFromTurnOrder({ type:(isMonster ? 'monster' : 'character'), id:id });

    BattleInterface.killEntity(id);

    // If the battle is over we don't need to worry about adjusting the positions.
    if (isBattleWon()) { return state.battleWon(); }
    if (isBattleLost(id)) { return state.battleLost(); }

    // Dead characters leave the party configuration so the next battle doesn't start with a corpse in the formation.
    // This has to happen before anyone moves forward into their spot, otherwise setCharacter() would swap the dead
    // character into the mover's old position.
    if (isMonster === false) { PartyConfiguration.removeCharacter(id); }

    // If this character is in the back rank they can be safely removed.
    if (isInFront === false) { state.removeFromFormation(id); }

    if (isInFront) {
      // No other character is behind this one, it can be removed.
      if (column.back.id == null) { state.removeFromFormation(id); }

      // A character is in the rank behind this one, it must move forward.
      if (column.back.id) {
        FormationManager.moveForwardOnDeath(column);
        BattleInterface.moveForwardOnDeath(column);
      }
    }

    // If a monster was killed we force them to move in towards the center rank.
    if (isMonster && isColumnEmpty(id, column)) {
      FormationManager.moveInwardOnDeath(parseInt(column.front.position[4]));
    }

    // The battle is lost when the last standing character goes down, even if the player is only knocked out.
    if (isMonster === false && state.getActiveCharacters().length === 0) { return state.battleLost(); }
  }

  // Knocking a character out looks like a death in battle: they leave the turn order and the formation, and anyone
  // behind them moves forward. The difference is that nothing here is persistent. The character keeps their place in
  // the party configuration and the forward move only touches the transient battle formation, so after the battle
  // everyone is revived back into their original positions. Only characters can be knocked out; monsters die at zero.
  function knockOutEntity(id) {
    const state = BattleSystem.getState();
    const isInFront = state.isInFront(id);
    const column = state.getColumnContaining(id);

    state.setCondition(id, BattleCondition.knockedOut);
    state.removeFromTurnOrder({ type:'character', id:id });

    BattleInterface.killEntity(id);

    if (isInFront === false) { state.removeFromFormation(id); }

    if (isInFront) {
      if (column.back.id == null) { state.removeFromFormation(id); }

      if (column.back.id) {
        FormationManager.moveForwardOnKnockOut(column);
        BattleInterface.moveForwardOnDeath(column);
      }
    }

    if (state.getActiveCharacters().length === 0) { return state.battleLost(); }
  }

  // There are no mechanics for reviving a knocked out character during a battle, but when a battle is won they're
  // saved, waking up with a single point of health. Their party configuration entry was never touched, so they
  // return to their original position automatically.
  function reviveKnockedOut() {
    const state = BattleSystem.getState();
    const revived = state.getKnockedOut();

    revived.forEach(id => {
      const health = HealthComponent.lookup(id);
      health.currentHealth = 1;
      HealthComponent.update(id, health);
    });

    return revived;
  }

  // When a monster is killed we need to check to see if the column is empty. We pass in the id of the monster that
  // was just killed so that we know to ignore them.
  function isColumnEmpty(id, column) {
    const backEmpty = column.back.id == null || column.back.id === id;
    const frontEmpty = column.front.id == null || column.front.id === id;
    return backEmpty && frontEmpty;
  }

  return Object.freeze({
    disableEntity,
    killEntity,
    knockOutEntity,
    reviveKnockedOut,
  });

})();
