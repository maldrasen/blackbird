global.Episode = (function() {
  const episodes = {};

  const views = {
    'novel': `views/episode-novel.html`,
    'centered': `views/episode-centered.html`,
    'large-centered': `views/episode-large-centered.html`,
  }

  function register(code,data) {
    if (data.queue) { validateQueue(data.queue) }
    episodes[code] = data;
  }

  // The queue property is complex enough to need a validator.
  function validateQueue(queue) {

  }

  function getAllCodes() {
    return Object.keys(episodes);
  }

  function lookup(code) {
    if (episodes[code] == null) { throw new Error(`Bad episode code [${code}]`); }

    const episode = { ...episodes[code] };

    function getLayout() {
      return episode.layout || 'novel';
    }

    function getBackground() {
      const location = GameSystem.getState().getCurrentLocation();
      if (episode.background) { return episode.background; }
      if (location) { return Location.lookup(location).getBackground(); }
      return 'backgrounds/episode.jpg';
    }

    return Object.freeze({
      getCode: () => { return code; },
      getContent: () => { return views[getLayout()]; },
      getEndFunction: () => { return episode.endFunction; },
      getQueue: () => { return episode.queue; },
      getPages: () => { return episode.pages; },
      getBackground,
      getLayout,
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
