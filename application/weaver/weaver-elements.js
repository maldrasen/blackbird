global.WeaverElements = (function() {

  // TODO: If we need to display multiple result blocks we should do that with a different function, adding each block
  //       to the list.


  // Result blocks are used to display the mechanical result of a choice. They're block elements so they should only
  // be added to a paragraph sized template that's already detailing the results of an action. A result can be given
  // options to change how the block is styled:
  //  - classname: (optional) [gain, loss]
  //  - icon (todo)
  function resultBlock(text, options={}) {
    return `<ul class='result-blocks'><li class='result-block ${options.classname}'>${text}</li></ul>`;
  }

  return Object.freeze({
    resultBlock
  });

})();