global.PartyOverlay = (function() {

  function init() {
    X.onClick('#partyOverlay .close-button', close);
  }

  function open() {
    X.loadDocument('#partyOverlay','views/party-overlay.html');

    WindowManager.push(PartyOverlay);
    X.removeClass('#partyOverlay','hide');
    X.removeClass('#overlayCover','hide');

    Console.log(`Open Party Overlay`,{ system:'PartyOverlay' });
  }

  function close() {
    X.empty('#partyOverlay');
    X.addClass('#partyOverlay','hide');
    X.addClass('#overlayCover','hide');
    WindowManager.remove(PartyOverlay);
  }

  return Object.freeze({
    init,
    open,
    close,
  });

})();
