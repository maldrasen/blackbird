global.NegotiationController = (function() {

  let monster;
  let context;
  let stage;
  let index;
  let questions;
  let reactions;
  let responseText;
  let feelings;


  // Picks with Random.from() rather than Random.shuffle() so that specs can stub each pick. The coverage validation
  // guarantees a monster can always be asked every question, but requirements could thin the list below the usual
  // count, in which case the negotiation just gets shorter.
  function selectQuestions(codes) {
    const remaining = [...codes];
    const selected = [];
    while (selected.length < QUESTION_COUNT && remaining.length > 0) {
      const pick = Random.from(remaining);
      selected.push(pick);
      ArrayHelper.remove(remaining, pick);
    }
    return selected;
  }

  // === Player Interaction ============================================================================================
  // These are invoked by the overlay's answer / continue buttons.

  // The continue button drives both the greeting → questions and response → next question transitions.
  function advance() {
    if (stage === 'response') { return nextQuestion(); }
    stage = questions.length > 0 ? 'question' : 'resolution';
    render();
  }

  function answer(tone) {
    const response = reactions[questions[index]].getResponse(tone);
    feelings.affection += response.affection || 0;
    feelings.fear += response.fear || 0;
    feelings.respect += response.respect || 0;

    if (response.text) {
      stage = 'response';
      responseText = response.text;
      return render();
    }

    nextQuestion();
  }

  function nextQuestion() {
    index += 1;
    stage = index >= questions.length ? 'resolution' : 'question';
    render();
  }

  function finish() {
    accepted() ? recruit() : decline();
  }

  // === Resolution ====================================================================================================

  // The monster joins when it likes the player more than it fears them. Anything else and it would rather keep fighting.
  function accepted() {
    const feelings = clampedFeelings();
    return feelings.affection >= feelings.fear;
  }

  function recruit() {
    const state = BattleSystem.getState();

    // Pull the monster out of the battle so it survives cleanup, then promote it. Removing the last monster leaves the
    // battle won, so we hand off to the normal victory flow.
    state.removeFromTurnOrder({ type:'monster', id:monster });
    state.removeFromFormation(monster);
    RecruitmentSystem.recruit(monster, { ...clampedFeelings(), control:0 });

    NegotiationOverlay.close();
    BattleInterface.showVictory();
  }

  function decline() {
    const round = BattleSystem.getRound();
    round.addTime(1000);
    round.addMessage({ text:NegotiationScript.declineMessage });

    NegotiationOverlay.close();
    BattleSystem.finishCharacterRound();
  }

  function clampedFeelings() {
    return {
      affection: clamp(feelings.affection),
      fear: clamp(feelings.fear),
      respect: clamp(feelings.respect),
    };
  }

  function clamp(value) { return Math.max(0, Math.min(1000, value)); }

  // === Rendering =====================================================================================================


  return Object.freeze({
    advance,
    answer,
    finish,
  });

})();
