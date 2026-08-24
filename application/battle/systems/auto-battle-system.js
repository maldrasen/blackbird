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
    return TargetingController.getMonstersInRange().reduce((closest, monster) => {
      return (closest == null || isCloser(monster, closest)) ? monster : closest;
    }, null);
  }

  // The rank distance is more significant than the position distance, so a monster in the front rank is always
  // closer than one in the back, no matter the column.
  function isCloser(monster, closest) {
    const state = BattleSystem.getState();
    const actingPosition = BattleSystem.getRound().getActingPosition();

    const a = BattleHelper.distanceBetweenPositions(actingPosition, state.getPosition(monster));
    const b = BattleHelper.distanceBetweenPositions(actingPosition, state.getPosition(closest));

    return (a.rank === b.rank) ? a.position < b.position : a.rank < b.rank;
  }

  return {
    takeTurn,
  };

})();
