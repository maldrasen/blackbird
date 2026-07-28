global.NegotiationReaction = (function() {

  const reactionMap = {
    neutral: {},
    respect: { control:20, respect:10 },
    disrespect: { control:-20, respect:-10, fear:-5 },
    like: { control:10, affection:10, fear:-5 },
    love: { control:20, affection:20, respect:10, fear:-5 },
    dislike: { control:-10, affection:-10, },
    hate: {  control:-20, affection:-20, respect:-10 },
    scare: { control:10, fear:20 },
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
    if (reaction.type !== 'contest') { return reaction; }
    return resolve(winsContest(reaction, context) ? reaction.win : reaction.loss, context);
  }

  function winsContest(reaction, context) {
    if (reaction.random === true) { return Random.flipCoin(); }
    if (reaction.random != null) { return Random.fromFrequencyMap(reaction.random) === 'win'; }
    return attributeContest(reaction.attribute, context);
  }

  function attributeContest(attribute, context) {
    return rollAttribute(context.A, attribute) >= rollAttribute(context.T, attribute);
  }

  function rollAttribute(id, attribute) {
    return Random.roll(AttributesComponent.lookup(id)[attribute]);
  }

  function reactWith(feelings, message) {
    return { type:'feelings', feelings, message };
  }

  const methods = {
    attack:  (message, options={}) => { return { type:'attack', message, options }; },
    run:     (message) =>             { return { type:'run', message }; },
    ability: (code, message) =>       { return { type:'ability', code, message }; },
    contest,
    resolve,
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = message => reactWith(reactionMap[key], message);
  });

  return Object.freeze(methods);

})();
