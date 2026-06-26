global.StatusEffectSystem = (function() {

  // Status effects that influence a character's commands need to be removed at the end of the round. A character that
  // gets stunned for instance should lose their next turn, but if a stun effect only lasts a single round, and it's
  // removed before we show the character commands, they never lose the ability to act. The same would be true for
  // effects like silence and blind that should persist during a character's turn.

  function processStartRound() { reduceAllEffectTime('start-of-round'); }
  function processEndRound() { reduceAllEffectTime('end-of-round'); }

  function reduceAllEffectTime(removedAt) {
    const state = BattleSystem.getState();
    const acting = BattleSystem.getRound().getActing();

    Object.values(state.getStatusEffects(acting)).forEach(statusEffect => {
      if (statusEffect.getRemovedAt() === removedAt) {
        reduceEffectTime(state, acting, statusEffect);
      }
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
    processEndRound,
  })

})();