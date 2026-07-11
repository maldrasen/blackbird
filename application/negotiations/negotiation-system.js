global.NegotiationSystem = (function() {
  let state;

  // TODO: Limit the negotiate ability to only the player.
  // TODO: There should also be a version that the monster starts when there's only one monster remaining.
  function start() {
    state = NegotiationState();

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);

    NegotiationOverlay.open();
  }

  function advance() {

    if (state.getInteractionCount() >= 5) {
      complete();
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
      console.log("Answered With:",code)
    }
    if (request) {
      console.log("Answered With:",code)
    }

    advance();
  }

  function complete() {
    console.log("=== Finish This ===")
    NegotiationOverlay.renderResolution(`TODO: Resolution`);
  }

  // === Resolution ====================================================================================================

  // The monster joins when it likes the player more than it fears them. Anything else and it would rather keep fighting.
  function accepted() {
    const feelings = state.clampedFeelings();
    return feelings.affection >= feelings.fear;
  }

  function recruit() {
    const battleState = BattleSystem.getState();
    const monster = state.getMonster();

    // Pull the monster out of the battle so it survives cleanup, then promote it. Removing the last monster leaves the
    // battle won, so we hand off to the normal victory flow.
    battleState.removeFromTurnOrder({ type:'monster', id:monster });
    battleState.removeFromFormation(monster);
    RecruitmentSystem.recruit(monster, { ...state.clampedFeelings(), control:0 });

    if (HEADLESS === false) {
      NegotiationOverlay.close();
      BattleInterface.showVictory();
    }
  }

  function decline() {
    const round = BattleSystem.getRound();
    round.addTime(1000);
    round.addMessage({ text:NegotiationScript.declineMessage });

    if (HEADLESS === false) { NegotiationOverlay.close(); }
    BattleSystem.finishCharacterRound();
  }

  function render() {
    if (HEADLESS === false) { NegotiationOverlay.render(); }
  }

  // TODO: The greeting still pulls from the old temp script. Greetings should work like the responses though with
  //       different greetings for Supertypes, archetypes, monster types, and specific monsters.
  function getGreeting() {
    return Weaver(state.getContext()).weave(NegotiationScript.greeting);
  }

  return Object.freeze({
    start,
    advance,
    answer,
    complete,
    getState: () => { return state; },
    getGreeting,
  });

})();
