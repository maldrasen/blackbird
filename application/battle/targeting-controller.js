global.TargetingController = (function() {

  // The command waiting on a target, with whatever its overlay chose. This is targeting state, not battle state, so
  // it lives here rather than on the round; the round isn't touched until a target is actually committed.
  let pending;

  function startTargeting(command, data={}) {
    pending = { command, data };

    switch(command.buildAbility(data).getTargetingMode()) {
      case TargetingMode.anyEnemy: return BattleInterface.startTargeting(monsterPositions(getTargetableMonsters()), []);
      case TargetingMode.enemyInWeaponRange: return BattleInterface.startTargeting(monsterPositions(getMonstersInRange()), []);
    }
  }

  // Invoked by the FormationPanel when a valid target is clicked.
  function targetSelected(position) {
    const { command, data } = pending;

    pending = null;
    BattleSystem.getRound().setTarget(BattleSystem.getState().getEntityAtPosition(position));
    command.execute(data);
  }

  // Invoked by the FormationPanel's back button. Nothing was set on the round, so there's nothing to undo.
  function cancelTargeting() {
    pending = null;
  }

  // All monsters that can be targeted. A monster can be targeted if it is alive and not hidden.
  function getTargetableMonsters() {
    const state = BattleSystem.getState();
    return state.getActiveMonsters().filter(monster => state.canBeTargeted(monster));
  }

  function getMonstersInRange() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const position = round.getActingPosition();
    const reach = round.getPrimaryWeapon().getBaseWeapon().getReach();

    return getTargetableMonsters().filter(monster =>
      BattleHelper.isAttackWithinRange(reach, position, state.getPosition(monster)));
  }

  function monsterPositions(monsters) {
    const state = BattleSystem.getState();
    return monsters.map(id => state.getPosition(id));
  }

  return {
    startTargeting,
    targetSelected,
    cancelTargeting,
    getTargetableMonsters,
    getMonstersInRange,
  };

})()
