global.WindowManager = (function() {

  let $windowStack = [];

  function init() {
    X.onCodeDown(KeyCodes.Escape,true,() => {
      if (Console.isVisible()) { return Console.hide(); }
      if (selectVisible()) { return removeSelect(); }
      if (Confirmation.isVisible()) { return Confirmation.cancel(); }
      if ($windowStack.length > 0) { return pop() }

      if (!MainMenu.isVisible()) {
        MainMenu.open();
        push(MainMenu);
      }
    });
  }

  function push(modal) {
    $windowStack.push(modal);
  }

  function pop() {
    $windowStack.pop().close();
  }

  function remove(model) {
    const index = $windowStack.indexOf(model);
    if (index >= 0) {
      $windowStack.splice(index,1);
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