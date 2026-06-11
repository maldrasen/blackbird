global.FormationManager = (function() {

  // This would overwrite the other entity, so only call this in the case of the death of an entity.
  function moveForwardOnDeath(column) {
    column.side === 'monster' ?
      BattleSystem.getState().setMonsterPosition(column.back.id, column.front.position) :
      BattleSystem.getState().setCharacterPosition(column.back.id, column.front.position);
  }

  // We only force monsters into the center, so unlike moving forward we can ignore the character formation.
  // Call the BattleInterface with a summary of who is moving where.
  function moveInwardOnDeath(columnIndex) {
    const state = BattleSystem.getState();
    const formation = state.getMonsterFormation();
    const moves = [];

    function gatherMoves(from, to) {
      if (formation[`0.${from}`]) { moves.push({ id:formation[`0.${from}`], to:`0.${to}` }); }
      if (formation[`1.${from}`]) { moves.push({ id:formation[`1.${from}`], to:`1.${to}` }); }
    }

    if (columnIndex === 0 || columnIndex === 4) { return; }
    if (columnIndex === 1) { gatherMoves(0,1) }
    if (columnIndex === 3) { gatherMoves(4,3) }

    if (columnIndex === 2) {
      if (countLeft(formation) >= countRight(formation)) {
        gatherMoves(1,2);
        gatherMoves(0,1);
      } else {
        gatherMoves(3,2);
        gatherMoves(4,3);
      }
    }

    if (moves.length > 0) {
      BattleInterface.moveInwardOnDeath(moves);
      moves.forEach(move => {
        state.setMonsterPosition(move.id, move.to);
      });
    }
  }

  function countLeft(formation) {
    let count = 0;
    if (formation['0.0']) { count++ }
    if (formation['1.0']) { count++ }
    if (formation['0.1']) { count++ }
    if (formation['1.1']) { count++ }
    return count;
  }

  function countRight(formation) {
    let count = 0;
    if (formation['0.3']) { count++ }
    if (formation['1.3']) { count++ }
    if (formation['0.4']) { count++ }
    if (formation['1.5']) { count++ }
    return count;
  }


  return Object.freeze({
    moveForwardOnDeath,
    moveInwardOnDeath,
  });

})();