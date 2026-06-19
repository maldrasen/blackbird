global.MonsterSimulator = (function() {

  // TODO: Rather than having a monster defend if no abilities are available a more advanced option would have it move
  //       to a new position that turn. A monster though should only ever be able to move towards the center or a rank
  //       closer. A monster in the middle position in the back could move to the front rank. This behavior should be
  //       determined by the brain. Only a front line fighter should attempt to move to the front. In fact, if a ranged
  //       monster finds themselves in the front rank they should attempt to move behind another monster if there's
  //       space. If no move is possible than they should defend.

  // Executing an ability must return an object in the format { time, messages }

  function executeBattleTurn(id) {
    const monster = Monster(id);
    const { target, ability } = pickAbility(monster);

    if (ability == null) {
      return BasicDefend.execute(id);
    }

    switch (ability) {
      case 'defend': return BasicDefend.execute(id);
      case 'basic-attack': return BasicAttack.execute(id, target);
      case 'hide': return Hide.execute(id);
      case 'sneak-attack': return SneakAttack.execute(id, target);
      default: throw new Error(`Failed to execute ability ${ability}`);
    }
  }

  // When a monster picks a target it first picks the highest threat target from its threat table. If the monster has
  // an action that can hit that target (or an action that doesn't require a target) it returns the target and the
  // highest priority action from the possible actions. If it has nothing that can hit that target, and has no actions
  // that don't require a target, it checks the next highest threat target. If the monster can't hit any target with
  // any action this function returns null, indicating that the monster should just defend this turn.
  function pickAbility(monster) {
    const state = BattleSystem.getState();
    const characters = state.getCharacters().filter(id => state.isAlive(id));

    while (characters.length > 0) {
      const target = getHighestThreatFrom(monster, characters);
      const possibleActions = getPossibleActions(state, monster, target);

      if (possibleActions.length > 0) {
        return { target, ability:possibleActions[0] };
      }

      ArrayHelper.remove(characters, target);
    }
  }

  function getPossibleActions(state, monster, target) {
    const actions = [];
    const environment = { state, monster, target,
      monsterPosition: state.getPosition(monster.getEntity()),
      targetPosition: state.getPosition(target),
    };

    monster.getBrain().getPrioritizedAbilities().forEach(abilityCode => {
      if (canUseAbility(abilityCode, environment)) {
        actions.push(abilityCode);
      }
    });

    return actions;
  }

  function canUseAbility(ability, environment) {
    switch (ability) {
      case 'basic-attack': return canUseBasicAttack(environment);
      case 'hide': return canHide(environment);
      case 'sneak-attack': return canSneakAttack(environment);
      default: throw new Error(`Can a monster use ${ability}?`);
    }
  }

  function canUseBasicAttack(environment) {
    const monster = environment.monster;
    const p1 = environment.monsterPosition;
    const p2 = environment.targetPosition;
    const basicAttack = monster.getBasicAttack();
    if (basicAttack == null) { return false; }
    const baseWeapon = BaseWeapon.lookup(basicAttack.main ? basicAttack.main.base : basicAttack.base);
    return BattleHelper.isAttackWithinRange(baseWeapon.getReach(), p1, p2);
  }

  function canHide(environment) {
    const state = environment.state;
    const monster = environment.monster;
    const id = monster.getEntity();

    return (state.hasStatusEffect(id, 'hidden') === false) &&
      state.isInBack(id) && (monster.getSkill('stealth') > 0);
  }

  function canSneakAttack(environment) {
    const state = environment.state;
    const monster = environment.monster;
    const basicAttack = monster.getBasicAttack();

    return state.hasStatusEffect(monster.getEntity(), 'hidden') && (basicAttack != null);
  }

  // Pick the highest threat monster that is a member of the characters array.
  function getHighestThreatFrom(monster, characters) {
    let threat = 0;
    let target = null;

    Object.entries(monster.getThreatTable()).forEach(([id,th]) => {
      if (characters.includes(id) && th > threat) {
        threat = th;
        target = id;
      }
    });

    return target;
  }

  return Object.freeze({
    executeBattleTurn,
    pickAbility,
  });

})();
