global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monsterId = battleState.getActiveMonsters()[0];
  const monster = Monster(monsterId);
  const monsterCharacter = Character(monsterId);
  const player = GameSystem.getState().getPlayer();
  const playerCharacter = Character(player);
  const context = { P:player, T:monsterId };

  // The M, F, and A keys hold other party members the questions can reference: a random man, a random non-male
  // (futas are woman enough), and someone the monster would find attractive. A null key means no one in the party
  // fills that role.
  const others = battleState.getActiveCharacters().filter(id => id !== player);
  context.M = pickPartyReference(others.filter(id => Character(id).isMale()));
  context.F = pickPartyReference(others.filter(id => Character(id).isMale() === false));
  context.A = pickPartyReference(others.filter(id => monsterCharacter.isAttractedTo(id)));

  function pickPartyReference(candidates) {
    return candidates.length > 0 ? Random.from(candidates) : null;
  }

  const flags = {
    playerAssOut: playerCharacter.isCrotchExposed(),
    playerCockOut: playerCharacter.hasNormalCock() && playerCharacter.isCrotchExposed(),
    playerTitsOut: playerCharacter.hasBreasts() && playerCharacter.areBreastsExposed(),
    playerHard: false,
    monsterAssOut: monsterCharacter.isCrotchExposed(),
    monsterCockOut: monsterCharacter.hasNormalCock() && monsterCharacter.isCrotchExposed(),
    monsterTitsOut: monsterCharacter.hasBreasts() && monsterCharacter.areBreastsExposed(),
    monsterHard: false,
  }

  let interactionCount = 0;
  let currentInteraction;

  let questions = [];
  let pendingFollowUp;
  let resolution;
  let resolutionShown = false;

  let nonRepeatableRequests = [];

  // Having just killed all their compatriots, monsters will start out with some fear and respect, but almost no
  // control or affection. These values are randomized so that each negotiation starts out on slightly different
  // footing. A negotiation should end if any of these values drop below 0, or surpass 100.
  let control = 10;
  let affection = 10;
  let fear = Random.roll(80);
  let respect = Random.roll(40);

  NegotiationQuestion.getAllCodes().forEach(code => {
    const question = NegotiationQuestion.lookup(code);
    if (question.isFollowUp()) { return; }
    if (question.isPossible(context) === false) { return; }

    const reactionData = question.getReactionData(context);
    if (reactionData) {
      questions.push({ type:'question', code, reactionData });
    }
  });

  // The dynamic requirements are checked here rather than when the pool is built because the flags they look at
  // change as the negotiation plays out. A question that isn't available now may be available a few answers from now.
  function getAvailableQuestions() {
    return questions.filter(entry => NegotiationQuestion.lookup(entry.code).isAvailable(context));
  }

  // Unlike the questions, where the availability of a question is largely determined by the monster having a reaction
  // to the question, the requests depend more on the player's current resources and inventory. We have to check that
  // the player has the requested resources to give with each request, so we need to check the requirements of each
  // request each time one is requested.
  function getAvailableRequests() {
    return NegotiationRequest.getAllCodes().
      filter(code => NegotiationRequest.lookup(code).isPossible(context)).
      filter(code => nonRepeatableRequests.includes(code) === false).
      map(code => { return { type:'request', code:code }});
  }

  function pickInteraction() {
    interactionCount += 1;

    const availableQuestions = getAvailableQuestions();
    const availableRequests = getAvailableRequests();

    if (availableQuestions.length === 0 && availableRequests.length === 0) { throw new Error(`There are no possible negotiation interactions.`); }
    if (availableQuestions.length === 0) { return pickRequest(Random.from(availableRequests)); }
    if (availableRequests.length === 0) { return pickQuestion(Random.from(availableQuestions)); }

    return Random.flipCoin() ? pickQuestion(Random.from(availableQuestions)) : pickRequest(Random.from(availableRequests));
  }

  // When a question is picked that question is filtered out of the list of available questions.
  function pickQuestion(question) {
    currentInteraction = question;
    questions = questions.filter(entry => entry !== currentInteraction);

    return currentInteraction;
  }

  function pickRequest(request) {
    const record = NegotiationRequest.lookup(request.code);

    currentInteraction = request;
    currentInteraction.requestParameters = record.getRequestParameters(context);
    currentInteraction.requestText = record.getRequestText(context, currentInteraction.requestParameters);

    if (record.isRepeatable() === false) {
      nonRepeatableRequests.push(request.code);
    }

    return currentInteraction;
  }

  function setFollowUp(code) {
    const reactionData = NegotiationQuestion.lookup(code).getReactionData(context);
    if (reactionData == null) {
      throw new Error(`Follow up question [${code}] has no reaction that applies to ${monster.getCode()}`);
    }
    pendingFollowUp = { type:'question', code, reactionData };
  }

  function takeFollowUpQuestion() {
    interactionCount += 1;
    currentInteraction = pendingFollowUp;
    questions = questions.filter(entry => entry.code !== currentInteraction.code);
    pendingFollowUp = null;

    return currentInteraction;
  }

  // TODO: Monsters will have different conditions and thresholds that are used to determine these states. We can make
  //       some monsters harder to recruit than others by increasing the thresholds, or make some monsters only
  //       respond to affection or respect.

  function getAffectionThreshold() { return 100; }
  function getRespectThreshold() { return 100; }
  function getFearThreshold() { return 100; }

  // Overwrites the feelings outright, skipping the resolution checks. The specs use this to replace the randomly
  // rolled starting values with the exact values they care about.
  function setFeelings(values) {
    if (values.control != null) { control = values.control; }
    if (values.affection != null) { affection = values.affection; }
    if (values.fear != null) { fear = values.fear; }
    if (values.respect != null) { respect = values.respect; }
  }

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
    let type = 'attack';

    if (fear >= getFearThreshold() * 0.80) { type = 'run'; }
    if (respect >= getRespectThreshold() * 0.75) { type = 'join'; }
    if (affection >= getAffectionThreshold() * 0.66) { type = 'join'; }

    setResolution({ type });
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

  function getResolutionText() {
    const type = getResolution().type;
    const attackText = `{T:TargetName} attacks!`;
    const runText = `{T:TargetName} sprints off into the darkness!`;

    const joinText = monster.getNameType() === 'common' ?
      `{T:fullName} {T:targetName} joins the party!` :
      `{T:fullName} joins the party!`;

    switch(type) {
      case 'attack': return attackText;
      case 'ability': return attackText;
      case 'join': return joinText;
      case 'run': return runText;
      case 'unresolved': throw new Error(`There is no resolution text when the negotiation remains unresolved.`);
      default: throw new Error(`Invalid resolution type ${type}`);
    }
  }

  return {
    getContext: () => { return {...context}; },
    setContext: newContext => { Object.entries(newContext).forEach(([key,value]) => { context[key] = value; }); },
    getMonster: () => { return monsterId; },
    getGreeting: () => { return monster.getBaseMonster().getNegotiationGreeting(context); },
    getFlag: flag => { return flags[flag]; },
    setFlag: (flag,value) => { flags[flag] = value; },
    setFlags: newFlags => { Object.entries(newFlags).forEach(([key,value]) => { flags[key] = value; }); },
    getCurrentInteraction: () => { return currentInteraction; },
    getInteractionCount: () => { return interactionCount; },
    pickInteraction,
    setFollowUp,
    hasFollowUp: () => { return pendingFollowUp != null; },
    takeFollowUpQuestion,
    setFeelings,
    applyFeelings,
    getFeelings,
    setResolution,
    getResolution,
    resolveFromTimeout,
    getResolutionText,
    hasResolution: () => { return getResolution().type !== 'unresolved'; },
    markResolutionShown: () => { resolutionShown = true; },
    hasShownResolution: () => { return resolutionShown; },
  };

};
