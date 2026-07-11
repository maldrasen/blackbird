// A negotiation opening collects the questions a monster can be asked, resolving the single winning reaction for
// each one. The most specific matching reaction takes a question outright; a tie within the same specificity goes to
// the first registered so resolution stays deterministic. Authors should partition same-specificity reactions with
// requires instead of leaning on this. A question with no matching reaction is dropped from the opening.
global.NegotiationOpening = function(context) {

  const questions = [];

  NegotiationQuestion.getAllCodes().forEach(questionCode => {
    const reaction = winningReaction(NegotiationQuestion.lookup(questionCode));
    if (reaction) {
      questions.push({ questionCode, reaction });
    }
  });

  function winningReaction(question) {
    let winner;

    question.getReactions().forEach(reaction => {
      if (matches(reaction) && (winner == null || beats(reaction,winner))) { winner = reaction; }
    });

    return winner;
  }

  function matches(reaction) {
    return matchesTarget(reaction) && meetsRequirements(reaction);
  }

  function matchesTarget(reaction) {
    if (reaction.monster != null) { return Monster(context.T).getBaseMonster().getCode() === reaction.monster; }
    if (reaction.species != null) { return Monster(context.T).getSpecies() === reaction.species; }
    if (reaction.archetype != null) { return Personality(context.T).getArchetype() === reaction.archetype; }
    return Archetype.lookup(Personality(context.T).getArchetype()).getSupertype() === reaction.supertype;
  }

  function meetsRequirements(reaction) {
    if (reaction.requires == null) { return true; }
    return [].concat(reaction.requires).every(requirement => requirement(context));
  }

  function beats(challenger,current) {
    return specificity(challenger) < specificity(current);
  }

  function specificity(reaction) {
    return NegotiationQuestion.MATCH_KEYS.findIndex(key => reaction[key] != null);
  }

  return Object.freeze({
    getQuestions: () => { return questions },
  });

}
