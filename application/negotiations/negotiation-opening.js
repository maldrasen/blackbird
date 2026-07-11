global.NegotiationOpening = function(monsterId) {


  const questions = [];
  const responses = [];

  return Object.freeze({
    getQuestions: () => { return questions; },
    getResponses: () => { return responses; },
  });

}