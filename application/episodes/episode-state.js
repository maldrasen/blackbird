global.EpisodeState = function(cd, ctx) {
  const code = cd;
  const context = ctx;
  const properties = {};

  let nextPage = null;
  let pageIndex = null;

  // The state should always have the data we need to find the next page. If this page contains some kind of question,
  // clicking an option will set the nextPage before calling this. If not, the EpisodePage model should have the index
  // of the current page; then we can look up the next page from that. Pages will still need individual requirements,
  // and we can skip pages that don't have their requirements met. Pages might need a goto type property to skip
  // forward to a page id as well. Page gotos should only ever go forward though to keep things sane. This function
  // should always return an EpisodePage or null. This is all very much in an in progress state still.
  function getNextPage() {
    const episode = Episode.lookup(code);

    if (nextPage != null) {
      console.log(`TODO: Return an episode page with id:${nextPage}`);
      nextPage = null;
      return;
    }

    // TODO: We'll need to loop until we find a page that has all its
    //  requirements met, or we find a null.
    pageIndex = (pageIndex == null) ? 0 : pageIndex+1;
    const page = episode.getPages()[pageIndex]
    if (page == null) { return null; }

    return EpisodePage(page);
  }

  return Object.freeze({
    getCode: () => { return code; },
    getContext: () => { return context; },
    getChoices: () => { return choices; },
    getEpisode: () => { return Episode.lookup(code); },
    getNextPage,

    getProperties: () => { return properties },
    setPropertyValue: (key,value) => { properties[key] = value; },
    getPropertyValue: key => { return properties[key]; },
  });

}