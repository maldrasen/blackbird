global.GeneralOverlay = (function() {

  function init() {
    X.onClick('#generalOverlay .close-button', close);
  }

  /**
   * - `content` A single HTML element.
   * - `options.classname` [small, narrow] Optional class name for the overlay.
   * - `options.hideFooter` True if footer should be hidden.
   */
  function open(content, options={}) {
    X.loadDocument('#generalOverlay','views/general-overlay.html');
    X.fill('#generalOverlayContent',content);

    WindowManager.push(GeneralOverlay);
    X.removeClass('#generalOverlay','hide');
    X.removeClass('#overlayCover','hide');

    console.log("Options?",options)

    if (['small','narrow'].includes(options.classname)) {
      X.addClass('#generalOverlay .overlay',options.classname)
      X.addClass('#generalOverlay .overlay-footer',options.classname)
    }
    if (options.hideFooter) {
      X.addClass('#generalOverlay .overlay','no-footer')
      X.addClass('#generalOverlay .overlay-footer','hide')
    }

    ScrollingPanel({ id:'#generalOverlayScroll' });
  }

  function close() {
    X.empty('#generalOverlay');
    X.addClass('#generalOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  return Object.freeze({
    init,
    open,
    close,
  })

})();