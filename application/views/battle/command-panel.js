global.CommandPanel = (function() {

  function show() {
    X.addClass('#textPanel','hide');
    X.removeClass('#commandPanel','hide');
  }

  // Hide the command panel as soon when a command is selected.
  function hide() {
    X.removeClass('#textPanel','hide');
    X.addClass('#commandPanel','hide');
  }

  function showCommands(commands) {
    console.log("Show Commands:", commands)
  }

  return Object.freeze({
    show,
    hide,
    showCommands,
  })

})();