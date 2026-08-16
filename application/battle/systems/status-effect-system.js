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

  // Effects with an interval act on their own schedule, independent of their victim's actions, so applying one adds
  // an entry to the battle turn order. A renewed effect keeps its pending tick: rescheduling here would let anything
  // that reapplies the effect as often as it ticks push the tick out forever. Fixed time effects schedule their
  // removal instead, and there a renewal does reschedule - reapplying a timed effect extends it.
  function scheduleTick(entity, code) {
    const state = BattleSystem.getState();
    const component = StatusEffects(entity).get(code);

    if (StatusEffectType.lookup(code).getDurationType() === StatusEffectDurationType.fixedTime) {
      return scheduleRemoval(state, entity, code, component);
    }

    if (state.hasTurnOrderEntry({ type:'status', id:entity, code })) { return; }

    const interval = getInterval(component);

    if (interval == null) { return; }

    state.setTurnOrder({ type:'status', id:entity, code, time:state.getNext().time + interval });
  }

  function scheduleRemoval(state, entity, code, component) {
    if (component.duration == null) { return; }
    state.setTurnOrder({ type:'status', id:entity, code, time:state.getNext().time + component.duration });
  }

  function getInterval(component) {
    return component.interval != null ? component.interval : StatusEffectType.lookup(component.code).getInterval();
  }

  // Triggered when a status effect's turn order entry comes up. The entry is never popped from the turn order, so
  // every path through here has to either reschedule it or see it removed, or the same tick dispatches forever.
  // Damage can kill or knock out the victim, and the death system sweeps their status entries, so the reschedule
  // only happens while they're still standing.
  function processTick(entry) {
    const victim = entry.id;
    const component = StatusEffects(victim).get(entry.code);
    const type = StatusEffectType.lookup(entry.code);

    if (type.getDurationType() === StatusEffectDurationType.fixedTime) { return expireEffect(victim, type); }

    applyTickDamage(victim, component);

    if (BattleSystem.getState().isDown(victim)) { return; }
    if (resistsEffect(victim, component)) { return; }

    entry.time += getInterval(component);
    BattleSystem.getState().setTurnOrder(entry);
  }

  // Each trigger of an until-resisted effect gives the victim a fresh chance to shrug it off, rolled against the
  // strength the effect was applied with. Passing ends the effect before it can do that tick's damage, and removing
  // it clears the effect's turn order entry.
  function resistsEffect(victim, component) {
    const type = StatusEffectType.lookup(component.code);

    if (type.getDurationType() !== StatusEffectDurationType.untilResisted) { return false; }
    if (component.strength == null) { return false; }
    if (ResistRoll(victim, type.getDamageType(), component.strength) === ResistResult.fail) { return false; }

    BattleSystem.getRound().addMessage({ text:`{A:ActingName} shakes off the {S/nst}${type.getName()}{/S}.` });
    BattleSystem.removeStatus(victim, component.code);
    return true;
  }

  // A fixed time effect's turn order entry is its removal time, not a periodic trigger, so when it comes up the
  // effect simply ends. Removal clears the entry.
  function expireEffect(victim, type) {
    BattleSystem.getRound().addMessage({ text:`{A:ActingName's} {S/nst}${type.getName()}{/S} fades.` });
    BattleSystem.removeStatus(victim, type.getCode());
  }

  function applyTickDamage(victim, component) {
    if (component.damage == null) { return; }

    const type = StatusEffectType.lookup(component.code);
    const damage = Random.rollDice(component.damage);
    const actual = BattleDamageSystem.applyDamage({ entity:victim, damageTypes:{ [type.getDamageType()]:damage }});

    BattleSystem.getRound().addMessage({ text:`{A:ActingName} takes ${actual} damage from {S/nst}${type.getName()}{/S}.` });
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
    scheduleTick,
    processTick,
    consumeStack,
  };

})();
