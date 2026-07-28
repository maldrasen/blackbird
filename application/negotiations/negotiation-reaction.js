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

  // TODO: End the negotiation and do a basic attack. I think it's fair to say that every monster that can be
  //       negotiated with will have a basic attack. We can specify a specific attack in the options as well, in case
  //       a specific monster might try to use a bite attack or something instead.
  function attack(message, options={}) {
    throw new Error(`TODO: End negotiation and monster uses basic attack.`);
  }

  // TODO: Need to implement the run away command first.
  function run(message) {
    throw new Error(`TODO: End negotiation and monster attempts to run away.`);
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

  }

  function reactWith(emotions, message, options) {

  }

  const methods = {
    attack,
    run,
    contest
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = (message, options={}) => reactWith(reactionMap[key], message, options);
  });

  return Object.freeze(methods);

})();


