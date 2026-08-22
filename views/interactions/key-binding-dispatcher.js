global.KeyBindingDispatcher = (function() {

  const contexts = [];

  function init() {
    window.addEventListener('keydown', handleKeyDown);
  }

  function register(context, { isActive, perform }) {
    contexts.push({ context, isActive, perform });
  }

  function handleKeyDown(event) {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) { return; }
    if (isTyping() || WindowManager.isModalOpen()) { return; }

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

  return {
    init,
    register,
  };

})();
