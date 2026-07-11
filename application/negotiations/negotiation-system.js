global.NegotiationSystem = (function() {
  let state;

  // TODO: Limit the negotiate ability to only the player.
  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);

    NegotiationOverlay.open({ greeting:getGreeting() });

  }

  // TODO: The greeting still pulls from the old temp script. Greetings should work like the responses though with
  //       different greetings for Supertypes, archetypes, monster types, and specific monsters.
  function getGreeting() {
    return NegotiationScript.greeting;
  }

  function advance() {

    if (state.getInteractionCount() >= 5) {
      return forceResolution();
    }

    if (state.isResolved()) {
      switch (state.getResolution()) {
        case 'leave': return monsterLeaves();
        case 'satisfied': return recruitMonster();
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

    // TODO: When the monster turns angry, end the negotiation and the player's turn. The monster should then
    //       immediately attack.
    if (isAngry()) { return; }

    advance();
  }

  // TODO: If after five questions or requests, you still haven't convinced the monster to join you, or angered them
  //       enough that they attack you, we should just resolve this negotiation with the monster leaving. No gifts, no
  //       tricks, but also no new party member.
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

  function isSatisfied() { return state.getInteractionCount() > 3; }
  function isAngry() { return false; }

  function monsterLeaves() {
    NegotiationOverlay.close();
    BattleInterface.showVictory();
  }

  // Pull the monster out of the battle so it survives cleanup, then promote it. Removing the last monster leaves the
  // battle won, so we hand off to the normal victory flow.
  function recruitMonster() {
    // Get Feelings
    // const battleState = BattleSystem.getState();
    // battleState.removeFromTurnOrder({ type:'monster', id:monster });
    // battleState.removeFromFormation(monster);
    // RecruitmentSystem.recruit(monster, { ...state.clampedFeelings(), control:0 });

    NegotiationOverlay.close();
    BattleInterface.showVictory();
  }


  return Object.freeze({
    start,
    advance,
    answer,
    getState: () => { return state; },
  });

})();
