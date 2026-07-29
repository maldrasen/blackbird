global.NegotiationSystem = (function() {
  let state;

  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    BattleSystem.getState().setNegotiationAttempted();
    BattleSystem.getRound().setAbility(BattleCommand.negotiate);
    NegotiationOverlay.open();
  }

  function advance() {
    if (state.isResolved()) { return executeResolution(); }
    if (state.getInteractionCount() >= 5 || state.hasQuestions() === false) { return forceResolution(); }
    NegotiationOverlay.renderQuestion(state.pickQuestion());
  }

  // TODO: Requests are answered here as well once they're implemented. (Task 105)
  function answer(key) {
    const question = state.getCurrentQuestion();
    const reaction = NegotiationReaction.resolve(question.reactionData.reactions[key], state.getContext());

    applyReaction(reaction);
    NegotiationOverlay.renderReaction(reaction.message);
  }

  // Most reactions adjust the monster's feelings, which can resolve the negotiation when a feeling is pushed out of
  // bounds. The other reaction types resolve the negotiation directly. Either way the resolution isn't executed until
  // the player advances past the monster's reply.
  function applyReaction(reaction) {
    switch (reaction.type) {
      case 'feelings': return state.applyFeelings(reaction.feelings);
      case 'attack':   return state.setResolution('angry');
      case 'run':      return state.setResolution('leave');
      case 'ability':  return state.setResolution('ability', reaction.code);
    }
    throw new Error(`Unknown reaction type [${reaction.type}]`);
  }

  function executeResolution() {
    switch (state.getResolution()) {
      case 'angry':     return monsterAttacks();
      case 'leave':     return monsterLeaves();
      case 'satisfied': return monsterJoins();
      case 'ability':   return monsterUsesAbility(state.getResolutionData());
    }
    throw new Error(`Unknown resolution [${state.getResolution()}]`);
  }

  // If after five questions you still haven't convinced the monster to join you, or angered them enough that they
  // attack you, the negotiation resolves with the monster leaving. No gifts, no tricks, but also no new party member.
  function forceResolution() {
    state.setResolution('leave');
    NegotiationOverlay.renderResolution();
  }

  // Monsters who leave a negotiation are marked as fled so that their entities are deleted when the battle is
  // cleaned up. Monsters who join the party are recruited instead, so their entities are kept.
  function monsterLeaves() {
    BattleSystem.getState().setCondition(state.getMonster(), BattleCondition.fled);
    removeMonsterFromBattle();
    finishNegotiation();
  }

  // The monster is recruited after the negotiation round is finished because the resolution message needs to be
  // woven while the monster still has its monster wrapper.
  function monsterJoins() {
    BattleSystem.getState().setCondition(state.getMonster(), BattleCondition.recruited);
    removeMonsterFromBattle();
    finishNegotiation();
    RecruitmentSystem.recruit(state.getMonster(), state.getFeelings());
  }

  function monsterAttacks() {
    const battleRound = BattleSystem.getRound();

    NegotiationOverlay.close();
    battleRound.addTime(1200);
    battleRound.addMessage({ text:`Negotiations have broken down.` });

    BattleSystem.finishCharacterRound();
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'monster', id:state.getMonster() }, 500);
  }

  function monsterUsesAbility(code) {
    BattleSystem.getState().setForcedAbility(state.getMonster(), {
      ability: code,
      target: GameSystem.getState().getPlayer(),
    });
    monsterAttacks();
  }

  // Ending the negotiation with the monster gone also ends the player's turn. The battle is only won when this was
  // the last active monster; otherwise the fight continues without them.
  function finishNegotiation() {
    const battleState = BattleSystem.getState();
    const battleRound = BattleSystem.getRound();

    NegotiationOverlay.close();
    battleRound.addTime(1200);
    battleRound.addMessage({ text:state.getResolutionText() }, Weaver(state.getContext()));

    if (battleState.getActiveMonsters().length === 0) { battleState.battleWon(); }
    BattleSystem.finishCharacterRound();
  }

  function removeMonsterFromBattle() {
    const battleState = BattleSystem.getState();
    battleState.removeFromTurnOrder({ type:'monster', id:state.getMonster() });
    battleState.removeFromFormation(state.getMonster());
  }

  return Object.freeze({
    start,
    advance,
    answer,
    getState: () => { return state; },
  });

})();
