global.Select = (function() {

  function init() {
    X.first('#selectFrame').addEventListener('mouseleave', close)
  }

  // Build and open a custom select element.
  //  - items { label, value }    Only value is required. If we need more than a string we can add a content option
  //  - anchor                    Element to draw the select on top of.
  //  - callback                  Function called when item is chosen.
  function open(options) {
    const { selectFrame, selectPanel } = getFrames();
    const position = X.getPosition(options.anchor);

    selectFrame.style['left'] = `${position.left - 10}px`;
    selectFrame.style['top'] = `${position.bottom - position.height - 10}px`;

    options.items.forEach(item => {
      const element = X.createElement(`<li>${item.label || item.value}</li>`);

      element.addEventListener('click', () => {
        options.callback(item.value);
        close();
      });

      selectPanel.appendChild(element);
    });

    X.removeClass(selectFrame,'hide');
  }

  function close() {
    const { selectFrame, selectPanel } = getFrames();
    selectFrame.removeAttribute('style');
    X.addClass(selectFrame,'hide');
    X.empty(selectPanel);
  }

  function getFrames() {
    return {
      selectFrame: X.first('#selectFrame'),
      selectPanel: X.first('#selectFrame .select'),
    }
  }

  function isOpen() {
    return X.hasClass('#selectFrame','hide') === false;
  }

  return Object.freeze({
    init,
    open,
    close,
    isOpen,
  });

})();
