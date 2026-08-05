global.NegotiationSystem = (function() {

  const maxInteractions = 5;
  const negotiationTime = 1200;

  let state;

  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    BattleSystem.getState().setNegotiationAttempted();
    BattleSystem.getRound().setAbility(BattleCommand.negotiate);
    NegotiationInterface.open();
  }

  function advance() {
    if (state.hasShownResolution()) { return executeResolution(); }
    if (state.hasResolution()) { return showResolution(); }
    if (state.getInteractionCount() >= maxInteractions) { return forceResolution(); }
    NegotiationInterface.renderQuestion(state.pickQuestion());
  }

  function forceResolution() {
    state.resolveFromTimeout();
    showResolution();
  }

  function showResolution() {
    state.markResolutionShown();
    NegotiationInterface.renderResolution();
  }

  // TODO: A reaction can also be a follow on question.
  // TODO: Requests are answered here as well once they're implemented. (Task 105)
  // TODO: Answer level requirements (how-do-you-murder)
  function answer(key) {
    const question = state.getCurrentQuestion();
    const reaction = NegotiationReaction.resolve(question.reactionData.reactions[key], state.getContext());

    applyReaction(reaction.feelings ? moderateReaction(reaction) : reaction);
  }

  function moderateReaction(reaction) {
    return { ...reaction, feelings:NegotiationInfluence.moderateFeelings(reaction.feelings, state.getContext()) };
  }

  // The monster's reply is always rendered, but nothing executes yet. Any reaction can carry a feelings map, so that
  // a resolution like an automatic join still credits its feelings before it resolves. Feelings adjustments can
  // resolve the negotiation when a feeling is pushed out of bounds, so a resolution reaction sets its own resolution
  // before its feelings apply — otherwise a run reaction's negative feelings could hijack the outcome into an attack.
  // Either way the resolution waits until the player has advanced past the reply and the resolution text.
  function applyReaction(reaction) {
    NegotiationInterface.renderDialog(reaction.message);

    switch (reaction.type) {
      case 'feelings': break;
      case 'join':     state.setResolution({ type:'join' }); break;
      case 'attack':   state.setResolution({ type:'attack' }); break;
      case 'ability':  state.setResolution({ type:'ability', code:reaction.code }); break;
      case 'run':      state.setResolution({ type:'run' }); break;
      default: throw new Error(`Unknown reaction type [${reaction.type}]`);
    }

    if (reaction.feelings) { state.applyFeelings(reaction.feelings); }
  }

  function executeResolution() {
    const resolution = state.getResolution();

    switch (resolution.type) {
      case 'join':      return resolveJoin();
      case 'attack':    return resolveAbility('basic-attack');
      case 'ability':   return resolveAbility(resolution.code);
      case 'run':       return resolveRun();
    }
    throw new Error(`Unknown resolution type [${resolution.type}]`);
  }

  // The monster is recruited after the negotiation finishes so that its MonsterComponent survives the victory path.
  function resolveJoin() {
    const monster = state.getMonster();
    const battleState = BattleSystem.getState();

    battleState.setCondition(monster, BattleCondition.recruited);
    battleState.removeFromBattle(monster);
    finishNegotiation();
    RecruitmentSystem.recruit(monster, state.getFeelings());
  }

  function resolveAbility(code) {
    BattleSystem.getState().setForcedAbility(code);
    finishNegotiation();
  }

  // TODO: Run should also be an ability that a monster can use. If a monster tries to escape there should be a chance
  //       that they fail and that the battle continues. A monster might also choose to run as their action, outside
  //       of the negotiation system entirely.

  function resolveRun() {
    const monster = state.getMonster();
    const battleState = BattleSystem.getState();

    battleState.setCondition(monster, BattleCondition.fled);
    battleState.removeFromBattle(monster);
    finishNegotiation();
  }

  // The player's round is finished while they're still first in the turn order because updateTime() requires the
  // acting entity to be next. Only after the round is closed out can the monster's response be scheduled.
  function finishNegotiation() {
    NegotiationInterface.close();
    BattleSystem.getRound().addTime(negotiationTime);
    BattleSystem.finishRound();
    scheduleMonsterResponse();
    BattleSystem.advanceBattle();
  }

  function scheduleMonsterResponse() {
    const battleState = BattleSystem.getState();

    if (battleState.getActiveMonsters().length === 0) { return battleState.battleWon(); }
    if (battleState.getCondition(state.getMonster()) !== BattleCondition.active) { return; }

    battleState.moveToTopOfTurnOrder({ type:'monster', id:state.getMonster() }, 500);
  }

  return Object.freeze({
    start,
    advance,
    answer,
    getState: () => { return state; },
  });

})();
