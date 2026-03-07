global.EpisodeView = (function() {

  function init() {
    X.onClick('#episodeButtons .continue-button', EpisodeController.nextPage);
    X.onCodeDown(KeyCodes.Space, isVisible, EpisodeController.nextPage);
  }

  function show() {
    const episode = Episode.lookup(EpisodeController.getEpisodeCode())

    MainContent.setMainContent(episode.getContent());
    MainContent.setBackground(episode.getBackground());

    Console.log("Show",{ system:"EpisodeView", data:{ code:episode.getCode() }});

    EpisodeController.nextPage();
  }

  function setPageContent(episodePage) {
    const content = Weaver(EpisodeController.getContext()).weave(episodePage.getContent());

    X.empty('#episodePage');
    X.empty('#episodeButtons');
    X.addClass('#episodeButtons','hide');

    episodePage.getButtons().forEach(buttonData => {
      addButton(buttonData);
    })

    X.fill('#episodePage',X.createElement(content));
  }

  function addButton(buttonData) {
    X.removeClass('#episodeButtons','hide');
    if (buttonData.standard === 'continue') {
      return X.first('#episodeButtons').appendChild(X.createElement(
        `<a href='#' class='button continue-button'>Continue</a>`));
    }
    throw `Not sure how to handle this button: ${JSON.stringify(buttonData)}`;
  }

  function isVisible() {
    return X.first('#episodeView') != null;
  }

  return {
    init,
    show,
    setPageContent,
    isVisible,
  }

})();
