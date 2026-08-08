global.Resolution = function(type, message, feelings, options={}) {
  const effectKeys = ['flags', 'givePreferences', 'giveStatusEffect', 'rememberThis'];
  const effects = Object.freeze(ObjectHelper.filter(options, effectKeys));
  const extras = ObjectHelper.filter(options, ['question', 'code']);

  const unknown = Object.keys(options).filter(key => [...effectKeys, 'question', 'code', 'feelings'].includes(key) === false);
  if (unknown.length > 0) {
    throw new Error(`Unknown negotiation reaction option [${unknown.join(', ')}]`); }

  if (type === 'followUp' && extras.question == null) {
    throw new Error(`A followUp reaction must point to a question.`); }

  if (type === 'ability' && extras.code == null) {
    throw new Error(`An ability reaction must have an ability code.`); }

  // The negotiation questions can tell a story. Depending on how the negotiation plays out it may 'reveal' certain
  // character traits, aspects, or sexual preferences. Because the monsters aren't full characters during a
  // negotiation, mechanically we can just add sexual preferences or aspects to the character as if they were always
  // there.
  //
  // When adding a sexual preference we need to check its requirements. If the preference is incompatible with this
  // character we throw an exception; that's a check that should have happened in the question authoring. Setting a
  // preference to null deletes it.
  function givePreferences(context) {
    Object.entries(effects.givePreferences).forEach(([code, value]) => {
      const requires = SexualPreference.lookup(code).getRequires();
      const currentValue = SexualPreferencesComponent.lookup(context.T)[code];
      const newValue = (value == null) ? null : (value-5) + Random.roll(11);

      if (Requirements.met(requires, context.T) === false) {
        throw new Error(`Sexual preference [${code}] is incompatible with Character[${context.T}]`);
      }
      if (newValue > 0 && (currentValue == null || currentValue < newValue)) {
        SexualPreferencesComponent.update(context.T, { [code]: newValue });
      }
      if (newValue < 0 && (currentValue == null || currentValue > newValue)) {
        SexualPreferencesComponent.update(context.T, { [code]: newValue });
      }
      if (newValue == null) {
        SexualPreferencesComponent.deletePreference(context.T, code);
      }
    });
  }

  function giveStatusEffect(context) {
    const { target, effect, duration } = effects.giveStatusEffect;
    const entity = (target === 'player') ? context.P : context.T;
    BattleSystem.getState().addStatus(BattleStatusEffect(entity, effect, {duration}));
  }

  // TODO: Stub. The character referenced by the context key should remember what happened to them here. How they
  //       feel about it depends on personality and relationship work that hasn't been built yet, so for now the
  //       memory data is simply discarded. The properties besides key are arbitrary data describing the moment.
  //       This should reference effects.rememberThis
  function rememberThis(context) {}

  const reaction = {
    type,
    message,
    feelings,
    effects,
    ...extras,
    resolve: (context) => reaction,
    applyEffects: (context) => {
      if (effects.flags) { NegotiationSystem.getState().setFlags(effects.flags); }
      if (effects.givePreferences) { givePreferences(context); }
      if (effects.giveStatusEffect) { giveStatusEffect(context); }
      if (effects.rememberThis) { rememberThis(context); }
    },
    withFeelings: (newFeelings) => Resolution(type, message, newFeelings, { ...effects, ...extras }),
  };

  return Object.freeze(reaction);
}
