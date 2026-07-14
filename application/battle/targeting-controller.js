global.TargetingController = (function() {

  // The ability waiting on a target. This is targeting state, not battle state, so it lives here rather than on the
  // round; the round isn't touched until a target is actually committed.
  let pendingAbility;

  function startTargeting(abilityCode) {
    pendingAbility = abilityCode;
    switch(Ability.lookup(abilityCode).getTargetingMode()) {
      case TargetingMode.anyEnemy: return FormationPanel.startTargeting(monsterPositions(getTargetableMonsters()), []);
      case TargetingMode.enemyInWeaponRange: return FormationPanel.startTargeting(monsterPositions(getMonstersInRange()), []);
    }
  }

  // Invoked by the FormationPanel when a valid target is clicked. Ability.execute() sets the ability on the round.
  function targetSelected(position) {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const ability = pendingAbility;

    pendingAbility = null;
    round.setTarget(state.getEntityAtPosition(position));
    Ability.lookup(ability).execute();
  }

  // Invoked by the FormationPanel's back button. Nothing was set on the round, so there's nothing to undo.
  function cancelTargeting() {
    pendingAbility = null;
  }

  // All monsters that can be targeted. A monster can be targeted if it is alive and not hidden.
  function getTargetableMonsters() {
    const state = BattleSystem.getState();
    const monsters = [];

    state.getMonsters().forEach(monster => {
      if (state.canBeTargeted(monster)) {
        monsters.push(monster);
      }
    });

    return monsters;
  }

  function getMonstersInRange() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const position = round.getActingPosition();
    const reach = round.getPrimaryWeapon().reach;

    return getTargetableMonsters().filter(monster =>
      BattleHelper.isAttackWithinRange(reach, position, state.getPosition(monster)));
  }

  function monsterPositions(monsters) {
    const state = BattleSystem.getState();
    return monsters.map(id => state.getPosition(id));
  }

  return Object.freeze({
    startTargeting,
    targetSelected,
    cancelTargeting,
    getMonstersInRange,
  });

})()