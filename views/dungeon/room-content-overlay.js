global.RoomContentOverlay = (function() {

  function init() {
    X.onClick('#roomContentContinue', close);
  }

  function open(result) {
    GeneralOverlay.open(build(result), { classname:'tiny' });
    GeneralOverlay.setFooterContent(buildContinueButton());
  }

  function build(result) {
    const content = X.createElement(`<div id='roomContentOverlay'>
      ${title(result)}
      <div class='result-text'>${result.text}</div>
    </div>`);

    addDamage(content, result);
    addLoot(content, result.loot);

    return content;
  }

  function title(result) {
    return result.title ? `<h3 class='title'>${result.title}</h3>` : '';
  }

  function addDamage(content, result) {
    if (result.damage > 0) {
      WeaverElements.appendResultBlock(content,
        `${Character(result.target).getName()} takes ${result.damage} damage.`,
        { classname:'damage' });
    }
  }

  function addLoot(content, loot) {
    if (loot && loot.length > 0) {
      content.appendChild(X.createElement(WeaverElements.lootBlock(loot)));
    }
  }

  function buildContinueButton() {
    return X.createElement(`<a id='roomContentContinue' href='#' class='button button-primary'>Continue</a>`);
  }

  function close() {
    WindowManager.pop();
  }

  return {
    init,
    open,
  };

})();
