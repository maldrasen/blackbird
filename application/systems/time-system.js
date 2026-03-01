global.TimeSystem = (function() {

  // TODO: Eventually the time system will be able to check to see if there are
  //   any periodic or scheduled tasks that need to be run. For now though it
  //   only checks the delta time and updates the game time.
  //
  // TODO: We might also want to do things like recover stamina, hit points,
  //   and mana in this function as well. Even if we're in a training scene or
  //   a battle, we still want the recovery tasks to happen every turn. In the
  //   middle of a battle the turn time might be 6 seconds or so, so unless
  //   regeneration is very high it will barely be noticeable in a battle.
  //   Still, I think we need to store stamina, health, and mana values as
  //   floats.
  function run() {
    const deltaTime = StateMachine.getDeltaTime();

    if (deltaTime > 0) {
      GameState.setGameTime(GameState.getGameTime() + deltaTime);
    }

    StateMachine.clearDeltaTime();
  }

  return {
    run
  }

})();