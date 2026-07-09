global.EpisodeView = (function() {

  function init() {
    X.onClick('#episodeButtons a', clickEpisodeButton);
    X.onClick('#episodeButtons .continue-button', EpisodeSystem.nextPage);
    X.onCodeDown(KeyCodes.Space, allowKeyAdvance, EpisodeSystem.nextPage);
    X.onCodeDown(KeyCodes.Enter, allowKeyAdvance, EpisodeSystem.nextPage);

    X.onClick('#episodePage', () => {
      if (X.hasClass('#episodeButtons','hide')) { EpisodeSystem.nextPage(); }
    });

    for (let x=1; x<=9; x++) {
      X.onCodeDown(`Digit${x}`, allowKeyChoice, () => selectOption(x));
    }
  }

  // We only allow advancing the text from the keyboard shortcuts (enter/space) if there are no buttons and no inputs
  // on the page. When a page has option buttons, the nextPage() function would skip the option. (When there's only a
  // single continue button we could allow the continue shortcut to click the continue button.)
  function allowKeyAdvance() {
    return isVisible() && X.hasClass('#episodeButtons','hide') && X.first('#episodeView input') == null;
  }

  // We only allow a keyboard shortcut if there are no inputs on the page, otherwise this event would consume the key
  // presses, stoping the wired keys from entering text.
  function allowKeyChoice() {
    return isVisible() && X.first('#episodeView input') == null;
  }

  // When an option is selected using a keyboard shortcut we invoke the button's click() function so that any event
  // listeners will work the same, weather the button was clicked or the shortcut was used.
  function selectOption(number) {
    const button = X.all('#episodeButtons > a')[number - 1];
    if (button) { button.click(); }
  }

  function clickEpisodeButton(event) {
    const button = event.target.closest('#episodeButtons a');
    if (typeof button.onSelect === 'function') { button.onSelect(); }
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
    X.first('#episodeButtons').removeAttribute('class');
    X.addClass('#episodeButtons','hide');
    X.addClass('#episodeButtons',episodePage.getButtonsStyle());

    const buttons = episodePage.getButtons();
    buttons.forEach(addButton);

    // We need to get the content after the buttons are added because getting
    // the content might call a contentFunction() which might need to modify
    // the buttons.
    const template = episodePage.getContent();
    const content = Weaver(EpisodeSystem.getContext()).weave(template);

    X.fill('#episodePage',X.createElement(content));
  }

  // This function expects one of the standard button codes or button properties. A canned application button ignores
  // the button properties, but gets own default values if the button has them. The other button properties are:
  // { label, id, classname, callback } Only label is required.
  function addButton(buttonData) {
    X.removeClass('#episodeButtons','hide');

    const buttons = X.first('#episodeButtons');

    if (buttonData.standard === 'continue') {
      return buttons.appendChild(X.createElement(`<a href='#' class='button continue-button'>Continue</a>`));
    }

    const button = X.createElement(`<a href='#' class='button'>${buttonData.label}</a>`);

    getButtonClassnames(buttonData).forEach(classname => {
      X.addClass(button,classname);
    });

    if (buttonData.id) { button.id = buttonData.id; }
    if (typeof buttonData.callback === 'function') { button.onSelect = buttonData.callback; }

    buttons.appendChild(button);
  }

  // The classname property can be null, a single classname, or an array of classnames.
  function getButtonClassnames(data) {
    if (Array.isArray(data.classname)) { return data.classname; }
    return typeof data.classname === 'string' ? [data.classname] : [];
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
