global.NegotiationOverlay = (function() {

  function init() {
    X.onClick(`#generalOverlay .overlay`, clickAdvance);
    X.onClick('#negotiation .negotiation-answer', answer);
    X.onClick('#negotiation .negotiation-advance', advance);
    X.onClick('#negotiation .negotiation-finish', complete);
  }

  // TODO: We need to forbid the GeneralOverlay from closing this window until the negotiation is resolved.
  function open() {
    GeneralOverlay.open(build(), { classname:'small', hideFooter:'true' });
    displayGreeting();
  }

  function build() {
    return X.createElement(`<div id="negotiation">
      <div id="dialog"></div>
      <div id="answers"></div>
    </div>`);
  }

  function close() {
    GeneralOverlay.close();
  }

  function answer(event) {
    NegotiationSystem.answer(event.target.dataset.tone);
  }

  // We register the clickAdvance event on the generalOverlay because we want a click anywhere on the overlay to
  // advance the text as the negotiation element could be much smaller than the overlay. This registers a listener on
  // any generalOverlay so we want to make sure the event only fires when this overlay has the negotiation element.
  function clickAdvance(event) {
    if (event.target.querySelector('#negotiation')) { advance(); }
  }

  function advance() {
    NegotiationSystem.advance();
  }

  function complete() {
    NegotiationSystem.complete()
  }

  function displayGreeting() {
    X.fill('#dialog', X.createElement(`<p class='greeting'>${NegotiationSystem.getGreeting()}</p>`));
  }

  function render() {
  }

  // function render(content) {
  //   X.fill('#negotiationOverlayContent', X.createElement(`<div class='negotiation' style='padding:40px'>${content}</div>`));
  // }

  // function render() {
  //   NegotiationOverlay.render(content());
  // }
  //
  // function content() {
  //   if (stage === 'greeting') { return monsterLine(NegotiationScript.greeting) + continueButton('negotiation-advance'); }
  //   if (stage === 'response') { return monsterLine(responseText) + continueButton('negotiation-advance'); }
  //   if (stage === 'resolution') { return resolutionContent(); }
  //   return questionContent();
  // }
  //
  // function questionContent() {
  //   const question = NegotiationQuestion.lookup(questions[index]);
  //   const answers = Object.entries(question.getAnswers()).map(([tone,label]) =>
  //     `<a href='#' class='button negotiation-answer' data-tone='${tone}'>${label}</a>`
  //   ).join('');
  //
  //   return monsterLine(question.getText()) + answerRow(answers);
  // }
  //
  // function resolutionContent() {
  //   const line = accepted() ? NegotiationScript.accept : NegotiationScript.refuse;
  //   return monsterLine(line) + continueButton('negotiation-finish');
  // }
  //
  //
  // function answerRow(buttons) {
  //   return `<div class='negotiation-answers' style='display:flex; flex-direction:column; gap:10px; align-items:flex-start'>${buttons}</div>`;
  // }

  return Object.freeze({
    init,
    open,
    close,
    render,
  });

})();
