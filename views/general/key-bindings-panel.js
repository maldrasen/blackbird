global.KeyBindingsPanel = (function() {

  const columnCount = 2;

  let container = null;
  let bindings = {};
  let onChange = null;
  let capturing = null;

  function init() {
    X.onClick('.key-bindings-area .key-button', startCapture);
    X.onClick('.restore-bindings-button', restoreDefaults);
    window.addEventListener('keydown', handleKeyDown, true);
  }

  function build(element, current, options={}) {
    container = element;
    bindings = structuredClone(current);
    onChange = options.onChange || null;
    capturing = null;

    render();
  }

  function render() {
    X.empty(container);

    const columnArea = X.createElement(`<div class='binding-columns'></div>`);
    container.appendChild(columnArea);

    const columns = Array.from({ length:columnCount }, () => {
      const element = X.createElement(`<div class='binding-column'></div>`);
      columnArea.appendChild(element);
      return { element, rows:0 };
    });

    Object.entries(KeyBindings.getContexts()).forEach(([context, { name, actions }]) => {
      const column = columns.reduce((shortest, candidate) => (candidate.rows < shortest.rows) ? candidate : shortest);
      column.element.appendChild(buildSection(context, name, actions));
      column.rows += Object.keys(actions).length;
    });

    updateConflicts();
  }

  function buildSection(context, name, actions) {
    const section = X.createElement(`<div class='binding-context options-area' data-context='${context}'>
      <h4 class='border-bottom'>${name}</h4>
      <div class='binding-grid'></div>
    </div>`);
    const grid = section.querySelector('.binding-grid');

    grid.appendChild(X.createElement(`<div></div>`));
    KeyBindings.getSlots().forEach(slot => {
      grid.appendChild(X.createElement(`<div class='slot-heading'>${StringHelper.titlecaseAll(slot)}</div>`));
    });

    Object.entries(actions).forEach(([action, { name }]) => {
      grid.appendChild(X.createElement(`<div class='label'>${name}</div>`));
      KeyBindings.getSlots().forEach(slot => { grid.appendChild(buildKey(context, action, slot)); });
    });

    return section;
  }

  function buildKey(context, action, slot) {
    const key = X.createElement(`<div class='key'></div>`);
    const button = X.createElement(
      `<a href='#' class='button key-button' data-context='${context}' data-action='${action}' data-slot='${slot}'></a>`);

    showKey(button, bindings[context][action][slot]);
    key.appendChild(button);
    return key;
  }

  function showKey(button, code) {
    button.textContent = (code == null) ? 'None' : KeyBindings.labelFor(code);
    (code == null) ? X.addClass(button,'unbound') : X.removeClass(button,'unbound');
  }

  function updateConflicts() {
    const conflicts = KeyBindings.findConflicts(bindings);

    container.querySelectorAll('.key-button.conflict').forEach(button => { X.removeClass(button,'conflict'); });

    // Only the buttons holding the contested key are marked, not the other binding of the same action.
    conflicts.forEach(conflict => {
      container.querySelectorAll(`.key-button[data-context='${conflict.context}']`).forEach(button => {
        if (bindingFor(button) === conflict.code) { X.addClass(button,'conflict'); }
      });
    });
  }

  function hasConflicts() {
    return KeyBindings.findConflicts(bindings).length > 0;
  }

  function restoreDefaults() {
    cancelCapture();
    bindings = KeyBindings.getDefaults();
    render();
    if (onChange) { onChange(); }
  }

  function startCapture(event) {
    cancelCapture();
    capturing = event.target.closest('.key-button');
    X.addClass(capturing,'capturing');
    capturing.textContent = 'Press a key…';
  }

  function cancelCapture() {
    if (capturing == null) { return; }
    X.removeClass(capturing,'capturing');
    showKey(capturing, bindingFor(capturing));
    capturing = null;
  }

  function handleKeyDown(event) {
    if (capturing == null) { return; }

    event.preventDefault();
    event.stopImmediatePropagation();

    if (event.code === KeyCodes.Escape) { return setBinding(null); }
    if (KeyBindings.isBindable(event.code) === false) { return; }

    setBinding(event.code);
  }

  function bindingFor(button) {
    return bindings[button.dataset.context][button.dataset.action][button.dataset.slot];
  }

  function setBinding(code) {
    bindings[capturing.dataset.context][capturing.dataset.action][capturing.dataset.slot] = code;
    cancelCapture();
    updateConflicts();
    if (onChange) { onChange(); }
  }

  function getBindings() {
    return structuredClone(bindings);
  }

  return {
    init,
    build,
    cancelCapture,
    hasConflicts,
    getBindings,
  };

})();
