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

  // === Player Interaction ============================================================================================
  // These are invoked by the overlay's answer / continue buttons.

  // The continue button drives both the greeting → questions and response → next question transitions.
  // TODO: Requests — advance should eventually pick between asking a question and making a request.
  function advance() {
    if (state.getStage() === 'response') { return nextQuestion(); }
    state.setStage(state.getQuestions().length > 0 ? 'question' : 'resolution');
    render();
  }

  function answer(tone) {
    const response = state.getCurrentQuestion().reaction.responses[tone];
    state.addFeelings(response);

    if (response.text) {
      state.setStage('response');
      state.setResponseText(response.text);
      return render();
    }

    nextQuestion();
  }

  function nextQuestion() {
    state.advanceIndex();
    state.setStage(state.getIndex() >= state.getQuestions().length ? 'resolution' : 'question');
    render();
  }

  function complete() {
    accepted() ? recruit() : decline();
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
