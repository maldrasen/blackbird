global.EpisodePage = function(data) {

  function getContent() {
    if (typeof data.contentFunction === 'function') { return data.contentFunction(); }
    if (typeof data.content === 'string') { return data.content; }
    throw new Error(`A page should have content or a contentFunction`);
  }

  return Object.freeze({
    getButtons: () => { return data.buttons || [] },
    getContent
  });

};
