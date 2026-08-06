global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monsterId = battleState.getActiveMonsters()[0];
  const monster = Monster(monsterId);
  const monsterCharacter = Character(monsterId);
  const player = GameSystem.getState().getPlayer();
  const playerCharacter = Character(player);
  const context = { P:player, T:monsterId };

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

  // TODO: Requests return in task 105.
  let interactionCount = 0;
  let questions = [];
  let currentQuestion;
  let pendingFollowUp;
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
    if (question.isFollowUp()) { return; }
    if (question.isPossible(context) === false) { return; }

    const reactionData = question.getReactionData(context);
    if (reactionData) {
      questions.push({ question:code, reactionData });
    }
  });

  // The dynamic requirements are checked here rather than when the pool is built because the flags they look at
  // change as the negotiation plays out. A question that isn't available now may be available a few answers from now.
  function pickQuestion() {
    const available = questions.filter(entry => NegotiationQuestion.lookup(entry.question).isAvailable(context));

    if (available.length === 0) {
      throw new Error(`Error: There aren't enough valid questions for ${monster.getCode()}:[${monster.getArchetype()}]`);
    }

    interactionCount += 1;
    currentQuestion = Random.from(available);
    questions = questions.filter(entry => entry !== currentQuestion);

    return currentQuestion;
  }

  function setFollowUp(code) {
    const reactionData = NegotiationQuestion.lookup(code).getReactionData(context);
    if (reactionData == null) {
      throw new Error(`Follow up question [${code}] has no reaction that applies to ${monster.getCode()}`);
    }
    pendingFollowUp = { question:code, reactionData };
  }

  function takeFollowUpQuestion() {
    interactionCount += 1;
    currentQuestion = pendingFollowUp;
    questions = questions.filter(entry => entry.question !== currentQuestion.question);
    pendingFollowUp = null;

    return currentQuestion;
  }

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

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monsterId; },
    getGreeting: () => { return monster.getBaseMonster().getNegotiationGreeting(context); },
    getFlag: flag => { return flags[flag]; },
    setFlag: (flag,value) => { flags[flag] = value; },
    setFlags: newFlags => { Object.entries(newFlags).forEach(([key,value]) => { flags[key] = value; }); },
    getCurrentQuestion: () => { return currentQuestion; },
    getInteractionCount: () => { return interactionCount; },
    pickQuestion,
    setFollowUp,
    hasFollowUp: () => { return pendingFollowUp != null; },
    takeFollowUpQuestion,
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
