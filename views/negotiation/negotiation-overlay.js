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
    X.empty(`#negotiationFrame .options`);
  }

  function close() {
    X.addClass('#negotiationOverlay','hide');
    clear();
  }

  function isOpen() {
    return X.hasClass('#negotiationOverlay','hide') === false;
  }

  function advance() {
    if (X.hasClass('#negotiationFrame','can-advance')) {
      X.removeClass('#negotiationFrame','can-advance');
      NegotiationSystem.advance();
    }
  }

  function answer(event) {
    NegotiationSystem.answer(event.target.closest('a').dataset.key);
  }

  function displayGreeting() {
    X.addClass(`#negotiationFrame`,'can-advance');
    X.fill('#negotiationFrame .dialog', X.createElement(`
      <p class='greeting'>${weave(NegotiationSystem.getState().getGreeting())}</p>
    `));
  }

  function renderQuestion(data) {
    const question = NegotiationQuestion.lookup(data.question);

    clear();

    X.append('#negotiationFrame .dialog', X.createElement(`<p class='question'>${weave(question.getText())}</p>`));
    Object.entries(question.getAnswers(NegotiationSystem.getState().getContext())).forEach(([key, answer]) => {
      X.append('#negotiationFrame .options', buildButton(key, weave(answer.text)));
    });
  }

  function renderDialog(message) {
    clear();
    X.addClass('#negotiationFrame','can-advance');
    X.append('#negotiationFrame .dialog', X.createElement(`<p>${weave(message)}</p>`));
  }

  function renderResolution() {
    const state = NegotiationSystem.getState();
    const text = state.getResolutionText();
    const type = state.getResolution().type;

    clear();
    X.addClass('#negotiationFrame','can-advance');
    X.append('#negotiationFrame .dialog', X.createElement(`<div class='resolution ${type}'>${weave(text)}</div>`));
  }

  function buildButton(key, label) {
    return X.createElement(`<li><a href='#' class='button answer' data-key='${key}'>${label}</a></li>`);
  }

  function weave(text) {
    return Weaver(NegotiationSystem.getState().getContext()).weave(text);
  }

  return {
    init,
    open,
    close,
    isOpen,
    renderQuestion,
    renderDialog,
    renderResolution,
  };

})();
