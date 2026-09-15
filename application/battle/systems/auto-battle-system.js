global.AutoBattleSystem = (function() {

  // Auto mode isn't intelligent. A character who must pass still passes, otherwise they attack the closest monster
  // they can reach, falling back to defend when no attack is possible.
  function takeTurn() {
    const commands = CharacterAbilitySystem.getCommands();

    if (commands.includes(StandardAbility.pass)) {
      return BattleCommand.lookup(StandardAbility.pass).execute();
    }

    if (commands.includes(StandardAbility.attack)) {
      BattleSystem.getRound().setTarget(closestTarget());
      return BattleCommand.lookup(StandardAbility.attack).execute();
    }

    BattleCommand.lookup(StandardAbility.defend).execute();
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
