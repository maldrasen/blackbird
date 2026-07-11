global.NegotiationController = (function() {

  // Every monster starts a negotiation from a neutral baseline; the monster's resolved NegotiationReaction to each
  // answer pushes these feelings up or down, and the final values decide both whether the monster joins and what it
  // feels towards the player once recruited.
  const BASE = { affection:100, fear:100, respect:100 };

  const QUESTION_COUNT = 3;

  let $monster;
  let $context;
  let $stage;        // 'greeting' | 'question' | 'response' | 'resolution'
  let $index;        // current index into $questions
  let $questions;    // codes of the questions this monster will ask
  let $reactions;    // question code → winning NegotiationReaction wrapper
  let $responseText; // woven monster line shown in the 'response' stage
  let $feelings;     // running affection/fear/respect totals

  // Negotiate is only offered when a single monster remains, so the sole living monster is our target.
  function start() {
    const state = BattleSystem.getState();
    $monster = state.getMonsters().find(id => state.isAlive(id));
    $context = { A:GameSystem.getState().getPlayer(), T:$monster };
    $stage = 'greeting';
    $index = 0;
    $feelings = { ...BASE };

    $reactions = NegotiationReaction.resolve($context);
    $questions = selectQuestions(Object.keys($reactions));

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);
    round.setTarget($monster);

    NegotiationOverlay.open();
    render();
  }

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
    if ($stage === 'response') { return nextQuestion(); }
    $stage = $questions.length > 0 ? 'question' : 'resolution';
    render();
  }

  function answer(tone) {
    const response = $reactions[$questions[$index]].getResponse(tone);
    $feelings.affection += response.affection || 0;
    $feelings.fear += response.fear || 0;
    $feelings.respect += response.respect || 0;

    if (response.text) {
      $stage = 'response';
      $responseText = response.text;
      return render();
    }

    nextQuestion();
  }

  function nextQuestion() {
    $index += 1;
    $stage = $index >= $questions.length ? 'resolution' : 'question';
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
    state.removeFromTurnOrder({ type:'monster', id:$monster });
    state.removeFromFormation($monster);
    RecruitmentSystem.recruit($monster, { ...clampedFeelings(), control:0 });

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
      affection: clamp($feelings.affection),
      fear: clamp($feelings.fear),
      respect: clamp($feelings.respect),
    };
  }

  function clamp(value) { return Math.max(0, Math.min(1000, value)); }

  // === Rendering =====================================================================================================

  function render() {
    NegotiationOverlay.render(content());
  }

  function content() {
    if ($stage === 'greeting') { return monsterLine(NegotiationScript.greeting) + continueButton('negotiation-advance'); }
    if ($stage === 'response') { return monsterLine($responseText) + continueButton('negotiation-advance'); }
    if ($stage === 'resolution') { return resolutionContent(); }
    return questionContent();
  }

  function questionContent() {
    const question = NegotiationQuestion.lookup($questions[$index]);
    const answers = Object.entries(question.getAnswers()).map(([tone,label]) =>
      `<a href='#' class='button negotiation-answer' data-tone='${tone}'>${label}</a>`
    ).join('');

    return monsterLine(question.getText()) + answerRow(answers);
  }

  function resolutionContent() {
    const line = accepted() ? NegotiationScript.accept : NegotiationScript.refuse;
    return monsterLine(line) + continueButton('negotiation-finish');
  }

  function monsterLine(template) {
    return `<p class='negotiation-line' style='font-size:1.2em; line-height:1.6; margin-bottom:28px'>${Weaver($context).weave(template)}</p>`;
  }

  function answerRow(buttons) {
    return `<div class='negotiation-answers' style='display:flex; flex-direction:column; gap:10px; align-items:flex-start'>${buttons}</div>`;
  }

  function continueButton(classname) {
    return answerRow(`<a href='#' class='button button-primary ${classname}'>Continue</a>`);
  }

  return Object.freeze({
    start,
    advance,
    answer,
    finish,
  });

})();
