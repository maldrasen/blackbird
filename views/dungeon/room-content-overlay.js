global.RoomContentOverlay = (function() {

  function init() {
    X.onClick('#roomContentContinue', close);
  }

  // Show the result of a room contents command, an object holding the result text and an optional loot array of
  // { code, count } articles.
  function open(result) {
    GeneralOverlay.open(build(result), { classname:'small' });
    GeneralOverlay.setFooterContent(buildContinueButton());
  }

  // TODO: The loot list is a placeholder. Loot display will eventually be a proper loot panel shared with the after
  //       battle enlighten view.
  function build(result) {
    const content = X.createElement(`<div id='roomContentOverlay'>
      <div class='result-text'>${result.text}</div>
    </div>`);

    if (result.loot && result.loot.length > 0) {
      const list = X.createElement(`<ul class='loot-list'></ul>`);
      result.loot.forEach(item => {
        list.appendChild(X.createElement(`<li>${Article.lookup(item.code).getName()} &times; ${item.count}</li>`));
      });
      content.appendChild(list);
    }

    return content;
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
