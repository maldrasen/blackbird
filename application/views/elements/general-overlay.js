global.GeneralOverlay = (function() {

  let locked = false;

  function init() {
    X.onClick('#generalOverlay .close-button', close);
  }

  /**
   * - `content` A single HTML element.
   * - `options.classname` [small, narrow] Optional class name for the overlay.
   * - `options.hideFooter` True if footer should be hidden.
   * - `options.preventClose` True if the overlay can only be closed programmatically. The WindowManager won't pop a
   *    locked overlay, so the escape key won't close it either.
   */
  function open(content, options={}) {
    locked = options.preventClose === true;

    X.loadDocument('#generalOverlay','views/general-overlay.html');
    X.fill('#generalOverlayContent',content);

    WindowManager.push(GeneralOverlay);
    X.removeClass('#generalOverlay','hide');
    X.removeClass('#overlayCover','hide');

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
    locked = false;
    X.empty('#generalOverlay');
    X.addClass('#generalOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  return Object.freeze({
    init,
    open,
    close,
    isLocked: () => { return locked; },
  })

})();