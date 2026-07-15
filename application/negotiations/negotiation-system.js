global.NegotiationSystem = (function() {
  let state;

  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();
    BattleSystem.getState().setNegotiationAttempted();

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);

    NegotiationOverlay.open({ greeting:state.getGreeting() });

  }

  function advance() {

    if (state.isResolved() === false && state.getInteractionCount() >= 5) {
      return forceResolution();
    }

    if (state.isResolved()) {
      switch (state.getResolution()) {
        case 'angry': return monsterAttacks();
        case 'leave': return monsterLeaves();
        case 'satisfied': return monsterJoins();
      }
    }

    const type = Random.fromFrequencyMap({
      request: 50,
      question: 50,
    });

    if (type === 'question' && state.getQuestions().length > 0) {
      return NegotiationOverlay.renderQuestion(state.pickQuestion());
    }

    NegotiationOverlay.renderRequest(state.pickRequest());
  }

  function answer(code) {
    const question = state.getCurrentQuestion();
    const request = state.getCurrentRequest();

    if (question) {
      state.applyFeelings(question.reaction.responses[code]);
    }
    if (request) {
      // TODO: Apply feelings when requests are met or denied.
    }

    if (isSatisfied()) {
      state.setResolution("satisfied");
      return NegotiationOverlay.renderResolution();
    }

    if (isAngry()) {
      state.setResolution("angry");
      return NegotiationOverlay.renderResolution();
    }

    advance();
  }

  // If after five questions or requests, you still haven't convinced the monster to join you, or angered them enough
  // that they attack you, the negotiation resolves with the monster leaving. No gifts, no tricks, but also no new
  // party member.
  function forceResolution() {
    state.setResolution("leave");
    NegotiationOverlay.renderResolution();
  }

  // TODO: Monsters will have different conditions and thresholds that are used to determine when they are satisfied
  //       or angry with the negotiation. With this we can make some monsters harder to recruit than others by
  //       increasing the thresholds, or make some monsters only respond to affection or respect. The Monster wrapper
  //       should have the isSatisfied() and isAngry() functions. The wrapper delegates to the baseMonster then to the
  //       personality archetype, then to the supertype, mimicking the property weights.

  // When a monster is satisfied the negotiation is over and they join the party. If they're angry then the fight
  // continues with the player ending their turn and the monster moving to the top of the turn order. We'll evenually
  // have other results as well, the monster running away or tricking the player in some way.

  function isSatisfied() { return Random.roll(100) < 20; }
  function isAngry() { return Random.roll(100) < 20; }

  // Monsters who leave a negotiation go into the fled pile so that their entities are deleted when the battle is
  // cleaned up. Monsters who join the party are recruited instead, so their entities are kept.
  function monsterLeaves() {
    BattleSystem.getState().addToFledPile(state.getMonster());
    removeMonsterFromBattle();
    NegotiationOverlay.close();
    BattleInterface.showVictory();
  }

  // TODO: When the monster turns angry, end the negotiation and the player's turn. The monster should then
  //       immediately attack.
  function monsterAttacks() {
    NegotiationOverlay.close();

    const battleRound = BattleSystem.getRound();
    battleRound.addTime(1200);
    battleRound.addMessage({ text:`Negotiations have broken down.` });

    BattleSystem.finishCharacterRound();
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'monster', id:state.getMonster() }, 500);
  }

  function monsterJoins() {
    removeMonsterFromBattle();
    RecruitmentSystem.recruit(state.getMonster(), state.getFeelings());
    NegotiationOverlay.close();
    BattleInterface.showVictory();
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
