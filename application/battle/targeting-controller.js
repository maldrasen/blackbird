global.TargetingController = (function() {

  function startTargeting(abilityCode) {
    BattleSystem.getRound().setAbility(abilityCode);
    switch(Ability.lookup(abilityCode).getTargetingMode()) {
      case TargetingMode.anyEnemy: return targetAnyEnemy();
      case TargetingMode.enemyInWeaponRange: return targetEnemyInWeaponRange();
    }
  }

  function targetAnyEnemy() {
    FormationPanel.startTargeting(monsterPositions(getTargetableMonsters()), [], position => {
      executeWithTargetAt(position);
    }, cancelTargeting);
  }

  function targetEnemyInWeaponRange() {
    FormationPanel.startTargeting(monsterPositions(getMonstersInRange()), [], position => {
      executeWithTargetAt(position);
    }, cancelTargeting);
  }

  // When the player backs out of targeting we clear the ability set in startTargeting() so a different command can be
  // selected without tripping the round's "ability already set" guard.
  function cancelTargeting() {
    BattleSystem.getRound().clearAbility();
  }

  function executeWithTargetAt(position) {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    round.setTarget(state.getEntityAtPosition(position));
    Ability.lookup(round.getAbility()).execute();
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
    getMonstersInRange,
  });

})()