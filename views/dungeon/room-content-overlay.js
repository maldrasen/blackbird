global.RoomContentOverlay = (function() {

  function init() {
    X.onClick('#roomContentContinue', close);
  }

  function open(result) {
    GeneralOverlay.open(build(result), { classname:'small' });
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

  // TODO: The loot list is a placeholder. Loot display will eventually be a proper loot panel shared with the after
  //       battle enlighten view.

  function addLoot(content, loot) {
    if (loot && loot.length > 0) {
      const list = X.createElement(`<ul class='loot-list'></ul>`);
      loot.forEach(item => {
        list.appendChild(X.createElement(`<li>${Article.lookup(item.code).getName()} &times; ${item.count}</li>`));
      });
      content.appendChild(list);
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
