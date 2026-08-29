global.BattleConsumableSystem = (function() {

  // Using a consumable in battle reads the acting entity and target from the round, tells the consumable's story,
  // then applies its battle effects to every entity caught in the area of effect. Explosions are indiscriminate: a
  // blast catches hidden characters (though it doesn't reveal them) and the acting entity's own side, but the acting
  // entity is never caught in its own blast - nobody lobs a grenade at their own feet.
  function useConsumable(code) {
    const round = BattleSystem.getRound();
    const consumable = Consumable.lookup(code);

    round.addMessage({ text:consumable.pickStory(round.getContext()) });
    getAffectedEntities(round, consumable).forEach(id => applyEffects(round, consumable, id));
  }

  function getAffectedEntities(round, consumable) {
    const state = BattleSystem.getState();

    if (consumable.getTarget() !== 'position') { return [round.getTarget()]; }

    return AreasOfEffect.get(round.getTargetPosition(), consumable.getAreaOfEffect()).
      map(position => state.getEntityAtPosition(position)).
      filter(id => id != null && id !== round.getActing() && state.isDown(id) === false);
  }

  // The effects are applied in their authored order, and an effect that downs the victim stops the rest - the dead
  // can't be blinded. The victim's own weaver carries the messages because the round context can only name the
  // acting entity and the primary target, and most of the entities in a blast are neither.
  function applyEffects(round, consumable, id) {
    const state = BattleSystem.getState();
    const weaver = Weaver({ A:id });
    const results = {};

    consumable.getBattleEffects().forEach(effect => {
      if (state.isDown(id)) { return; }
      if (effect.type === 'damage') { results.damage = applyDamage(id, effect); }
      if (effect.type === 'status') { results[effect.code] = applyStatus(id, effect); }
    });

    round.addMessage({ text:consumable.messageForEntity(id, results) }, weaver);

    if (state.isKnockedOut(id)) {
      round.addMessage({ text:`{A:ActingName} was knocked out!`, color:'important' }, weaver);
    } else if (state.isAlive(id) === false) {
      round.addMessage({ text:`{A:ActingName} was killed!`, color:'important' }, weaver);
    }
  }

  function applyDamage(id, effect) {
    const damage = Random.rollDice(effect.damage);
    return BattleDamageSystem.applyDamage({ entity:id, damageTypes:{ [effect.damageType]:damage }});
  }

  function applyStatus(id, effect) {
    const { type, code, ...values } = effect;
    const resist = ResistRoll(id, StatusEffectType.lookup(code).getDamageType(), effect.strength);

    if (resist === ResistResult.pass) { return false; }

    BattleSystem.addStatus(id, code, values);
    return true;
  }

  return {
    useConsumable,
  };

})();
