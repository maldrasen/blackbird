global.LoadOverlay = (function() {

  function open() {
    GeneralOverlay.open(X.createElement(`<div id='loadOverlay' class='load'></div>`));
    X.loadDocument('#loadOverlay','views/load-overlay.html');
    MainMenu.hide();
  }

  return Object.freeze({
    open,
  });

})();
