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

  // A page can specify a function to run after the page has been shown. This can be used to play an effect, or can
  // be used for hacky tweaks to the page output that isn't handled anywhere else.
  function executeOnShow() {
    if (typeof data.onShow === 'function') { data.onShow(); }
  }

  // Only render a button when it has no requirements or all its requirements are met.
  function getButtons() { return (data.buttons || []).filter(button => checkRequirements(button.requires)); }

  // Only render a page when it has no requirements or all its requirements are met.
  function meetsRequirements() { return checkRequirements(data.requires); }

  // Check page and button level requirements.
  function checkRequirements(requires) {
    return (requires == null) ? true : requires.every(requirement => requirement(EpisodeSystem.getState()));
  }

  return Object.freeze({
    getButtons,
    getContent,
    executeOnShow,
    meetsRequirements,
  });

};
