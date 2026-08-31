global.BattleConsumableSystem = (function() {

  function useConsumable(code) {
    const round = BattleSystem.getRound();
    const consumable = Consumable.lookup(code);

    round.addTime(750);
    addStoryMessage(round, consumable);
    getAffectedEntities(round, consumable).forEach(id => applyEffects(consumable, id));
  }

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

  function applyEffects(consumable, id) {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const weaver = Weaver({ ...round.getContext(), T:id });
    const results = {};

    consumable.getEffects().forEach(effect => {
      if (state.isDown(id)) { return; }
      if (effect.type === 'damage') { results.damage = applyDamage(id, effect); }
      if (effect.type === 'status-effect') { results[effect.code] = applyStatus(id, effect); }
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
