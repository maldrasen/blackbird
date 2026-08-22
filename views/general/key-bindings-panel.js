global.KeyBindingsPanel = (function() {

  let bindings = {};
  let onChange = null;

  // Renders a section for each context into the container. The panel keeps its own copy of the bindings to edit,
  // which is what the options overlay saves.
  function build(container, current, options={}) {
    bindings = structuredClone(current);
    onChange = options.onChange || null;

    X.empty(container);

    Object.entries(KeyBindings.getContexts()).forEach(([context, { name, actions }]) => {
      const section = X.createElement(`<div class='binding-context options-area' data-context='${context}'>
        <h4 class='border-bottom'>${name}</h4>
        <div class='binding-grid'></div>
      </div>`);
      const grid = section.querySelector('.binding-grid');

      Object.entries(actions).forEach(([action, { name }]) => {
        grid.appendChild(X.createElement(`<div class='label'>${name}</div>`));
        grid.appendChild(X.createElement(`<div><a href='#' class='button key-button' data-context='${context}' data-action='${action}'>${KeyBindings.labelFor(bindings[context][action])}</a></div>`));
      });

      container.appendChild(section);
    });
  }

  function getBindings() {
    return structuredClone(bindings);
  }

  return {
    build,
    getBindings,
  };

})();
