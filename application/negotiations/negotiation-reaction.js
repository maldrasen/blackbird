global.NegotiationReaction = (function() {

  const reactionMap = {
    respect: { control:20, respect:10 },
    disrespect: { control:-20, respect:-10, fear:-5 },
    like: { control:10, affection:10, fear:-5 },
    love: { control:20, affection:20, respect:10, fear:-5 },
    dislike: { control:-10, affection:-10, },
    hate: {  control:-20, affection:-20, respect:-10 },
    frightened: { control:10, fear:20 },
  }

  function attack(message, options={}) {

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

  return Object.freeze({
    attack,
    contest,

    // TODO: Add these functions programmatically.
    respect: (message, options={}) => reactWith(reactionMap.respect,message,options),
    disrespect: (message, options={}) => reactWith(reactionMap.disrespect,message,options),

  })


})();


