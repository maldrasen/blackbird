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

  function getContext() {
    return NegotiationSystem.getState().getContext();
  }

  function weave(text) {
    return Weaver(getContext()).weave(text);
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

  function renderInteraction(interaction) {
    clear();

    switch (interaction.type) {
      case 'question': return renderQuestion(interaction);
      case 'request':  return renderRequest(interaction);
    }
    throw new Error(`Unknown interaction type [${interaction.type}]`);
  }

  function renderQuestion(interaction) {
    const question = NegotiationQuestion.lookup(interaction.code);
    const answers = question.getAnswers(getContext());

    renderPrompt('question', question.getText());
    Object.entries(answers).forEach(([key, answer]) => renderAnswer(key, answer.text));
  }

  // The request text and the answer text can both depend on the parameters rolled when the request was picked, so
  // they're read from the interaction rather than the record.
  function renderRequest(interaction) {
    const request = NegotiationRequest.lookup(interaction.code);
    const answers = request.getAnswers(getContext());

    renderPrompt('request', interaction.requestText);
    Object.keys(answers).forEach(key => {
      renderAnswer(key, request.getAnswerText(key, getContext(), interaction.requestParameters));
    });
  }

  function renderPrompt(type, text) {
    X.append('#negotiationFrame .dialog', X.createElement(`<p class='${type}'>${weave(text)}</p>`));
  }

  function renderAnswer(key, text) {
    X.append('#negotiationFrame .options', buildButton(key, weave(text)));
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

  return {
    init,
    open,
    close,
    isOpen,
    renderInteraction,
    renderDialog,
    renderResolution,
  };

})();
