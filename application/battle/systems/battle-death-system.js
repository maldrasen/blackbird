global.BattleDeathSystem = (function() {

  function isBattleWon() { return BattleSystem.getState().getActiveMonsters().length === 0; }
  function isBattleLost(killed) { return GameSystem.getState().getPlayer() === killed; }

  // There's a lot that needs to be done when an entity is killed. The entities are removed from the turn order and
  // the formations. If a character was in the back row, and the character in front of them was killed they move to
  // the front rank. If a column was completely emptied then we need to move the side columns inward. The battle ends
  // when all the monsters are dead, when the player is killed, or when the party formation has been emptied.
  function killEntity(id) {
    const state = BattleSystem.getState();
    const isMonster = state.isMonster(id);
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

    removeFromFormation(id, FormationManager.moveForwardOnDeath);

    // If a monster was killed we force them to move in towards the center rank.
    if (isMonster && isColumnEmpty(id, column)) {
      FormationManager.moveInwardOnDeath(parseInt(column.front.position[4]));
    }

    // The battle is lost when the last standing character goes down.
    if (isMonster === false && state.getActiveCharacters().length === 0) { state.battleLost(); }
  }

  // Knocking a character out looks like a death in battle: they leave the turn order and the formation, and anyone
  // behind them moves forward. The difference is that nothing here is persistent. The character keeps their place in
  // the party configuration and the forward move only touches the transient battle formation, so after the battle
  // everyone is revived back into their original positions. Only characters can be knocked out; monsters die at zero.
  function knockOutEntity(id) {
    const state = BattleSystem.getState();

    state.setCondition(id, BattleCondition.knockedOut);
    state.removeFromTurnOrder({ type:'character', id:id });

    BattleInterface.killEntity(id);

    removeFromFormation(id, FormationManager.moveForwardOnKnockOut);

    if (state.getActiveCharacters().length === 0) { state.battleLost(); }
  }

  // Removing a downed entity from the formation works the same way for a death and a knock out, except for how the
  // entity behind them is moved forward, so the caller passes in the appropriate FormationManager move function.
  function removeFromFormation(id, moveForward) {
    const state = BattleSystem.getState();
    const column = state.getColumnContaining(id);

    // An entity in the back rank, or with no one behind them, can simply be removed.
    if (state.isInFront(id) === false || column.back.id == null) {
      return state.removeFromFormation(id);
    }

    // An entity in the rank behind this one must move forward.
    moveForward(column);
    BattleInterface.moveForwardOnDeath(column);
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
    killEntity,
    knockOutEntity,
    reviveKnockedOut,
  });

})();
