global.NegotiationQuestion = (function() {
  const questions = {};
  const questionReactions = {};
  const propertyWeights = {
    supertype: 1,
    archetype: 5,
    species: 10,
    gender: 15,
    monster: 50,
  }

  function register(code, data) {
    questions[code] = data;
  }

  function registerReaction(code, data) {
    data.weight = 0;

    Object.entries(propertyWeights).forEach(([property,weight]) => {
      if (data[property] != null) { data.weight += weight; }
    });

    reactionsFor(code).push(data);
  }

  function reactionsFor(code) {
    if (questionReactions[code] == null) { questionReactions[code] = []; }
    return questionReactions[code];
  }

  function getAllCodes() {
    return Object.keys(questions);
  }

  function lookup(code) {
    if (questions[code] == null) { throw new Error(`Bad negotiation question code [${code}]`); }

    const question = questions[code];
    const reactions = reactionsFor(code);

    return Object.freeze({
      getCode: () => { return code; },
      getText: () => { return question.text; },
      getAnswers: () => { return question.answers; },
      getReactions: () => { return reactions; }
    });
  }

  return Object.freeze({
    register,
    registerReaction,
    getAllCodes,
    lookup,
  });

})();
