global.TrapOverlay = (function() {

  function init() {
    X.onClick('#trapContinue', close);
  }

  function open(trap) {
    GeneralOverlay.open(build(trap), { classname:'small' });
    GeneralOverlay.setFooterContent(buildContinueButton());
  }

  function build(trap) {
    const content = X.createElement(`<div id='trapOverlay'>
      <div class='trap-text'>${trap.text}</div>
    </div>`);

    if (trap.damage > 0) {
      content.appendChild(X.createElement(
        `<div class='trap-damage'>${Character(trap.target).getName()} takes ${trap.damage} damage.</div>`));
    }

    return content;
  }

  function buildContinueButton() {
    return X.createElement(`<a id='trapContinue' href='#' class='button button-primary'>Continue</a>`);
  }

  function close() {
    WindowManager.pop();
  }

  return {
    init,
    open,
  };

})();
