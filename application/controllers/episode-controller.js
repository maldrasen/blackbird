global.EpisodeController = (function() {

  let $episodeCode;
  let $nextPage;
  let $pageIndex;
  let $context;

  function startEpisode(code, context) {
    $episodeCode = code;
    $nextPage = null;
    $pageIndex = null;
    $context = context;
  }

  function endEpisode() {

  }

  // This controller should always have the data we need to look up the next page. If this page contains some kind of
  // question, clicking an option will set the nextPage before calling this. If not, the EpisodePage model should have
  // the index of the current page; then we can look up the next page from that. Pages will still need individual
  // requirements, and we can skip pages that don't have their requirements met. Pages might need a goto type property
  // to skip forward to a page id as well. Page gotos should only ever go forward though to keep things sane.
  function nextPage() {
    const episode = Episode.lookup($episodeCode);

    if ($nextPage != null) {
      console.log(`TODO: Render page with id ${$nextPage}`);
      $nextPage = null;
      return;
    }

    // TODO: We'll need to loop until we find a page that has all its requirements met.
    $pageIndex = ($pageIndex == null) ? 0 : $pageIndex+1;

    const page = episode.getPages()[$pageIndex]
    if (page == null) {
      return endEpisode();
    }

    EpisodeView.setPageContent(EpisodePage(page));
  }

  return Object.freeze({
    getEpisodeCode: () => { return $episodeCode; },
    getContext: () => { return $context; },
    startEpisode,
    nextPage,
  });

})();
