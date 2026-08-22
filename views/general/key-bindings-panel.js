global.KeyBindingsPanel = (function() {

  const columnCount = 2;

  let bindings = {};
  let onChange = null;

  // Renders a section for each context into the container. The panel keeps its own copy of the bindings to edit,
  // which is what the options overlay saves. The sections are dealt into whichever column is shortest so the tab
  // fills evenly.
  function build(container, current, options={}) {
    bindings = structuredClone(current);
    onChange = options.onChange || null;

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

  function getBindings() {
    return structuredClone(bindings);
  }

  return {
    build,
    getBindings,
  };

})();
