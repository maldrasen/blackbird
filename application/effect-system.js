global.EffectSystem = (function() {

  // An effect source can be a consumable or a spell, both records share the same functions.
  function applyDuringBattle(source) {
    addBattleMessage(source);
    getAffectedEntities(source).forEach(entity => applyToAffected(source, entity));
  }

  // An effect source that can be used in battle should always have a story.
  function addBattleMessage(source) {
    const round = BattleSystem.getRound();
    const context = { ...round.getContext() };

    if (Article.getAllCodes().includes(source.getCode())) { context.I = source.getCode(); }

    round.addMessage({ text:source.pickStory(context) }, Weaver(context));
  }

  function getAffectedEntities(source) {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    const actingIsMonster = state.isMonster(round.getActing());

    switch (source.getTarget()) {
      case EffectTarget.self: return [round.getActing()];
      case EffectTarget.single: return [round.getTarget()];
      case EffectTarget.enemyFormation: return actingIsMonster ? state.getActiveCharacters() : state.getActiveMonsters();
      case EffectTarget.allyFormation: return actingIsMonster ? state.getActiveMonsters() : state.getActiveCharacters();
      case EffectTarget.position: return getEntitiesWithinAreaOfEffect(source);
      default: throw new Error(`Bad effect target [${source.getTarget()}]`);
    }
  }

  function getEntitiesWithinAreaOfEffect(source) {
    const round = BattleSystem.getRound();
    const state = BattleSystem.getState();
    return AreasOfEffect.get(round.getTargetPosition(), source.getAreaOfEffect()).
      map(position => state.getEntityAtPosition(position)).
      filter(entity => entity != null && state.isDown(entity) === false);
  }

  function applyToAffected(source, entity) {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const weaver = Weaver({ ...round.getContext(), T:entity });
    const results = {};

    source.getEffects().forEach(effect => {
      if (state.isDown(entity)) { return; }
      if (effect.type === 'damage') { results.damage = applyDamage(entity, effect); }
      if (effect.type === 'status-effect') { results[effect.code] = applyStatus(entity, effect); }
    });

    const message = source.messageForEntity(entity, results);
    if (message) { round.addMessage({ text:message }, weaver); }

    BattleDamageSystem.addDownedMessage(entity);
  }

  function applyDamage(entity, effect) {
    const damage = Random.rollDice(effect.damage);
    return BattleDamageSystem.applyDamage({ entity:entity, damageTypes:{ [effect.damageType]:damage }});
  }

  function applyStatus(entity, effect) {
    const { type, code, ...values } = effect;
    const resist = ResistRoll(entity, StatusEffectType.lookup(code).getDamageType(), effect.strength);

    if (resist === ResistResult.pass) { return false; }

    BattleSystem.addStatus(entity, code, values);
    return true;
  }

  return {
    applyDuringBattle,
    getAffectedEntities,
  };

})();
