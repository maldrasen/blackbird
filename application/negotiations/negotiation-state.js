global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getActiveMonsters()[0];
  const player = GameSystem.getState().getPlayer();
  const playerCharacter = Character(player);
  const context = { P:player, T:monster };

  const flags = {
    playerAssOut: playerCharacter.isCrotchExposed(),
    playerCockOut: playerCharacter.hasNormalCock() && playerCharacter.isCrotchExposed(),
    playerTitsOut: playerCharacter.hasBreasts() && playerCharacter.areBreastsExposed(),
    playerHard: false,
  }

  // TODO: Requests return in task 105.
  let interactionCount = 0;
  let questions = [];
  let currentQuestion;
  let resolution;
  let resolutionShown = false;

  // Having just killed all their compatriots, monsters will start out with some fear and respect, but almost no
  // control or affection. These values are randomized so that each negotiation starts out on slightly different
  // footing. A negotiation should end if any of these values drop below 0, or surpass 100.
  let control = 10;
  let affection = 10;
  let fear = Random.roll(80);
  let respect = Random.roll(40);

  NegotiationQuestion.getAllCodes().forEach(code => {
    const question = NegotiationQuestion.lookup(code);
    if (question.isPossible(context)) {
      const reactionData = question.getReactionData(context);
      if (reactionData) {
        questions.push({ question:code, reactionData });
      }
    }
  });

  // The dynamic requirements are checked here rather than when the pool is built because the flags they look at
  // change as the negotiation plays out. A question that isn't available now may be available a few answers from now.
  function pickQuestion() {
    const available = questions.filter(entry => NegotiationQuestion.lookup(entry.question).isAvailable(context));

    if (available.length === 0) {
      throw new Error(`Error: There aren't enough valid questions for ${Monster(monster).getCode()}:[${Monster(monster).getArchetype()}]`);
    }

    interactionCount += 1;
    currentQuestion = Random.from(available);
    questions = questions.filter(entry => entry !== currentQuestion);

    return currentQuestion;
  }

  // TODO: We should use the player's communication skill when applying the feelings. A skilled communicator should
  //       be able to reduce negative feelings and increase positive feelings. (Or the opposite if they're bad at
  //       communication.) We can try making this an opposed beauty roll, see how that works out.

  // TODO: Monsters will have different conditions and thresholds that are used to determine these states. We can make
  //       some monsters harder to recruit than others by increasing the thresholds, or make some monsters only
  //       respond to affection or respect.

  function getAffectionThreshold() { return 100; }
  function getRespectThreshold() { return 100; }
  function getFearThreshold() { return 100; }

  function applyFeelings(response) {
    control += response.control || 0;
    affection += response.affection || 0;
    fear += response.fear || 0;
    respect += response.respect || 0;

    if (fear < 0 && respect < 0) { return setResolution({ type:'attack' }); }
    if (affection < 0 && respect < 0) { return setResolution({ type:'attack' }); }
    if (affection > getAffectionThreshold() || respect > getRespectThreshold()) { setResolution({ type:'join' }); }
  }

  // The early return here ensures that when a resolution forces a particular outcome, it can't also contain a feelings
  // map that would change that outcome.
  function setResolution(data) {
    if (resolution) { return; }
    resolution = data;
  }

  function getResolution() {
    return resolution || { type:'unresolved' };
  }

  function resolveFromTimeout() {
    setResolution(fear >= getFearThreshold() ? { type:'run' } : { type:'stalemate' });
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
    switch(getResolution().type) {
      case 'join': return `{T:TargetName} joins the party.`;
      case 'attack': return `{T:TargetName} attacks.`;
      case 'ability': return `{T:TargetName} acts.`;
      case 'run': return `{T:TargetName} runs away.`;
      case 'stalemate': return `{T:TargetName} loses interest in talking.`;
      default: throw new Error(`Add resolution text for ${getResolution().type}`);
    }
  }

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monster; },
    getGreeting: () => { return Monster(monster).getBaseMonster().getNegotiationGreeting(context); },
    getFlag: flag => { return flags[flag]; },
    setFlag: (flag,value) => { flags[flag] = value; },
    setFlags: newFlags => { Object.entries(newFlags).forEach(([key,value]) => { flags[key] = value; }); },
    getCurrentQuestion: () => { return currentQuestion; },
    getInteractionCount: () => { return interactionCount; },
    pickQuestion,
    applyFeelings,
    getFeelings,
    setResolution,
    getResolution,
    resolveFromTimeout,
    getResolutionText,
    hasResolution: () => { return getResolution().type !== 'unresolved'; },
    markResolutionShown: () => { resolutionShown = true; },
    hasShownResolution: () => { return resolutionShown; },
  });

};
