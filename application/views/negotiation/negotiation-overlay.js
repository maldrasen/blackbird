global.NegotiationOverlay = (function() {

  function init() {
    X.onClick(`#generalOverlay .overlay`, advance);
    X.onClick('#negotiation .answer', answer);
  }

  function open(options) {
    GeneralOverlay.open(build(), { classname:'small', hideFooter:true, preventClose:true });
    displayGreeting(options.greeting);
  }

  function build() {
    return X.createElement(`<div id="negotiation">
      <div id="dialog"></div>
      <ul id="answers"></ul>
    </div>`);
  }

  function clear() {
    X.empty(`#negotiation #dialog`);
    X.empty(`#negotiation #answers`);
  }

  function close() {
    GeneralOverlay.close();
  }

  // We register the advance event on the generalOverlay because we want a click anywhere on the overlay to advance
  // the text as the negotiation element could be much smaller than the overlay. This registers a listener on any
  // generalOverlay so we want to make sure the event only fires when this overlay has the negotiation element.
  function advance(event) {
    if (event.target.querySelector('#negotiation') && buttonCount() === 0) {
      NegotiationSystem.advance();
    }
  }

  function answer(event) {
    const tone = event.target.dataset.tone;
    NegotiationSystem.answer(tone);
  }

  function displayGreeting(greeting) {
    X.fill('#dialog', X.createElement(`<p class='greeting'>${weave(greeting)}</p>`));
  }

  function renderQuestion(data) {
    const question = NegotiationQuestion.lookup(data.questionCode);

    clear();

    X.append('#dialog', X.createElement(`<p class='question'>${weave(question.getText())}</p>`));
    Object.entries(question.getAnswers()).forEach(([tone,text]) => {
      X.append('#answers', buildButton(weave(text),tone));
    });
  }

  function renderRequest(request) {
    clear();
    X.append('#dialog', X.createElement(`<p class='request'>${request}</p>`));
    X.append('#answers', buildButton('Yes','yes'))
    X.append('#answers', buildButton('No','no'))
  }

  function renderResolution() {
    clear();

    const text = NegotiationSystem.getState().getResolutionText();

    X.append('#dialog', X.createElement(`<p class='request'>${weave(text)}</p>`));
  }

  function buildButton(label,tone) {
    return X.createElement(`<li><a href='#' class='button answer' data-tone='${tone}'>${label}</a></li>`);
  }

  function buttonCount() {
    return document.querySelectorAll(`#negotiation .answer`).length;
  }

  function weave(text) {
    return Weaver(NegotiationSystem.getState().getContext()).weave(text);
  }

  return Object.freeze({
    init,
    open,
    close,
    renderQuestion,
    renderRequest,
    renderResolution,
  });

})();
