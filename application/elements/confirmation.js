global.Confirmation = (function() {

  let $yesFunction;
  let $noFunction;

  function init() {
    X.onClick('#confirmationDialog .no-button', cancel);
    X.onClick('#confirmationDialog .yes-button', confirm);
  }

  // Options:
  //   text: string
  //   element: element
  //   onConfirm: function
  //   onCancel: function
  function show(options) {
    // ClockManager.forcePause();
    $yesFunction = options.onConfirm;
    $noFunction = options.onCancel;

    if (options.element) {
      X.fill('#confirmationDialog .confirm-window .content', options.element);
    }
    if (options.text) {
      X.first('#confirmationDialog .confirm-window .content').innerHTML = `<div class='confirm-text'>${options.text}</div>`;
    }

    X.removeClass('#confirmationDialog','hide');
  }

  function hide() {
    // ClockManager.unforcePause();
    X.addClass('#confirmationDialog','hide');
  }

  function cancel() {
    if (typeof $noFunction === 'function') { $noFunction(); }
    hide()
  }

  function confirm() {
    if (typeof $yesFunction === 'function') { $yesFunction(); }
    hide()
  }

  function isVisible() {
    return X.hasClass('#confirmationDialog','hide') === false;
  }

  return Object.freeze({
    init,
    show,
    cancel,
    isVisible,
  });

})();
