global.WeaverElements = (function() {

  function appendResultBlock(element, text, options={}) {
    element.appendChild(X.createElement(resultBlock(text,options)));
  }

  // Result blocks are used to display the mechanical result of a choice. They're block elements so they should only
  // be added to a paragraph sized template that's already detailing the results of an action. A result can be given
  // options to change how the block is styled:
  //  - classname: (optional) [gain, loss, damage]
  //  - icon (todo)
  function resultBlock(text, options={}) {
    return resultBlocks([{ text:text, options:options }]);
  }

  // Renders multiple results as blocks in a single list. Each entry is a { text, options } object.
  function resultBlocks(blocks) {
    const items = blocks.map(block => {
      const classname = (block.options || {}).classname || '';
      return `<li class='result-block ${classname}'>${block.text}</li>`;
    });

    return `<ul class='result-blocks'>${items.join('')}</ul>`;
  }

  function telepathy(text) { return `<div class='telepathy'>《 ${text} 》</div>` }

  return {
    appendResultBlock,
    resultBlock,
    resultBlocks,
    telepathy,
  };

})();
