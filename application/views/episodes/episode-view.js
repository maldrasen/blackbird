global.EpisodeView = (function() {

  function init() {
    X.onClick('#episodeButtons .continue-button', EpisodeSystem.nextPage);
    X.onCodeDown(KeyCodes.Space, isVisible, EpisodeSystem.nextPage);
    X.onCodeDown(KeyCodes.Enter, isVisible, EpisodeSystem.nextPage);

    X.onClick('#episodePage', () => {
      if (X.hasClass('#episodeButtons','hide')) { EpisodeSystem.nextPage(); }
    });

    for (let x=1; x<=9; x++) {
      X.onCodeDown(`Digit${x}`, isVisible, () => selectOption(x));
    }
  }

  // When an option is selected using a keyboard shortcut we invoke the button's click() function so that any event
  // listeners will work the same, weather the button was clicked or the shortcut was used.
  function selectOption(number) {
    const button = X.all('#episodeButtons > a')[number - 1];
    if (button) { button.click(); }
  }

  function show() {
    const episode = EpisodeSystem.getEpisode();

    MainContent.setMainContent(episode.getContent());
    MainContent.setBackground(episode.getBackground());

    Console.log("Show",{ system:"EpisodeView", data:{ code:episode.getCode() }});

    EpisodeSystem.nextPage();
  }

  function setPageContent(episodePage) {
    X.empty('#episodePage');
    X.empty('#episodeButtons');
    X.addClass('#episodeButtons','hide');

    const buttons = episodePage.getButtons();
    buttons.forEach((buttonData,index) => {
      addButton(buttonData, (buttons.length > 1) ? index+1 : null);
    })

    // We need to get the content after the buttons are added because getting
    // the content might call a contentFunction() which might need to modify
    // the buttons.
    const template = episodePage.getContent();
    const content = Weaver(EpisodeSystem.getContext()).weave(template);

    X.fill('#episodePage',X.createElement(content));
  }

  // The index of a button is only included if there are more than one button on the page. (Not sure if
  function addButton(buttonData, index) {
    X.removeClass('#episodeButtons','hide');

    const shortcutLabel = index ? `<span class='fg-very-weak'>${index}. </span>` : '';

    if (buttonData.standard === 'continue') {
      return X.first('#episodeButtons').appendChild(X.createElement(
        `<a href='#' class='button continue-button'>Continue</a>`));
    }

    const button = X.createElement(`<a href='#' class='button'>${shortcutLabel}${buttonData.label}</a>`);
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
