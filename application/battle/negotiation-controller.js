global.NegotiationController = (function() {

  // Every monster starts a negotiation from a neutral baseline; the tone of the player's answers pushes these feelings
  // up or down (per Archetype.negotiationDelta) and the final values decide both whether the monster joins and what it
  // feels towards the player once recruited.
  const BASE = { affection:100, fear:100, respect:100 };

  let $monster;
  let $context;
  let $stage;    // 'greeting' | 'question' | 'resolution'
  let $index;    // current question index while in the 'question' stage
  let $feelings; // running affection/fear/respect totals

  // Negotiate is only offered when a single monster remains, so the sole living monster is our target.
  function start() {
    const state = BattleSystem.getState();
    $monster = state.getMonsters().find(id => state.isAlive(id));
    $context = { A:GameSystem.getState().getPlayer(), T:$monster };
    $stage = 'greeting';
    $index = 0;
    $feelings = { ...BASE };

    const round = BattleSystem.getRound();
    round.setAbility(BattleCommand.negotiate);
    round.setTarget($monster);

    NegotiationOverlay.open();
    render();
  }

  // === Player Interaction ============================================================================================
  // These are invoked by the overlay's answer / continue buttons.

  function advance() {
    $stage = 'question';
    $index = 0;
    render();
  }

  function answer(tone) {
    const delta = Archetype.lookup(Personality($monster).getArchetype()).negotiationDelta(tone);
    $feelings.affection += delta.affection;
    $feelings.fear += delta.fear;
    $feelings.respect += delta.respect;

    $index += 1;
    if ($index >= NegotiationScript.questions.length) { $stage = 'resolution'; }
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
    if ($stage === 'resolution') { return resolutionContent(); }
    return questionContent();
  }

  function questionContent() {
    const question = NegotiationScript.questions[$index];
    const answers = question.answers.map(answer =>
      `<a href='#' class='button negotiation-answer' data-tone='${answer.tone}'>${answer.label}</a>`
    ).join('');

    return monsterLine(question.text) + answerRow(answers);
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
