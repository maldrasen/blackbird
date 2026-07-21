global.FormationManager = (function() {

  // This would overwrite the other entity, so only call this in the case of the death of an entity. Repositioning
  // during a battle normally reverts afterwards, but a move forced by a death persists in the party configuration.
  function moveForwardOnDeath(column) {
    moveForward(column, true);
  }

  // A knock-out only vacates the front rank for the rest of the battle, so the move forward stays in the transient
  // battle formation. The knocked out character keeps their party configuration position for their revival.
  function moveForwardOnKnockOut(column) {
    moveForward(column, false);
  }

  function moveForward(column, persist) {
    const state = BattleSystem.getState();
    const moving = column.back.id;
    state.removeFromFormation(column.front.id);
    state.setPosition(moving, column.front.position);

    if (persist && column.side === 'party') {
      PartyConfiguration.setCharacter(moving, column.front.position);
    }

    if (state.hasStatusEffect(moving, 'hidden')) {
      state.removeStatus(moving, 'hidden');
    }
  }

  // We only force monsters into the center, so unlike moving forward we can ignore the character formation.
  // Call the BattleInterface with a summary of who is moving where.
  function moveInwardOnDeath(columnIndex) {
    const state = BattleSystem.getState();
    const formation = ObjectHelper.reverse(state.getMonsterFormation());
    const moves = [];

    function gatherMoves(from, to) {
      if (formation[`M.0.${from}`]) { moves.push({ id:formation[`M.0.${from}`], to:`M.0.${to}` }); }
      if (formation[`M.1.${from}`]) { moves.push({ id:formation[`M.1.${from}`], to:`M.1.${to}` }); }
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
        state.setPosition(move.id, move.to);
      });
    }
  }

  function countLeft(formation) {
    let count = 0;
    if (formation['M.0.0']) { count++ }
    if (formation['M.1.0']) { count++ }
    if (formation['M.0.1']) { count++ }
    if (formation['M.1.1']) { count++ }
    return count;
  }

  function countRight(formation) {
    let count = 0;
    if (formation['M.0.3']) { count++ }
    if (formation['M.1.3']) { count++ }
    if (formation['M.0.4']) { count++ }
    if (formation['M.1.4']) { count++ }
    return count;
  }


  return Object.freeze({
    moveForwardOnDeath,
    moveForwardOnKnockOut,
    moveInwardOnDeath,
  });

})();