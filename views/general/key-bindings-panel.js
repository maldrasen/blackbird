global.KeyBindingsPanel = (function() {

  const columnCount = 2;

  let bindings = {};
  let onChange = null;
  let capturing = null;

  function init() {
    X.onClick('.key-bindings-area .key-button', startCapture);

    // The capture phase runs before the escape chain, the console toggle and the key binding dispatcher, which all
    // listen on the window in the bubble phase.
    window.addEventListener('keydown', handleKeyDown, true);
  }

  // Renders a section for each context into the container. The panel keeps its own copy of the bindings to edit,
  // which is what the options overlay saves. The sections are dealt into whichever column is shortest so the tab
  // fills evenly.
  function build(container, current, options={}) {
    bindings = structuredClone(current);
    onChange = options.onChange || null;
    capturing = null;

    X.empty(container);

    const columns = Array.from({ length:columnCount }, () => {
      const element = X.createElement(`<div class='binding-column'></div>`);
      container.appendChild(element);
      return { element, rows:0 };
    });

    Object.entries(KeyBindings.getContexts()).forEach(([context, { name, actions }]) => {
      const column = columns.reduce((shortest, candidate) => (candidate.rows < shortest.rows) ? candidate : shortest);
      column.element.appendChild(buildSection(context, name, actions));
      column.rows += Object.keys(actions).length;
    });
  }

  function buildSection(context, name, actions) {
    const section = X.createElement(`<div class='binding-context options-area' data-context='${context}'>
      <h4 class='border-bottom'>${name}</h4>
      <div class='binding-grid'></div>
    </div>`);
    const grid = section.querySelector('.binding-grid');

    Object.entries(actions).forEach(([action, { name }]) => {
      grid.appendChild(X.createElement(`<div class='label'>${name}</div>`));
      grid.appendChild(X.createElement(`<div><a href='#' class='button key-button' data-context='${context}' data-action='${action}'>${KeyBindings.labelFor(bindings[context][action])}</a></div>`));
    });

    return section;
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
    capturing.textContent = KeyBindings.labelFor(bindings[capturing.dataset.context][capturing.dataset.action]);
    capturing = null;
  }

  // While a button is waiting for a key the key press belongs to it and nothing else. Escape backs out, keys that
  // can't be bound are ignored, and anything else becomes the new binding.
  function handleKeyDown(event) {
    if (capturing == null) { return; }

    event.preventDefault();
    event.stopImmediatePropagation();

    if (event.code === KeyCodes.Escape) { return cancelCapture(); }
    if (KeyBindings.isBindable(event.code) === false) { return; }

    bindings[capturing.dataset.context][capturing.dataset.action] = event.code;
    cancelCapture();
    if (onChange) { onChange(); }
  }

  function getBindings() {
    return structuredClone(bindings);
  }

  return {
    init,
    build,
    cancelCapture,
    getBindings,
  };

})();
