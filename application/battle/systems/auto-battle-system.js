global.AutoBattleSystem = (function() {

  // Auto mode isn't intelligent. A character who must pass still passes, otherwise they attack the closest monster
  // they can reach, falling back to defend when no attack is possible.
  function takeTurn() {
    const abilities = CharacterAbilitySystem.getAbilities();

    if (abilities.includes(BattleCommand.pass)) {
      return Ability.lookup(BattleCommand.pass).execute();
    }

    if (abilities.includes(BattleCommand.basicAttack)) {
      BattleSystem.getRound().setTarget(closestTarget());
      return Ability.lookup(BattleCommand.basicAttack).execute();
    }

    Ability.lookup(BattleCommand.basicDefend).execute();
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
