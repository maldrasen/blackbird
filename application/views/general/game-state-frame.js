global.GameStateFrame = (function() {

  function init() {

  }

  function show() {
    X.removeClass('#gameStateFrame','hide');
    update();
  }

  function hide() {
    X.addClass('#gameStateFrame','hide');
  }

  function update() {
    console.log("Update Game State...")
  }

  return Object.freeze({
    init,
    show,
    hide,
    update,
  })

})();