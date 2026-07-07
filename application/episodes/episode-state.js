global.EpisodeState = function(code, context) {
  const properties = {};

  let nextPage = null;
  let pageIndex = null;

  // The state should always have the data we need to find the next page. If this page contains some kind of question,
  // clicking an option will set the nextPage before calling this. If not, the EpisodePage model should have the index
  // of the current page; then we can look up the next page from that. We skip forward past any pages whose
  // requirements aren't met. Pages might need a goto type property to skip forward to a page id as well. Page gotos
  // should only ever go forward though to keep things sane. This function should always return an EpisodePage or null.
  function getNextPage() {
    const episode = Episode.lookup(code);

    if (nextPage != null) {
      console.log(`TODO: Return an episode page with id:${nextPage}`);
      nextPage = null;
      return;
    }

    let page = null;
    while (page == null) {
      pageIndex = (pageIndex == null) ? 0 : pageIndex+1;
      const data = episode.getPages()[pageIndex];
      if (data == null) { return null; }

      const candidate = EpisodePage(data);
      if (candidate.meetsRequirements()) { page = candidate; }
    }

    return page;
  }

  return Object.freeze({
    getCode: () => { return code; },
    getContext: () => { return context; },
    getEpisode: () => { return Episode.lookup(code); },
    getNextPage,

    getProperties: () => { return properties },
    getProperty: key => { return properties[key] },
    setPropertyValue: (key,value) => { properties[key] = value; },
    getPropertyValue: key => { return properties[key]; },
  });

}