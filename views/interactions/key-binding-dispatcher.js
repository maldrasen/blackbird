global.KeyBindingDispatcher = (function() {

  // The contexts that can own the keyboard, in registration order. A context is a UI state that knows whether it's
  // showing and how to perform one of its actions. Only one context should be active at a time. Views register
  // themselves during their init(), which may run before this module's init(), so registering only records the
  // context.
  const contexts = [];

  function init() {
    window.addEventListener('keydown', handleKeyDown);
  }

  function register(context, { isActive, perform }) {
    contexts.push({ context, isActive, perform });
  }

  // The bindings are looked up on every key press rather than at registration because the options can change at any
  // time.
  function handleKeyDown(event) {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) { return; }
    if (isTyping() || isModalOpen()) { return; }

    for (const { context, isActive, perform } of contexts) {
      if (isActive() === false) { continue; }

      const action = KeyBindings.getAction(context, event.code);
      if (action == null) { continue; }

      event.preventDefault();
      return perform(action);
    }
  }

  function isTyping() {
    const element = document.activeElement;
    return element != null && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable);
  }

  // Anything sitting over the main content owns the keyboard while it's open, even if it doesn't use it.
  function isModalOpen() {
    return WindowManager.hasWindows()
        || MainMenu.isVisible()
        || ConsoleView.isVisible()
        || Select.isOpen()
        || Confirmation.isVisible()
        || NegotiationOverlay.isOpen()
        || MainContent.isHalted();
  }

  return {
    init,
    register,
  };

})();
