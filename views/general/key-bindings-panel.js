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

    Object.entries(actions).forEach(([action, { name }]) => {
      const button = X.createElement(`<a href='#' class='button key-button' data-context='${context}' data-action='${action}'></a>`);
      showKey(button, bindings[context][action]);

      grid.appendChild(X.createElement(`<div class='label'>${name}</div>`));
      grid.appendChild(X.createElement(`<div class='key'></div>`)).appendChild(button);
    });

    return section;
  }

  function showKey(button, code) {
    button.textContent = (code == null) ? 'None' : KeyBindings.labelFor(code);
    (code == null) ? X.addClass(button,'unbound') : X.removeClass(button,'unbound');
  }

  function updateConflicts() {
    const conflicts = KeyBindings.findConflicts(bindings);

    container.querySelectorAll('.key-button.conflict').forEach(button => { X.removeClass(button,'conflict'); });

    conflicts.forEach(conflict => {
      conflict.actions.forEach(action => {
        X.addClass(container.querySelector(`.key-button[data-context='${conflict.context}'][data-action='${action}']`),'conflict');
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
    showKey(capturing, bindings[capturing.dataset.context][capturing.dataset.action]);
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

  function setBinding(code) {
    bindings[capturing.dataset.context][capturing.dataset.action] = code;
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
