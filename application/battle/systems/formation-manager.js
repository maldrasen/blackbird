global.FormationManager = (function() {

  // This would overwrite the other entity, so only call this in the case of the death of an entity.
  function moveForwardOnDeath(column) {
    column.side === 'monster' ?
      BattleSystem.getState().setMonsterPosition(column.back.id, column.front.position) :
      BattleSystem.getState().setCharacterPosition(column.back.id, column.front.position);
  }

  return Object.freeze({
    moveForwardOnDeath
  });

})();