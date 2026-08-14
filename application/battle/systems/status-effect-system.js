global.StatusEffectSystem = (function() {

  // Status effects that influence a character's commands need to be removed at the end of the round. A character that
  // gets stunned for instance should lose their next turn, but if a stun effect only lasts a single round, and it's
  // removed before we show the character commands, they never lose the ability to act. The same would be true for
  // effects like silence and blind that should persist during a character's turn.

  function processStartRound() { reduceAllEffectTime('start-of-round'); }
  function processEndRound() { reduceAllEffectTime('end-of-round'); }

  function reduceAllEffectTime(removedAt) {
    const acting = BattleSystem.getRound().getActing();

    StatusEffectComponent.of(acting).forEach(id => {
      const statusEffect = StatusEffectComponent.lookup(id);
      if (StatusEffectType.lookup(statusEffect.code).getRemovedAt() === removedAt) {
        reduceEffectTime(acting, statusEffect);
      }
    });
  }

  // Reduce the remaining turn count of turn based status effects, removing them at the start of the turn if this is
  // their last turn. Because this can remove status effects this should be run last.
  function reduceEffectTime(acting, statusEffect) {
    if (StatusEffectType.lookup(statusEffect.code).getDurationType() === StatusEffectDurationType.turnCount) {
      consumeStack(acting, statusEffect.code);
    }
  }

  // A stack is consumed when the effect triggers, or in the case of turn based effects, when a turn passes. Consuming
  // the last stack removes the effect. Removal goes through the battle system so the combatant view is refreshed.
  function consumeStack(entity, code) {
    const id = StatusEffectComponent.of(entity).find(id => StatusEffectComponent.lookup(id).code === code);
    const count = StatusEffectComponent.lookup(id).count;

    (count > 1) ?
      StatusEffectComponent.update(id, { count:count - 1 }) :
      BattleSystem.removeStatus(entity, code);
  }

  return {
    processStartRound,
    processEndRound,
    consumeStack,
  };

})();
