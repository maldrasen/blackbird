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
  // The contest options also include the win and loss paths, each holding any other built reaction, so a branch can
  // adjust feelings, end the negotiation, or even roll another contest.
  //   win: NegotiationReaction.respect(`...`)
  //   loss: NegotiationReaction.attack(`...`)
  function contest(options) {
    if (options.win == null || options.loss == null) {
      throw new Error(`A negotiation contest needs both a win and a loss reaction.`);
    }
    if (options.random == null && options.attribute == null) {
      throw new Error(`A negotiation contest needs a random or attribute property.`);
    }

    return { type:'contest', ...options };
  }

  function resolve(reaction, context) {
    if (reaction.type === 'contest') {
      return resolve(winsContest(reaction, context) ? reaction.win : reaction.loss, context);
    }
    if (reaction.options) {
      if (reaction.options.flags) { NegotiationSystem.getState().setFlags(reaction.options.flags); }
      if (reaction.options.givePreferences) { givePreferences(reaction.options.givePreferences, context); }
    }
    return reaction;
  }

  function winsContest(reaction, context) {
    if (reaction.random === true) { return Random.flipCoin(); }
    if (reaction.random != null) { return Random.fromFrequencyMap(reaction.random) === 'win'; }
    return attributeContest(reaction.attribute, context);
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
      if (meetsRequirement(context.T, requires) === false) {
        throw new Error(`Sexual preference [${code}] is incompatible with Character[${context.T}]`);
      }
      if (preferences[code] === 0) {
        SexualPreferencesComponent.deletePreference(context.T, code);
      } else {
        SexualPreferencesComponent.update(context.T, { [code]: preferences[code] });
      }
    });
  }

  function meetsRequirement(id, requires) {
    switch (requires) {
      case undefined:          return true;
      case 'breasts':          return Character(id).hasBreasts();
      case 'cock':             return Character(id).hasNormalCock();
      case 'pussy':            return Character(id).hasNormalPussy();
      case 'erogenousCervix':  return SensitivitiesComponent.lookup(id).cervix != null;
      case 'erogenousUrethra': return SensitivitiesComponent.lookup(id).urethra != null;
    }
    throw new Error(`Unknown sexual preference requirement [${requires}]`);
  }

  function reactWith(feelings, message, options) {
    return { type:'feelings', feelings, message, options };
  }

  const methods = {
    attack:  (message, options={}) => { return { type:'attack', message, options }; },
    run:     (message) =>             { return { type:'run', message }; },
    ability: (code, message) =>       { return { type:'ability', code, message }; },
    join:    (message, options={}) => { return { type:'join', message, options }; },
    contest,
    resolve,
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = (message, options={}) => reactWith(reactionMap[key], message, options);
  });

  return Object.freeze(methods);

})();
