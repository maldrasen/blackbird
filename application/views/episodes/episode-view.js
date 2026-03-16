global.EpisodeView = (function() {

  function init() {
    X.onClick('#episodeButtons .continue-button', EpisodeController.nextPage);
    X.onCodeDown(KeyCodes.Space, isVisible, EpisodeController.nextPage);
  }

  function show() {
    const episode = EpisodeController.getEpisode();

    MainContent.setMainContent(episode.getContent());
    MainContent.setBackground(episode.getBackground());

    Console.log("Show",{ system:"EpisodeView", data:{ code:episode.getCode() }});

    EpisodeController.nextPage();
  }

  function setPageContent(episodePage) {
    X.empty('#episodePage');
    X.empty('#episodeButtons');
    X.addClass('#episodeButtons','hide');

    episodePage.getButtons().forEach(buttonData => {
      addButton(buttonData);
    })

    // We need to get the content after the buttons are added because getting
    // the content might call a contentFunction() which might need to modify
    // the buttons.
    const template = episodePage.getContent();
    const content = Weaver(EpisodeController.getContext()).weave(template);

    X.fill('#episodePage',X.createElement(content));
  }

  function addButton(buttonData) {
    X.removeClass('#episodeButtons','hide');

    if (buttonData.standard === 'continue') {
      return X.first('#episodeButtons').appendChild(X.createElement(
        `<a href='#' class='button continue-button'>Continue</a>`));
    }

    const button = X.createElement(`<a href='#' class='button'>${buttonData.label}</a>`);
    if (buttonData.id) { button.id = buttonData.id; }
    if (buttonData.classname) { X.addClass(button,buttonData.classname); }
    if (typeof buttonData.callback === 'function') { button.addEventListener('click',buttonData.callback); }
    X.first('#episodeButtons').appendChild(button);
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
