global.LoadOverlay = (function() {

  function init() {
    X.onClick('#loadOverlay a.close-button', WindowManager.pop);
  }

  // The overlay is rebuilt every time it's opened because the list of saved games can change between opens.
  function open() {
    X.loadDocument('#loadOverlay','views/load-overlay.html');
    MainMenu.hide();
    X.removeClass('#loadOverlay','hide');
    WindowManager.push(LoadOverlay);
  }

  function close() {
    X.addClass('#loadOverlay','hide');
    MainMenu.show();
  }

  return {
    init,
    open,
    close,
  };

})();
