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
    Object.entries(question.getAnswers()).forEach(([key, answer]) => {
      X.append('#negotiationFrame .options', buildButton(key, weave(answer.text)));
    });
  }

  function renderDialog(message) {
    clear();
    X.addClass('#negotiationFrame','can-advance');
    X.append('#negotiationFrame .dialog', X.createElement(`<p>${weave(message)}</p>`));
  }

  function renderRequest(request) {
    clear();
    X.append('#negotiationFrame .dialog', X.createElement(`<p class='request'>${request}</p>`));
    X.append('#answers', buildButton('Yes','yes'))
    X.append('#answers', buildButton('No','no'))
  }

  function renderResolution() {
    clear();
    X.addClass('#negotiationFrame','can-advance');
    const text = NegotiationSystem.getState().getResolutionText();
    X.append('#negotiationFrame .dialog', X.createElement(`<p class='request'>${weave(text)}</p>`));
  }

  function buildButton(key, label) {
    return X.createElement(`<li><a href='#' class='button answer' data-key='${key}'>${label}</a></li>`);
  }

  function weave(text) {
    return Weaver(NegotiationSystem.getState().getContext()).weave(text);
  }

  return Object.freeze({
    init,
    open,
    close,
    renderQuestion,
    renderDialog,
    renderRequest,
    renderResolution,
  });

})();
