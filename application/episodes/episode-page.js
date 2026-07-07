global.EpisodePage = function(data) {

  // Because of the way X.createElement() works the page content needs to be a single element. Rather than figuring
  // out if the content is something like "<div></div> <div></div>" which would silently drop the second div, we just
  // always wrap the content in another div, because a webapp can't possibly have too many of those.
  function getContent() {
    return `<div>${resolveContent()}</div>`;
  }

  function resolveContent() {
    if (typeof data.contentFunction === 'function') { return data.contentFunction(); }
    if (typeof data.content === 'string') { return data.content; }
    throw new Error(`A page should have content or a contentFunction`);
  }

  function executeOnShow() {
    if (typeof data.onShow === 'function') { data.onShow(); }
  }

  return Object.freeze({
    getButtons: () => { return data.buttons || [] },
    getContent,
    executeOnShow,
  });

};
