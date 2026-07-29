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

    if (currentQuestion == null) {
      throw new Error(`Error: There aren't enough valid questions for ${Monster(monster).getCode()}:[${Monster(monster).getArchetype()}]`);
    }

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

  // TODO: Monsters will have different conditions and thresholds that are used to determine these states. We can make
  //       some monsters harder to recruit than others by increasing the thresholds, or make some monsters only
  //       respond to affection or respect.

  function getResolution() {
    const affectionThreshold = 100;
    const respectThreshold = 100;

    console.log("Determining Resolution:",getFeelings());

    if (fear < 0 && respect < 0) { return 'angry' }
    if (affection < 0 && respect < 0) { return 'angry'; }
    if (affection > affectionThreshold || respect > respectThreshold) { return 'satisfied'; }
    return 'unresolved'
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

  // TODO: These are just temporary strings, the actual resolution text should come from the base monsters and the
  //       personality archetypes.
  function getResolutionText() {
    switch(resolution) {
      case 'angry': return `{T:TargetName} attacks.`;
      case 'satisfied': return `{T:name} {T:TargetName} joins the party.`;
      default: throw new Error(`Add resolution text for ${resolution}`);
    }
  }

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monster; },
    getGreeting: () => { return Monster(monster).getBaseMonster().getNegotiationGreeting(context); },
    getCurrentQuestion: () => { return currentQuestion; },
    getCurrentRequest: () => { return currentRequest; },
    setStage: code => { stage = code; },
    getStage: () => { return stage; },
    getInteractionCount: () => { return interactionCount; },
    hasQuestions: () => { return questions.length > 0; },
    pickQuestion,
    applyFeelings,
    getFeelings,
    setResolutionData: data => { resolution = data; },
    getResolutionData: () => { return resolution; },
    isResolved: () => { return getResolution() !== 'unresolved'; },
    getResolution,
    getResolutionText,
  });

};
