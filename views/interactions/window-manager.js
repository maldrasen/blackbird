global.WindowManager = (function() {

  let windowStack = [];

  function init() {
    X.onCodeDown(KeyCodes.Escape,true,() => {
      if (ConsoleView.isVisible()) { return ConsoleView.hide(); }
      if (Select.isOpen()) { return Select.close(); }
      if (Confirmation.isVisible()) { return Confirmation.cancel(); }
      if (windowStack.length > 0) { return pop() }
      if (FormationPanel.isTargeting()) { return FormationPanel.cancelTargeting(); }
      if (DungeonView.isWalking()) { return DungeonView.stopWalking(); }

      if (!MainMenu.isVisible()) {
        MainMenu.open();
        push(MainMenu);
      }
    });
  }

  function push(modal) {
    windowStack.push(modal);
  }

  function isModalOpen() {
    return windowStack.length > 0
      || MainMenu.isVisible()
      || ConsoleView.isVisible()
      || Select.isOpen()
      || Confirmation.isVisible()
      || NegotiationOverlay.isOpen()
      || MainContent.isHalted();
  }

  // A locked window can only be closed programmatically, so it stays on the stack until whatever locked it lets go.
  function pop() {
    const modal = windowStack[windowStack.length - 1];
    if (modal.isLocked && modal.isLocked()) { return; }
    Tooltip.close();
    windowStack.pop().close();
  }

  function remove(model) {
    const index = windowStack.indexOf(model);
    if (index >= 0) {
      windowStack.splice(index,1);
    }
  }

  return {
    init,
    push,
    pop,
    remove,
    isModalOpen,
  };

})();
