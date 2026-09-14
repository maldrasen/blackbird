global.AutoBattleSystem = (function() {

  // Auto mode isn't intelligent. A character who must pass still passes, otherwise they attack the closest monster
  // they can reach, falling back to defend when no attack is possible.
  function takeTurn() {
    const abilities = CharacterAbilitySystem.getCommands();

    if (abilities.includes(BattleCommandCode.pass)) {
      return Ability.lookup(BattleCommandCode.pass).execute();
    }

    if (abilities.includes(BattleCommandCode.basicAttack)) {
      BattleSystem.getRound().setTarget(closestTarget());
      return Ability.lookup(BattleCommandCode.basicAttack).execute();
    }

    Ability.lookup(BattleCommandCode.basicDefend).execute();
  }

  function closestTarget() {
    const state = BattleSystem.getState();
    const actingPosition = BattleSystem.getRound().getActingPosition();
    const columnDistance = monster => {
      return BattleHelper.distanceBetweenPositions(actingPosition, state.getPosition(monster)).position;
    };

    return TargetingController.getMonstersInRange().reduce((closest, monster) => {
      return (closest == null || columnDistance(monster) < columnDistance(closest)) ? monster : closest;
    }, null);
  }

  return { takeTurn };

})();
