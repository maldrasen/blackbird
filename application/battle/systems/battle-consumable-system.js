global.BattleConsumableSystem = (function() {

  // Using a consumable in battle reads the acting entity and target from the round, tells the consumable's story,
  // then applies its battle effects to every entity caught in the area of effect. Explosions are indiscriminate: a
  // blast catches hidden characters (though it doesn't reveal them), the acting entity's own side, and even the
  // acting entity itself when it's standing in the blast - a kobold absolutely would toss a grenade at its own feet.
  function useConsumable(code) {
    const round = BattleSystem.getRound();
    const consumable = Consumable.lookup(code);

    round.addTime(750);
    addStoryMessage(round, consumable);
    getAffectedEntities(round, consumable).forEach(id => applyEffects(round, consumable, id));
  }

  // The story is woven with the item in the context so that a story shared with the out of combat consume() path can
  // still name the item with an {I} token.
  function addStoryMessage(round, consumable) {
    const context = { ...round.getContext(), I:consumable.getCode() };
    const story = consumable.pickStory(context);

    if (story) { round.addMessage({ text:story }, Weaver(context)); }
  }

  function getAffectedEntities(round, consumable) {
    const state = BattleSystem.getState();

    if (consumable.getTarget() === 'self') { return [round.getActing()]; }
    if (consumable.getTarget() !== 'position') { return [round.getTarget()]; }

    return AreasOfEffect.get(round.getTargetPosition(), consumable.getAreaOfEffect()).
      map(position => state.getEntityAtPosition(position)).
      filter(id => id != null && state.isDown(id) === false);
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

    const message = consumable.messageForEntity(id, results);
    if (message) { round.addMessage({ text:message }, weaver); }

    BattleDamageSystem.addDownedMessage(id);
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
