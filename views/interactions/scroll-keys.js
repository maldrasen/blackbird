global.ScrollKeys = (function() {

  function init() {
    window.addEventListener('keydown', handleKeyDown);
  }

  // The :hover chain is in document order, root to deepest, so walking it
  // backwards finds the innermost scrollable element under the cursor.
  function findHoveredScrollable() {
    const hovered = document.querySelectorAll(':hover');
    for (let i = hovered.length - 1; i >= 0; i--) {
      const element = hovered[i];
      if (element.scrollHeight > element.clientHeight) {
        const overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') { return element; }
      }
    }
    return null;
  }

  function handleKeyDown(event) {
    const codes = [KeyCodes.PageUp, KeyCodes.PageDown, KeyCodes.Home, KeyCodes.End];
    if (codes.includes(event.code) === false) { return; }

    const panel = findHoveredScrollable();
    if (panel == null) { return; }

    event.preventDefault();
    event.stopPropagation();

    const page = panel.clientHeight * 0.9;
    if (event.code === KeyCodes.PageUp)   { panel.scrollBy({ top:-page }); }
    if (event.code === KeyCodes.PageDown) { panel.scrollBy({ top:page }); }
    if (event.code === KeyCodes.Home)     { panel.scrollTop = 0; }
    if (event.code === KeyCodes.End)      { panel.scrollTop = panel.scrollHeight; }
  }

  return { init };

})();
