global.EpisodeState = function(code, context = {}) {
  let nextPage = null;
  let pageIndex = null;

  // Clicking a button with a jump property sets nextPage before this is called; otherwise the current page may carry
  // its own jump or end. A jump moves the cursor to the page with the matching label (in either direction), then the
  // normal advance loop runs from there, skipping any pages whose requirements aren't met. Returning null ends the
  // episode.
  function getNextPage() {
    const pages = Episode.lookup(code).getPages();

    if (nextPage == null && pageIndex != null) {
      const current = pages[pageIndex];
      if (current.end) { return null; }
      if (current.jump) { nextPage = current.jump; }
    }

    if (nextPage != null) {
      const target = pages.findIndex(page => page.label === nextPage);
      if (target < 0) { throw new Error(`No page with label [${nextPage}]`); }
      pageIndex = target - 1;
      nextPage = null;
    }

    let page = null;
    while (page == null) {
      pageIndex = (pageIndex == null) ? 0 : pageIndex+1;
      const data = pages[pageIndex];
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
    setNextPage: label => { nextPage = label; },

    setPropertyValue: (key,value) => { context[key] = value; },
    getPropertyValue: key => { return context[key]; },
  });

}