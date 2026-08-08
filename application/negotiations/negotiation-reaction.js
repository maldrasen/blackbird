global.NegotiationReaction = (function() {

  const reactionMap = {
    neutral:      { control: 10                                          },
    respect:      { control: 20,                  respect: 30            },
    greatRespect: { control: 50,                  respect: 50,           },
    disrespect:   { control:-20,                  respect:-30,  fear:-20 },
    like:         { control: 20,  affection: 30,  respect: 10,  fear:-10 },
    lust:         { control: 30,  affection: 40,                         },
    love:         { control: 40,  affection: 50,  respect: 20,  fear:-10 },
    dislike:      { control:-20,  affection:-20,                         },
    hate:         { control:-50,  affection:-50,  respect:-50            },
    frighten:     { control: 20,  affection:-10,                fear:30  },
    terrify:      { control: 30,  affection:-20,                fear:50  },
    pity:         { control:-20,                  respect:-20,  fear:-40 },
    contempt:     { control:-50,                  respect:-40,  fear:-60 },
  }

  // The reaction map is separate because so we can associate the type with the feelings without explicitly passing a
  // default.
  const resolutionMap = {
    join:    reactionMap.love,
    attack:  { affection:-40, respect:-20, fear:-30 },
    ability: { affection:-40, respect:-20, fear:-30 },
    run:     { affection:-20, fear:30 },
  };

  const effectKeys = ['flags', 'givePreferences', 'giveStatusEffect', 'rememberThis'];

  // Every reaction shares one canonical shape: type, message, feelings, and the effects applied when the reaction is
  // resolved. The typed extras (a followUp's question, an ability's code) sit alongside them. Any option that isn't
  // an effect is an authoring mistake.
  //
  // resolve() walks contest branches until it lands on a terminal reaction like this one, so here it just returns
  // itself. Applying the reaction's effects is a separate, explicit step for whoever resolved it.
  function buildReaction(type, message, feelings, options, extra={}) {
    const effects = Object.freeze(ObjectHelper.filter(options, effectKeys));

    function validate() {
      const unknown = Object.keys(options).filter(key => effectKeys.includes(key) === false);
      if (unknown.length > 0) {
        throw new Error(`Unknown negotiation reaction option [${unknown.join(', ')}]`);
      }
    }

    // The negotiation questions can tell a story. Depending on how the negotiation plays out it may 'reveal' certain
    // character traits, aspects, or sexual preferences. Because the monsters aren't full characters during a
    // negotiation, mechanically we can just add sexual preferences or aspects to the character as if they were always
    // there.

    // When adding a sexual preference we need to check its requirements. If the preference is incompatible with this
    // character we throw an exception; that's a check that should have happened in the question authoring. Setting a
    // preference to null deletes it.
    function givePreferences(context) {
      Object.entries(effects.givePreferences).forEach(([code,newValue]) => {
        const requires = SexualPreference.lookup(code).getRequires();
        const currentValue = SexualPreferencesComponent.lookup(context.T)[code];

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
    function rememberThis(context) { /* effects.rememberThis */ }

    const reaction = {
      type,
      message,
      feelings,
      effects,
      ...extra,
      resolve: (context) => reaction,
      applyEffects: (context) => {
        if (effects.flags) { NegotiationSystem.getState().setFlags(effects.flags); }
        if (effects.givePreferences) { givePreferences(context); }
        if (effects.giveStatusEffect) { giveStatusEffect(context); }
        if (effects.rememberThis) { rememberThis(context); }
      },
      withFeelings: (newFeelings) => buildReaction(type, message, newFeelings, effects, extra),
    };

    return Object.freeze(reaction);
  }

  function followUp(message, options={}) {
    if (options.question == null) {
      throw new Error(`A followUp reaction must point to a question.`);
    }

    const { question, ...remaining } = options;
    return resolutionReaction('followUp', message, remaining, { question });
  }

  function reactWith(feelings, message, options) {
    return buildReaction('feelings', message, feelings, options);
  }

  function resolutionReaction(type, message, options, extra={}) {
    const { feelings, ...remaining } = options;
    return buildReaction(type, message, (feelings == null) ? resolutionMap[type] : feelings, remaining, extra);
  }

  const methods = {
    getFeelings: code => { return reactionMap[code] },
    attack:   (message, options={}) =>       resolutionReaction('attack', message, options),
    run:      (message, options={}) =>       resolutionReaction('run', message, options),
    ability:  (code, message, options={}) => resolutionReaction('ability', message, options, { code }),
    join:     (message, options={}) =>       resolutionReaction('join', message, options),
    followUp,
    contest: options => NegotiationContest(options),
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = (message, options={}) => reactWith(reactionMap[key], message, options);
  });

  return Object.freeze(methods);

})();
