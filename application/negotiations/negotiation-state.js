global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getMonsters().find(id => battleState.isAlive(id));
  const context = { A:GameSystem.getState().getPlayer(), T:monster };
  const opening = NegotiationOpening(monster);
  const questions = Random.shuffle(opening.getQuestions());

  let currentQuestion;
  let currentRequest;

  let interactionCount = 0;
  let affection = 0;
  let fear = 0;
  let respect = 0;

  function pickQuestion() {
    interactionCount += 1;
    currentQuestion = questions.pop();
    currentRequest = null;
    return currentQuestion;
  }

  function pickRequest() {
    interactionCount += 1;
    currentQuestion = null;
    currentRequest = `Request[${interactionCount}]`;
    return currentRequest;
  }

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monster; },
    getInteractionCount: () => { return interactionCount; },
    getQuestions: () => { return questions; },
    pickQuestion,
    pickRequest,
    getCurrentQuestion: () => { return currentQuestion; },
    getCurrentRequest: () => { return currentRequest; },
  });

};
