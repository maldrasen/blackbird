global.Episode = (function() {
  const $episodes = {};

  const views = {
    'novel': `views/episode-novel.html`,
    'centered': `views/episode-centered.html`,
  }

  function register(code,data) {
    $episodes[code] = data;
  }

  function getAllCodes() {
    return Object.keys($episodes);
  }

  function lookup(code) {
    if ($episodes[code] === null) { throw `Bad episode code [${code}]` }

    const episode = { ...$episodes[code] };

    function getLayout() {
      return episode.layout || 'novel';
    }

    function getBackground() {
      const location = GameState.getCurrentLocation();
      if (episode.background) { return episode.background; }
      if (location) { return Location.lookup(location).getBackground(); }
      return 'backgrounds/episode.jpg';
    }

    return Object.freeze({
      getCode: () => { return code; },
      getContent: () => { return views[getLayout()]; },
      getEndFunction: () => { return episode.endFunction; },
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
