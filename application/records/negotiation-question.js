global.NegotiationQuestion = (function() {

  const questions = {};
  const reactions = {};
  const propertyWeights = {
    style: 1,
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

    if (reactions[code] == null) { reactions[code] = []; }
    reactions[code].push(data);
  }

  function getAllCodes() {
    return Object.keys(questions);
  }

  function lookup(code) {
    if (questions[code] == null) { throw new Error(`Bad negotiation question code [${code}]`); }

    const question = questions[code];

    // The reaction data for a question will be whatever reaction that's most applicable to the current monster. If a
    // question has no valid responses for the current monster then that's not question that this monster would be
    // asking.
    function getReactionData(context) {
      const validReactions = [];
      const monster = Monster(context.T);

      if (reactions[code] != null) {
        reactions[code].forEach(reactionData => {
          if (matchesTarget(reactionData, monster)) { validReactions.push(reactionData); }
        });
      }

      return validReactions.length > 0 ? validReactions.sort((a,b) => b.weight - a.weight)[0] : null;
    }

    function isPossible(context) {
      return (question.staticRequirements || []).every(requirement => requirement(context));
    }

    function isAvailable(context) {
      return (question.dynamicRequirements || []).every(requirement => requirement(context));
    }

    // Every reaction should have one or more properties to specify what kind of monster it applies to. When there are
    // multiple properties they must all be true for the reaction to be considered valid.
    function matchesTarget(reactionData, monster) {
      let match = true;
      if (reactionData.style != null     && monster.getNegotiationStyle() !== reactionData.style) { match = false; }
      if (reactionData.archetype != null && monster.getArchetype() !== reactionData.archetype)    { match = false; }
      if (reactionData.species != null   && monster.getSpecies() !== reactionData.species)        { match = false; }
      if (reactionData.gender != null    && monster.getGender() !== reactionData.gender)          { match = false; }
      if (reactionData.monster != null   && monster.getCode() !== reactionData.monster)           { match = false; }
      return match;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getText: () => { return question.text; },
      getAnswers: () => { return question.answers; },
      getReactionData,
      isPossible,
      isAvailable,
    });
  }

  return Object.freeze({
    register,
    registerReaction,
    getAllCodes,
    lookup,
  });

})();
