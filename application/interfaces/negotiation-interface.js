global.NegotiationInterface = (function() {

  function open() {
    if (Tests.running()) { return; }
    NegotiationOverlay.open();
  }

  function close() {
    if (Tests.running()) { return; }
    NegotiationOverlay.close();
  }

  function renderQuestion(data) {
    if (Tests.running()) { return; }
    NegotiationOverlay.renderQuestion(data);
  }

  function renderDialog(message) {
    if (Tests.running()) { return; }
    NegotiationOverlay.renderDialog(message);
  }

  function renderResolution() {
    if (Tests.running()) { return; }
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
