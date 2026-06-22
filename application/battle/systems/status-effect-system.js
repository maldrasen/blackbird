global.StatusEffectSystem = (function() {

  function processStartRound() {
    const state = BattleSystem.getState();
    const acting = BattleSystem.getRound().getActing();

    Object.values(state.getStatusEffects(acting)).forEach(statusEffect => {
      reduceEffectTime(state, acting, statusEffect);
    });
  }

  // Reduce the duration of turn based status effects, removing them at the start of the turn if this is their last
  // turn. Because this can remove status effects this should be run last.
  function reduceEffectTime(state, id, statusEffect) {
    const duration = statusEffect.getDuration();

    if (statusEffect.getDurationType() === StatusEffectDurationType.turnCount) {
      (duration > 1) ?
        statusEffect.setDuration(duration - 1) :
        state.removeStatus(id, statusEffect.getCode());
    }
  }

  return Object.freeze({
    processStartRound,
  })

})();