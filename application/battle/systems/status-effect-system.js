global.StatusEffectSystem = (function() {

  function processStartTurn(id) {
    const state = BattleSystem.getState();
    Object.values(state.getStatusEffects(id)).forEach(statusEffect => {
      reduceEffectTime(state, id, statusEffect);
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
    processStartTurn,
  })

})();