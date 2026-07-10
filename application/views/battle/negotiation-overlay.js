global.NegotiationOverlay = (function() {

  // The negotiation overlay is a modal drawn over the live battle view. The NegotiationController drives it, handing us
  // finished HTML to render for each stage. Answer and continue clicks are delegated back to the controller. Dismissing
  // the overlay (the Escape key, via the WindowManager) simply closes it — the character's turn isn't spent, so the
  // player is free to pick a different command.

  function init() {
    X.onClick('#negotiationOverlay .negotiation-answer', event => {
      NegotiationController.answer(event.target.dataset.tone);
    });
    X.onClick('#negotiationOverlay .negotiation-advance', () => { NegotiationController.advance(); });
    X.onClick('#negotiationOverlay .negotiation-finish', () => { NegotiationController.finish(); });
  }

  function open() {
    X.loadDocument('#negotiationOverlay','views/negotiation-overlay.html');
    WindowManager.push(NegotiationOverlay);
    X.removeClass('#negotiationOverlay','hide');
    X.removeClass('#overlayCover','hide');
  }

  function render(content) {
    X.fill('#negotiationOverlayContent', X.createElement(`<div class='negotiation' style='padding:40px'>${content}</div>`));
  }

  function close() {
    WindowManager.remove(NegotiationOverlay);
    X.empty('#negotiationOverlay');
    X.addClass('#negotiationOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  return Object.freeze({
    init,
    open,
    render,
    close,
  });

})();
