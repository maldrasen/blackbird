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

  // Ends the negotiation and the monster attacks. Every monster that can be negotiated with should have a basic
  // attack, but options.ability can specify a different attack for a specific monster.
  function attack(message, options={}) {
    return { type:'attack', message, options };
  }

  // Ends the negotiation and the monster attempts to run away.
  function run(message) {
    return { type:'run', message };
  }

  function useAbility(code, message) {
    return { type:'ability', message };
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
  // The contest options will also include the win and loss paths with the arguments for the reactWith() function
  //   win: { reaction, message, options }
  //   loss: { reaction, message, options }
  function contest(options) {
    return { type:'contest', ...options };
  }

  function reactWith(feelings, message) {
    return { type:'feelings', feelings, message };
  }

  const methods = {
    attack,
    run,
    contest,
    useAbility,
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = message => reactWith(reactionMap[key], message);
  });

  return Object.freeze(methods);

})();


