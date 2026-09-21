global.KeyBindingDispatcher = (function() {

  const contexts = [];

  function init() {
    window.addEventListener('keydown', handleKeyDown);
  }

  // A held key repeats, which most contexts don't want: holding the attack key shouldn't attack over and over. A
  // context that does want the repeats, like walking through the dungeon, has to ask for them with allowRepeat.
  function register(context, { isActive, perform, allowRepeat=false }) {
    contexts.push({ context, isActive, perform, allowRepeat });
  }

  function handleKeyDown(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) { return; }
    if (isTyping() || WindowManager.isModalOpen()) { return; }

    for (const { context, isActive, perform, allowRepeat } of contexts) {
      if (isActive() === false) { continue; }
      if (event.repeat && allowRepeat === false) { continue; }

      const action = KeyBindings.getAction(context, event.code);
      if (action == null) { continue; }

      event.preventDefault();
      return perform(action, { repeat:event.repeat });
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
