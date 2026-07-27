global.NegotiationOverlay = (function() {

  function init() {
    X.onClick(`#negotiationFrame`, advance);
    X.onClick('#negotiationFrame .answer', answer);
  }

  function open() {
    X.removeClass('#negotiationOverlay','hide');
    displayGreeting();
  }

  function clear() {
    X.empty(`#negotiationFrame .dialog`);
    X.empty(`#negotiationFrame .answers`);
  }

  function close() {
    X.addClass('#negotiationOverlay','hide');
    clear();
  }

  function advance() {
    if (X.hasClass('#negotiationFrame','can-advance')) {
      X.removeClass('#negotiationFrame','can-advance');
      NegotiationSystem.advance();
    }
  }

  function answer(event) {
    const tone = event.target.dataset.tone;
    NegotiationSystem.answer(tone);
  }

  function displayGreeting() {
    X.addClass(`#negotiationFrame`,'can-advance');
    X.fill('#negotiationFrame .dialog', X.createElement(`
      <p class='greeting'>${weave(NegotiationSystem.getState().getGreeting())}</p>
    `));
  }

  function renderQuestion(data) {
    const question = NegotiationQuestion.lookup(data.questionCode);

    clear();

    X.append('#negotiationFrame .dialog', X.createElement(`<p class='question'>${weave(question.getText())}</p>`));
    Object.entries(question.getAnswers()).forEach(([tone,text]) => {
      X.append('#answers', buildButton(weave(text),tone));
    });
  }

  function renderRequest(request) {
    clear();
    X.append('#negotiationFrame .dialog', X.createElement(`<p class='request'>${request}</p>`));
    X.append('#answers', buildButton('Yes','yes'))
    X.append('#answers', buildButton('No','no'))
  }

  function renderResolution() {
    clear();

    const text = NegotiationSystem.getState().getResolutionText();

    X.append('#negotiationFrame .dialog', X.createElement(`<p class='request'>${weave(text)}</p>`));
  }

  function buildButton(label,tone) {
    return X.createElement(`<li><a href='#' class='button answer' data-tone='${tone}'>${label}</a></li>`);
  }

  function buttonCount() {
    return document.querySelectorAll(`#negotiationFrame .answer`).length;
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
