global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getActiveMonsters()[0];
  const context = { A:GameSystem.getState().getPlayer(), T:monster };

  let stage = 'question';
  let interactionCount = 0;
  let questions = [];
  let requests = [];
  let currentQuestion;
  let currentRequest;
  let resolution;

  // Having just killed all their compatriots, monsters will start out with some fear and respect, but almost no
  // control or affection. These values are randomized so that each negotiation starts out on slightly different
  // footing. A negotiation should end if any of these values drop below 0, or surpass 100.
  let control = 10;
  let affection = 10;
  let fear = Random.roll(80);
  let respect = Random.roll(40);

  NegotiationQuestion.getAllCodes().forEach(code => {
    const reactionData = NegotiationQuestion.lookup(code).getReactionData(context);
    if (reactionData) {
      questions.push({ question:code, reactionData });
    }
  });

  // TODO: Also determine which requests are applicable here.

  questions = Random.shuffle(questions);

  // TODO: Also force a resolution when we run out of questions here.
  function pickQuestion() {
    interactionCount += 1;
    currentQuestion = questions.shift();
    return currentQuestion;
  }

  // TODO: We should use the player's communication skill when applying the feelings. A skilled communicator should
  //       be able to reduce negative feelings and increase positive feelings. (Or the opposite if they're bad at
  //       communication.) We can try making this an opposed beauty roll, see how that works out.

  function applyFeelings(response) {
    control += response.control || 0;
    affection += response.affection || 0;
    fear += response.fear || 0;
    respect += response.respect || 0;
  }

  // The feelings component doesn't allow for negative values, so we clamp them here before they're applied to the
  // component. Control ranges from -500 to 500 which should be impossible to go out of bounds in a negotiation.
  function getFeelings() {
    return {
      control: control,
      affection: Math.max(0, affection),
      fear: Math.max(0, fear),
      respect: Math.max(0, respect),
    }
  }

  // TODO: The resolution text should come from the base monsters and the personality archetypes.
  function getResolutionText() {
    switch(resolution) {
      case 'angry': return `{T:TargetName} attacks.`;
      case 'leave': return `{T:TargetName} leaves.`;
      case 'satisfied': return `{T:name} {T:targetName} joins the party.`;
      default: throw new Error(`Add resolution text for ${resolution}`);
    }
  }

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monster; },
    getGreeting: () => { return Monster(monster).getBaseMonster().getNegotiationGreeting(context); },
    setStage: code => { stage = code; },
    getStage: () => { return stage; },
    getInteractionCount: () => { return interactionCount; },
    pickQuestion,
    applyFeelings,
    getFeelings,
    setResolution: code => { resolution = code; },
    getResolution: () => { return resolution; },
    isResolved: () => { return resolution != null; },
    getResolutionText,
  });

};
