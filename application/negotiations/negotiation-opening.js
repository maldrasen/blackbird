global.NegotiationOpening = function(monsterId) {
  const questions = [];

  NegotiationQuestion.getAllCodes().forEach(questionCode => {
    const reaction = mostFittingReaction(NegotiationQuestion.lookup((questionCode)));
    if (reaction) {
      questions.push({ questionCode, reaction });
    }
  });

  function mostFittingReaction(question) {
    let fitting;

    question.getReactions().forEach(reaction => {
      if (fitting == null || beats(question,reaction)) { fitting = reaction; }
    });

    return fitting;
  }

  function beats(question, reaction) {
    return true;
  }

  // Resolves the single winning reaction for each question the monster in the context can be asked. The most specific
  // matching reaction takes a question outright; a tie within the same specificity is broken by code so resolution
  // stays deterministic. Authors should partition same-specificity reactions with requires instead of leaning on this.
  // function resolve(context) {
  //   const winners = {};
  //   getMatching(context).forEach(reaction => {
  //     const current = winners[reaction.getQuestion()];
  //     if (current == null || beats(reaction,current)) { winners[reaction.getQuestion()] = reaction; }
  //   });
  //   return winners;
  // }
  //
  // function getMatching(context) {
  //   return getAllCodes().map(lookup).filter(reaction => reaction.matches(context));
  // }
  //
  // function beats(challenger,current) {
  //   if (challenger.getSpecificity() !== current.getSpecificity()) {
  //     return challenger.getSpecificity() < current.getSpecificity();
  //   }
  //   return challenger.getCode() < current.getCode();
  // }

  return Object.freeze({
    getQuestions: () => { return questions },
  });

}
