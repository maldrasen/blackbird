global.NegotiationSystem = (function() {
  let state;

  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    BattleSystem.getState().setNegotiationAttempted();
    BattleSystem.getRound().setAbility(BattleCommand.negotiate);
    NegotiationInterface.open();
  }

  // TODO: When the negotiation is growing too long we need to look at the feelings map in the state and decide where
  //       we currently land. This should be considered a losing state, so the battle can continue, or if fear is high
  //       enough we can have the monster run.

  function advance() {
    if (state.isResolved()) { return showResolution(); }
    if (state.getInteractionCount() >= 5) { return forceResolution(); }
    NegotiationInterface.renderQuestion(state.pickQuestion());
  }

  // TODO: A reaction can also be a follow on question.
  // TODO: Requests are answered here as well once they're implemented. (Task 105)
  // TODO: Answer level requirements (how-do-you-murder)
  function answer(key) {
    const question = state.getCurrentQuestion();
    const reaction = NegotiationReaction.resolve(question.reactionData.reactions[key], state.getContext());

    console.log("Got Reaction:",reaction);

    applyReaction(reaction);
  }

  // Most reactions adjust the monster's feelings, which can resolve the negotiation when a feeling is pushed out of
  // bounds. The other reaction types resolve the negotiation directly. Either way the resolution isn't executed until
  // the player advances past the monster's reply.
  function applyReaction(reaction) {
    NegotiationInterface.renderDialog(reaction.message);

    switch (reaction.type) {
      case 'feelings': return monsterContinues(reaction);
      case 'ability':  return monsterUsesAbility(reaction.code);
      case 'attack':   return monsterUsesAbility('basic-attack');
      case 'run':      return monsterRuns();
    }
    throw new Error(`Unknown reaction type [${reaction.type}]`);
  }

  function monsterContinues(reaction) {
    state.applyFeelings(reaction.feelings);
    switch (state.getResolution().type) {
      case 'join': return reactThenJoin(reaction);
      case 'attack': return reactThenAttack(reaction);
    }
  }

  function reactThenJoin(reaction) {
    console.log("React then join:",reaction)
    // BattleSystem.getState().setCondition(state.getMonster(), BattleCondition.recruited);
    // removeMonsterFromBattle();
    // finishNegotiation();
    // RecruitmentSystem.recruit(state.getMonster(), state.getFeelings());
  }

  function reactThenAttack(reaction) {
    console.log("React then attack:",reaction)
  }

  function monsterUsesAbility(ability) {
    BattleSystem.getState().setForcedAbility(ability);
    finishNegotiation();
  }

  // TODO: Run should also be an ability that a monster can use. If a monster tries to escape there should be a chance
  //       that they fail and that the battle continues. A monster might also choose to run as their action, outside
  //       of the negotiation system entirely.

  function monsterRuns() {
    BattleSystem.getState().setCondition(state.getMonster(), BattleCondition.fled);
    removeMonsterFromBattle();
    finishNegotiation();
  }

  // TODO: This function should just be in the battle state.
  function removeMonsterFromBattle() {
    const battleState = BattleSystem.getState();
    battleState.removeFromTurnOrder({ type:'monster', id:state.getMonster() });
    battleState.removeFromFormation(state.getMonster());
  }

  function finishNegotiation() {
    const battleState = BattleSystem.getState();
    const battleRound = BattleSystem.getRound();
    const battleOver = battleState.getActiveMonsters().length === 0;

    NegotiationInterface.close();
    battleRound.addTime(1200);
    battleRound.addMessage({ text:`(TODO: Skip)` });

    (battleOver) ?
      battleState.battleWon() :
      battleState.moveToTopOfTurnOrder({ type:'monster', id:state.getMonster() }, 500);

    // TODO: This should be skip the character round. When the negotiation ends with a monster still fighting then
    //       we should display the result's from the monster's attack or whatever ability it uses. If the battle is
    //       over then the enlighten view will display without displaying the message at all.
    BattleSystem.finishCharacterRound();
  }

  return Object.freeze({
    start,
    advance,
    answer,
    getState: () => { return state; },
  });

})();
