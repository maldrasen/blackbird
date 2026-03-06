global.EpisodeController = (function() {

  let $episodeCode;
  let $context;

  function startEpisode(code, context) {
    $episodeCode = code;
    $context = context;
  }

  return Object.freeze({
    getEpisodeCode: () => { return $episodeCode; },
    getContext: () => { return $context; },
    startEpisode
  });

})();
