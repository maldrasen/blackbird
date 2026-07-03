global.BattleDamage = (function() {

  // Some actions can contain multiple hits, so we need to check to see if the target is alive before applying damage
  // in case they were already killed, which would remove them from the formation and cause problems if we try and
  // remove them again.
  //    Data: { entity, damage, damageTypes, hitLocation, isCrit }
  //
  function applyDamage(data) {
    const state = BattleSystem.getState();
    const target = data.entity;
    const damageTypes = data.damageTypes;

    if (state.isAlive(target) === false) {
      throw new Error(`[${target}] is already dead. Damage should not have been applied.`);
    }

    let actualDamage = 0;
    let killed = false;

    // TODO: The actual damage done will need to be reduced by the armor of the hit location, the character's
    //       resistances to certain damage types. I don't think we need to modify the damageTypes object here,
    //       because once we get the total actual damage that should be all that matters.

    // TODO: How does resistance reduce damage? When rolling to resist an effect we make opposed rolls, so the scales
    //       of the numbers don't matter. However... if a character has 20 resistance (or a -15) resistance to a damage
    //       type that should either reduce (or raise) by a percent or do a flat reduction... A flat reduction would
    //       scale better. Meaning if a character has 20 fire resistance, and took 22 fire damage, they'd actually take
    //       2 damage, or 0 if the damage was less than 20... Seems overly powerful though. Still, I'm not sure how the
    //       resistance values will scale at all. Should effect resistance and damage reduction be two different stats?

    Object.values(damageTypes).forEach(damage => {
      actualDamage += damage;
    });

    if (state.hasStatusEffect(target,'vulnerable')) {
      actualDamage = actualDamage * 2;
    }

    const health = HealthComponent.lookup(target);
    health.currentHealth -= actualDamage;

    if (health.currentHealth <= 0) {
      health.currentHealth = 0;
      killed = true;
      killEntity(target);
    }

    BattleInterface.showDamageEffect({ killed, ...data });
    HealthComponent.update(target, health);

    return actualDamage;
  }

  // TODO: This function is Just a stub for now, but it's situation that will come up.
  function disableEntity(id) {
    throw new Error(`Implement disableEntity()`);
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

    // Dead monsters are deleted after the battle.
    if (isMonster) {
      state.addToDeadPile(id);
    }

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
