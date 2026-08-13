global.NegotiationInterface = (function() {

  function open() {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.open();
  }

  function close() {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.close();
  }

  function renderQuestion(data) {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.renderQuestion(data);
  }

  function renderDialog(message) {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.renderDialog(message);
  }

  function renderResolution() {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.renderResolution();
  }

  return Object.freeze({
    open,
    close,
    renderQuestion,
    renderDialog,
    renderResolution,
  });

})();
