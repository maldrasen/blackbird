global.WindowManager = (function() {

  let windowStack = [];

  function init() {
    X.onCodeDown(KeyCodes.Escape,true,() => {
      if (Console.isVisible()) { return Console.hide(); }
      if (selectVisible()) { return removeSelect(); }
      if (Confirmation.isVisible()) { return Confirmation.cancel(); }
      if (windowStack.length > 0) { return pop() }

      if (!MainMenu.isVisible()) {
        MainMenu.open();
        push(MainMenu);
      }
    });
  }

  function push(modal) {
    windowStack.push(modal);
  }

  // A locked window can only be closed programmatically, so it stays on the stack until whatever locked it lets go.
  function pop() {
    const modal = windowStack[windowStack.length - 1];
    if (modal.isLocked && modal.isLocked()) { return; }
    windowStack.pop().close();
  }

  function remove(model) {
    const index = windowStack.indexOf(model);
    if (index >= 0) {
      windowStack.splice(index,1);
    }
  }

  function selectVisible() {
    return X.hasClass('#selectArea','hide') === false;
  }

  function removeSelect() {
    X.addClass('#selectArea','hide');
    X.first('#selectArea').innerHTML = '';
  }

  return Object.freeze({
    init,
    push,
    pop,
    remove,
  });

})();
