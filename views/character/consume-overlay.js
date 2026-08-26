global.ConsumeOverlay = (function() {

  function open(response) {
    GeneralOverlay.open(build(response), { classname:'tiny' });
  }

  function build(response) {
    const content = X.createElement(`<div id='consumeOverlay' class='padding'>
      <p class='story'>${response.story}</p>
    </div>`);

    appendResults(content, response.results);

    return content;
  }

  // Effects that did nothing return an empty result, so only the typed results become blocks.
  function appendResults(content, results) {
    const blocks = results.filter(result => result.type != null).map(result => describeResult(result));

    if (blocks.length > 0) {
      content.appendChild(X.createElement(WeaverElements.resultBlocks(blocks)));
    }
  }

  function describeResult(result) {
    if (result.type === 'add-health') {
      return { text:`Restored ${result.value} health`, options:{ classname:'gain' } };
    }
    if (result.type === 'add-mana') {
      return { text:`Restored ${result.value} ${result.color} mana`, options:{ classname:'gain' } };
    }
    return { text:`[TODO: Result block for ${result.type}]`, options:{} };
  }

  return {
    open,
  };

})();
