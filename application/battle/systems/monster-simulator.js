global.MonsterSimulator = (function() {

  // TODO: Rather than having a monster defend if no abilities are available a more advanced option would have it move
  //       to a new position that turn. A monster though should only ever be able to move towards the center or a rank
  //       closer. A monster in the middle position in the back could move to the front rank. This behavior should be
  //       determined by the brain. Only a front line fighter should attempt to move to the front. In fact, if a ranged
  //       monster finds themselves in the front rank they should attempt to move behind another monster if there's
  //       space. If no move is possible than they should defend.

  // Executing an ability must return an object in the format { time, messages }

  function executeBattleTurn() {
    const command = pickCommand();
    switch (command) {
      case StandardAbility.basicDefend: return BasicDefend.execute();
      case StandardAbility.basicAttack: return BasicAttack.execute();
      case StandardAbility.hide: return Hide.execute();
      case StandardAbility.sneakAttack: return SneakAttack.execute();
    }

    if (Ability.exists(command)) {
      Ability.lookup(command).execute();
    }
  }

  // When a monster picks a target it first picks the highest threat target from its threat table. If the monster has
  // an action that can hit that target (or an action that doesn't require a target) it returns the target and the
  // highest priority action from the possible actions. If it has nothing that can hit that target, and has no actions
  // that don't require a target, it checks the next highest threat target. If the monster can't hit any target with
  // any action this function returns null, indicating that the monster should just defend this turn.
  function pickCommand() {
    const round = BattleSystem.getRound();
    const characters = getTargetableCharacters();

    while (characters.length > 0) {
      const target = getHighestThreatFrom(round.getActingMonster(), characters);
      round.setTarget(target);

      const possibleCommands = getPossibleCommands();
      if (possibleCommands.length > 0) {
        return possibleCommands[0];
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

  function getPossibleCommands() {
    const round = BattleSystem.getRound();
    const commands = [];

    round.getActingMonster().getPrioritizedAbilities().forEach(ability => {
      if (canUseAbility(ability.code)) { commands.push(ability); }
    });

    return commands.sort((a,b) => { return b.priority - a.priority }).map(a => a.code);
  }

  function canUseAbility(code) {
    switch (code) {
      case StandardAbility.basicAttack: return canUseBasicAttack();
      case StandardAbility.basicDefend: return true;
      case StandardAbility.hide: return canHide();
      case StandardAbility.sneakAttack: return canSneakAttack();
    }

    return Ability.lookup(code).canBeUsed();
  }

  function canUseBasicAttack() {
    const round = BattleSystem.getRound();
    const monster = round.getActingMonster();
    const basicAttack = monster.getBasicAttack();

    if (basicAttack == null) { return false; }

    const p1 = round.getActingPosition();
    const p2 = round.getTargetPosition();
    const baseWeapon = BaseWeapon.lookup(basicAttack.main ? basicAttack.main.base : basicAttack.base);

    return BattleHelper.isAttackWithinRange(baseWeapon.getReach(), p1, p2);
  }

  function canHide() {
    const state = BattleSystem.getState();
    const acting = BattleSystem.getRound().getActing();

    return (state.hasStatusEffect(acting, 'hidden') === false) &&
      state.isInBack(acting) && (Monster(acting).getSkill('stealth') > 0);
  }

  function canSneakAttack() {
    const monster = BattleSystem.getRound().getActingMonster();
    const basicAttack = monster.getBasicAttack();

    return BattleSystem.getState().hasStatusEffect(monster.getEntity(), 'hidden') && (basicAttack != null);
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
    pickCommand,
  });

})();
