global.MonsterSystem = (function() {

  // TODO: Rather than having a monster defend if no abilities are available a more advanced option would have it move
  //       to a new position that turn. A monster though should only ever be able to move towards the center or a rank
  //       closer. A monster in the middle position in the back could move to the front rank. This behavior should be
  //       determined by the type. Only a front line fighter should attempt to move to the front. In fact, if a ranged
  //       monster finds themselves in the front rank they should attempt to move behind another monster if there's
  //       space. If no move is possible than they should defend.

  function executeBattleTurn() {
    Ability.lookup(pickAbility() || 'basic-defend').execute();
  }

  // When a monster picks a target it first picks the highest threat target from its threat table. If the monster has
  // an action that can hit that target (or an action that doesn't require a target) it returns the target and the
  // highest priority action from the possible actions. If it has nothing that can hit that target, and has no actions
  // that don't require a target, it checks the next highest threat target. If the monster can't hit any target with
  // any action this function returns null, indicating that the monster should just defend this turn.
  function pickAbility() {
    const round = BattleSystem.getRound();
    const characters = getTargetableCharacters();

    while (characters.length > 0) {
      const target = getHighestThreat(round.getActingMonster(), characters);
      round.setTarget(target);

      // It's unlikely that getHighestThreat will ever return null, but it's technically possible, and could be more
      // possible if we add abilities that remove a character's threat. If there's no character with any threat this
      // function returns null and the monster will do a no target action.
      if (target == null) { return null; }

      const possibleAbilities = getPossibleAbilities();
      if (possibleAbilities.length > 0) {
        return possibleAbilities[0];
      }

      round.clearTarget();
      ArrayHelper.remove(characters, target);
    }
  }

  // A character can be targeted if they are alive and are not hidden.
  function getTargetableCharacters() {
    const state = BattleSystem.getState();
    return state.getCharacters().filter(id => state.canBeTargeted(id));
  }

  function getPossibleAbilities() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const abilities = [];

    round.getActingMonster().getPrioritizedAbilities().forEach(ability => {
      if (Ability.lookup(ability.code).canBeUsed() && !state.isOnCooldown(acting, ability.code)) {
        abilities.push(ability);
      }
    });

    return abilities.sort((a,b) => { return b.priority - a.priority }).map(a => a.code);
  }

  // Pick the highest threat monster that is a member of the characters array.
  function getHighestThreat(monster, characters) {
    let threat = 0;
    let target = null;

    Object.entries(monster.getThreatTable()).forEach(([id,th]) => {
      if (characters.includes(id) && th >= threat) {
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
