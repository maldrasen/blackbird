global.NegotiationOpening = function(monsterId) {
  const monster = Monster(monsterId);
  const baseMonster = monster.getBaseMonster().getCode();
  const gender = monster.getGender();
  const species = monster.getSpecies();
  const archetype = monster.getArchetype();
  const supertype = Archetype.lookup(archetype).getSupertype();
  const questions = [];

  NegotiationQuestion.getAllCodes().forEach(questionCode => {
    const reaction = mostFittingReaction(NegotiationQuestion.lookup(questionCode));
    if (reaction) {
      questions.push({ questionCode, reaction });
    }
  });

  // The most fitting reaction to a question is the reaction with the highest weight of the currently valid reactions.
  function mostFittingReaction(question) {
    return question.getReactions().filter(isValid).sort((a,b) => b.weight - a.weight)[0];
  }

  function isValid(reaction) {
    return matchesTarget(reaction) && meetsRequirements(reaction);
  }

  // Every reaction should have one or more properties to specify what kind of monster it applies to. When there are
  // multiple properties they must all be true for the reaction to be considered valid.
  function matchesTarget(reaction) {
    let match = true;
    if (reaction.gender != null    && gender !== reaction.gender)       { match = false; }
    if (reaction.monster != null   && baseMonster !== reaction.monster) { match = false; }
    if (reaction.species != null   && species !== reaction.species)     { match = false; }
    if (reaction.archetype != null && archetype !== reaction.archetype) { match = false; }
    if (reaction.supertype != null && supertype !== reaction.supertype) { match = false; }
    return match;
  }

  function meetsRequirements(reaction) {
    if (reaction.requires == null) { return true; }
    return [].concat(reaction.requires).every(requirement => requirement(monster));
  }

  return Object.freeze({
    getQuestions: () => { return questions },
  });
}
