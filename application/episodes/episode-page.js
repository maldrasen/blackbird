global.EpisodePage = function(data) {

  function getContent() {
    if (typeof data.contentFunction === 'function') {
      return data.contentFunction();
    }
  }

  return Object.freeze({
    getButtons: () => { return data.buttons || [] },
    getContent
  });

};
