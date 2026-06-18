global.MonsterSimulator = (function() {

  // This function must return an object in the format: { time, messages }
  function executeBattleTurn(id) {
    const monster = Monster(id);
    const targetData = pickTarget(monster);
    const ability = pickAction(targetData);

    if (ability === 'defend') {
      return BasicDefend.execute(id);
    }
    if (ability === 'basic-attack') {
      return BasicAttack.execute(id, targetData.target);
    }
  }

  // When a monster picks a target it first picks the highest threat target from its threat table. If the monster has
  // an action that can hit that target (or an action that doesn't require a target) it returns the target and a list
  // of possible actions. If it has nothing that can hit that target it gets the next highest threat target, and
  // checks them. If the monster can't hit any target with any action this function returns null, indicating that the
  // monster must pass its turn, defending, making rude gestures, jacking off, whatever.
  function pickTarget(monster) {
    const state = BattleSystem.getState();
    const characters = state.getCharacters().filter(id => state.isAlive(id));

    while (characters.length > 0) {
      const target = getHighestThreatFrom(monster, characters);
      const possibleActions = getPossibleActions(state, monster, target);

      if (possibleActions.length > 0) {
        return { target, possibleActions };
      }

      ArrayHelper.remove(characters, target);
    }
  }

  // TODO: Only the basic attacks exist at the moment, but this will need to also loop through all the abilities to
  //       check their ranges. Abilities should use the same 'reach' enum. (So maybe name it something other than
  //       WeaponReach?) We'll need a way to reference the monster's abilities. I think they should just come from a
  //       record though. I don't think abilities will need to have their own components.
  function getPossibleActions(state, monster, target) {
    const monsterPosition = state.getPosition(monster.getEntity());
    const targetPosition = state.getPosition(target);
    const actions = [];

    if (isBasicAttackInRange(monster, monsterPosition, targetPosition)) {
      actions.push('basic-attack')
    }

    return actions;
  }

  function isBasicAttackInRange(monster, p1, p2) {
    const basicAttack = monster.getBasicAttack();
    if (basicAttack == null) { return false; }
    const baseWeapon = BaseWeapon.lookup(basicAttack.main ? basicAttack.main.base : basicAttack.base);
    return BattleHelper.isAttackWithinRange(baseWeapon.getReach(), p1, p2);
  }

  // Target data has a list of possible actions that can be used against the target. This function will be used to
  // decide what action would be the best to use in the situation. This might use the MonsterBrain. The rules might be
  // general enough for a single function like this though. The decisions will largely be based on what abilities are
  // in the action list. A monster with a buff ability should always use it if the buff isn't active. A monster with a
  // heal ability should use it at low health.
  //
  // When there is no action a monster can take it should just defend this turn.
  //
  // A more advanced option would have it move to a new position that turn. A monster though should only ever be able
  // to move towards the center or a rank closer. A monster in the middle position in the back could move to the front
  // rank. This behavior should be determined by the brain. Only a front line fighter should attempt to move to the
  // front. In fact, if a ranged monster finds themselves in the front rank they should attempt to move behind another
  // monster if there's space.
  function pickAction(targetData) {
    if (targetData == null) { return 'defend'; }
    return targetData.possibleActions[0];
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
    pickTarget,
  })

})();
