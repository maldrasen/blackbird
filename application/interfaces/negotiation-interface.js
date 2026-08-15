global.NegotiationInterface = (function() {

  function viewActive() {
    if (Environment.viewPresent() === false) { return false }
    return NegotiationOverlay.isOpen();
  }

  // Opening is what makes the overlay active, so this one can only check for the client. Negotiations always start
  // from within a battle round, so the battle view holding the overlay is showing.
  function open() {
    if (Environment.viewPresent() === false) { return; }
    NegotiationOverlay.open();
  }

  function close() {
    if (viewActive()) { NegotiationOverlay.close(); }
  }

  function renderQuestion(data) {
    if (viewActive()) { NegotiationOverlay.renderQuestion(data); }
  }

  function renderDialog(message) {
    if (viewActive()) { NegotiationOverlay.renderDialog(message); }
  }

  function renderResolution() {
    if (viewActive()) { NegotiationOverlay.renderResolution(); }
  }

  return {
    open,
    close,
    renderQuestion,
    renderDialog,
    renderResolution,
  };

})();
