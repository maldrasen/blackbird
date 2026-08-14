global.RecruitmentSystem = (function() {

  // Promote a battle monster into a permanent member of the player's roster. A monster with a species is already a
  // full character, so recruiting is mostly a matter of shedding its monster wrapper and giving it feelings towards
  // the player. Removing the monster from the battle formation and turn order is the caller's responsibility.
  function recruit(monsterId, { control, affection, fear, respect }) {
    const player = GameSystem.getState().getPlayer();

    FeelingsComponent.create(monsterId, { target:player, affection, fear, respect });
    ControlledComponent.create(monsterId, { control });
    SituatedComponent.create(monsterId, { currentLocation:SpecialLocation.inParty });
    MonsterComponent.destroy(monsterId);

    GameSystem.getState().addToRoster(monsterId);
  }

  return {
    recruit,
  };

})();
