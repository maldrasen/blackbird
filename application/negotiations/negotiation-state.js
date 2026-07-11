global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getMonsters().find(id => battleState.isAlive(id));
  const context = { A:GameSystem.getState().getPlayer(), T:monster };
  const opening = NegotiationOpening(monster);
  const questions = Random.shuffle(opening.getQuestions());

  // Having just killed all their friends, monsters will start out with some fear and respect, but almost no affection.
  // These values are randomized so that each negotiation starts out on slightly different footing. The target feeling
  // thresholds for the negotiation should always be above 100, or at 0 for a negative resolution.

  let affection = 10;
  let fear = Random.roll(80);
  let respect = Random.roll(40);

  let currentQuestion;
  let currentRequest;
  let interactionCount = 0;
  let resolution;

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

  function applyFeelings(response) {
    affection += response.affection || 0;
    fear += response.fear || 0;
    respect += response.respect || 0;
  }

  function getFeelings() {
    return {
      affection: Math.min(0, affection),
      fear: Math.min(0, fear),
      respect: Math.min(0, respect),
    }
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

    applyFeelings,
    getFeelings,

    setResolution: code => { resolution = code; },
    getResolution: () => { return resolution; },
    getResolutionText: () => { return `[Text For : ${resolution}]` },
    isResolved: () => { return resolution != null; },
  });

};
