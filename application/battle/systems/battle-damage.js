global.BattleDamage = (function() {

  // Some actions can contain multiple hits, so we need to check to see if the target is alive before applying damage
  // in case they were already killed, which would remove them from the formation and cause problems if we try and
  // remove them again.
  //    Data: { entity, damage, damageTypes, hitLocation, isCrit }
  //
  function applyDamage(data) {
    if (BattleSystem.getState().isAlive(data.entity) === false) {
      throw new Error(`[${data.entity}] is already dead. Damage should not have been applied.`);
    }

    let killed = false;
    let actualDamage = data.damage;

    // TODO: The actual damage done will need to be reduced by the armor of the hit location, the character's
    //       resistances to certain damage types.
    // TODO: This will also need to take into account conditions like vulnerable which increase the raw damage

    const health = HealthComponent.lookup(data.entity);
    health.currentHealth -= actualDamage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      killed = true;
      killEntity(data.entity);
    }

    BattleInterface.showDamageEffect({ killed, ...data });
    HealthComponent.update(data.entity, health);

    return actualDamage;
  }

  // There's a lot that needs to be done when an entity is killed. The entities are removed from the turn order and
  // the formations. If a character was in the back row, and the character in front of them was killed they move to
  // the front rank. If a column was completely emptied then we need to move the side columns inward. We check if all
  // the monsters or the player were killed and end the battle if so.
  function killEntity(id) {
    const state = BattleSystem.getState();
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
  }

  // Called when a monster is killed and we need to check to see if the column is empty. We pass in the id of the
  // monster that was just killed so that we know to ignore them.
  function isColumnEmpty(id, column) {
    const backEmpty = column.back.id == null || column.back.id === id;
    const frontEmpty = column.front.id == null || column.front.id === id;
    return backEmpty && frontEmpty;
  }

  return Object.freeze({
    applyDamage,
  });

})();
