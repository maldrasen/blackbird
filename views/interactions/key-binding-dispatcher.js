global.KeyBindingDispatcher = (function() {

  const contexts = [];

  // The keys that are down and have a release owed to them, by key code.
  const held = {};

  function init() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', releaseAll);
  }

  // A held key repeats, which most contexts don't want: holding the attack key shouldn't attack over and over. A
  // context that does want the repeats, like walking through the dungeon, has to ask for them with allowRepeat. A
  // context that needs to know when a key is let go can pass a release function, which is called with the action.
  function register(context, { isActive, perform, release=null, allowRepeat=false }) {
    contexts.push({ context, isActive, perform, release, allowRepeat });
  }

  function handleKeyDown(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) { return; }
    if (isTyping() || WindowManager.isModalOpen()) { return; }

    for (const { context, isActive, perform, release, allowRepeat } of contexts) {
      if (isActive() === false) { continue; }
      if (event.repeat && allowRepeat === false) { continue; }

      const action = KeyBindings.getAction(context, event.code);
      if (action == null) { continue; }

      if (release != null) { held[event.code] = { release, action }; }

      event.preventDefault();
      return perform(action, { repeat:event.repeat });
    }
  }

  // The release goes to whoever performed the key's action when it went down, whatever has happened since. A context
  // going inactive or a modal opening while the key was held doesn't leave anyone waiting on a release.
  function handleKeyUp(event) {
    releaseKey(event.code);
  }

  // The key up never arrives for a key that's let go while the window doesn't have focus.
  function releaseAll() {
    Object.keys(held).forEach(releaseKey);
  }

  function releaseKey(code) {
    const entry = held[code];
    if (entry == null) { return; }

    delete held[code];
    entry.release(entry.action);
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
