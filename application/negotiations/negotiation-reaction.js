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

  const effectKeys = ['flags', 'givePreferences', 'giveStatusEffect'];

  // Every reaction shares one canonical shape: type, message, feelings, and the effects applied when the reaction is
  // resolved. The typed extras (a followUp's question, an ability's code) sit alongside them. Any option that isn't
  // an effect is an authoring mistake.
  //
  // resolve() walks contest branches until it lands on a terminal reaction like this one, so here it just returns
  // itself. Applying the reaction's effects is a separate, explicit step for whoever resolved it.
  function buildReaction(type, message, feelings, options, extra={}) {
    const unknown = Object.keys(options).filter(key => effectKeys.includes(key) === false);
    if (unknown.length > 0) {
      throw new Error(`Unknown negotiation reaction option [${unknown.join(', ')}]`);
    }

    const effects = Object.freeze(ObjectHelper.filter(options, effectKeys));

    const reaction = {
      type,
      message,
      feelings,
      effects,
      ...extra,
      resolve: (context) => reaction,
      applyEffects: (context) => {
        if (effects.flags) { NegotiationSystem.getState().setFlags(effects.flags); }
        if (effects.givePreferences) { givePreferences(effects.givePreferences, context); }
        if (effects.giveStatusEffect) { giveStatusEffect(effects.giveStatusEffect, context); }
      },
      withFeelings: (newFeelings) => buildReaction(type, message, newFeelings, effects, extra),
    };

    return Object.freeze(reaction);
  }

  // A reaction contest will include exactly one property that specifies the contest type.
  //
  // random:(true or freqmap)
  //   A completely random roll. Either a coin toss when { random:true } or using the frequency map like:
  //   { win:10, loss:3 }
  //
  // attribute:(Attribute)
  //   An attribute contest will roll attributes for both characters, deciding who wins based on who rolled the
  //   highest.
  //
  // skill:(Skill code)
  //   A skill contest rolls a SkillCheck for both characters, deciding who wins based on who rolled the highest.
  //   Ties go to the player.
  //
  // The contest options also include the win and loss paths, each holding any other built reaction, so a branch can
  // adjust feelings, end the negotiation, or even roll another contest.
  //   win: NegotiationReaction.respect(`...`)
  //   loss: NegotiationReaction.attack(`...`)
  function contest(options) {
    if (options.win == null || options.loss == null) {
      throw new Error(`A negotiation contest needs both a win and a loss reaction.`);
    }
    if (options.random == null && options.attribute == null && options.skill == null) {
      throw new Error(`A negotiation contest needs a random, attribute, or skill property.`);
    }

    const { win, loss, random, attribute, skill, ...unknown } = options;
    if (Object.keys(unknown).length > 0) {
      throw new Error(`Unknown negotiation contest option [${Object.keys(unknown).join(', ')}]`);
    }

    const reaction = {
      type: 'contest',
      win, loss, random, attribute, skill,
      resolve: (context) => (winsContest(reaction, context) ? win : loss).resolve(context),
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

  function winsContest(reaction, context) {
    if (reaction.random === true) { return Random.flipCoin(); }
    if (reaction.random != null) { return Random.fromFrequencyMap(reaction.random) === 'win'; }
    if (reaction.skill != null) { return skillContest(reaction.skill, context); }
    return attributeContest(reaction.attribute, context);
  }

  function skillContest(skill, context) {
    return SkillCheck(context.P, skill).value >= SkillCheck(context.T, skill).value;
  }

  function attributeContest(attribute, context) {
    return rollAttribute(context.P, attribute) >= rollAttribute(context.T, attribute);
  }

  function rollAttribute(id, attribute) {
    return Random.roll(AttributesComponent.lookup(id)[attribute]);
  }

  // The negotiation questions can tell a story. Depending on how the negotiation plays out it may 'reveal' certain
  // character traits, aspects, or sexual preferences. Because the monsters aren't full characters during a
  // negotiation, mechanically we can just add sexual preferences or aspects to the character as if they were always
  // there.

  // When adding a sexual preference we need to check its requirements. If the preference is incompatible with this
  // character we throw an exception; that's a check that should have happened in the question authoring. Setting a
  // preference to 0 deletes it.
  function givePreferences(preferences, context) {
    Object.keys(preferences).forEach(code => {
      const requires = SexualPreference.lookup(code).getRequires();
      if (Requirements.met(requires, context.T) === false) {
        throw new Error(`Sexual preference [${code}] is incompatible with Character[${context.T}]`);
      }
      if (preferences[code] === 0) {
        SexualPreferencesComponent.deletePreference(context.T, code);
      } else {
        SexualPreferencesComponent.update(context.T, { [code]: preferences[code] });
      }
    });
  }

  function giveStatusEffect({ target, effect, duration }, context) {
    const entity = (target === 'player') ? context.P : context.T;
    BattleSystem.getState().addStatus(BattleStatusEffect(entity, effect, {duration}));
  }

  function reactWith(feelings, message, options) {
    return buildReaction('feelings', message, feelings, options);
  }

  function resolutionReaction(type, message, options, extra={}) {
    const { feelings, ...remaining } = options;
    return buildReaction(type, message, (feelings == null) ? resolutionMap[type] : feelings, remaining, extra);
  }

  const methods = {
    attack:   (message, options={}) =>       resolutionReaction('attack', message, options),
    run:      (message, options={}) =>       resolutionReaction('run', message, options),
    ability:  (code, message, options={}) => resolutionReaction('ability', message, options, { code }),
    join:     (message, options={}) =>       resolutionReaction('join', message, options),
    followUp,
    contest,
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = (message, options={}) => reactWith(reactionMap[key], message, options);
  });

  return Object.freeze(methods);

})();
