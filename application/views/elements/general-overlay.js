global.GeneralOverlay = (function() {

  let locked = false;

  function init() {
    X.onClick('#generalOverlay .close-button', close);
  }

  /**
   * - `content` A single HTML element.
   * - `options.classname` [small, narrow] Optional class name for the overlay.
   * - `options.hideFooter` True if footer should be hidden.
   * - `options.preventClose` True if the overlay can only be closed programmatically.
   */
  function open(content, options={}) {
    if (isOpen()) { throw new Error(`The GeneralOverlay is already open.`); }

    locked = (options.preventClose === true);

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

  // The overlay footer is a button row, so it expects the content to be a button or an array of buttons, though I
  // suppose you could just shove anything you wanted into it, you filthy bastard.
  function setFooterContent(buttons) {
    X.fill('#generalOverlay .overlay-footer', buttons);
  }

  // The close() function should only be called by the WindowManager.
  function close() {
    X.empty('#generalOverlay');
    X.addClass('#generalOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  function isOpen() {
    return X.hasClass('#generalOverlay','hide') === false;
  }

  return Object.freeze({
    init,
    open,
    setFooterContent,
    close,
    isOpen,
    unlock: () => { locked = false; },
    isLocked: () => { return locked; },
  })

})();