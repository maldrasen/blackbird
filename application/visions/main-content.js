global.MainContent = (function() {

  function loadMainContent() {
    const mainContent = FileHelper.readFile('views/main-content.html');
    const mainElement = document.createElement("div");
    mainElement.innerHTML = mainContent;

    document.querySelector("body").append(mainElement.children[0]);
  }

  function loadStyles() {
    addStylesheet(`${ROOT}/styles/blackbird.css`);
  }

  function addScriptTag(src) {
    const script = document.createElement('script');
    script.setAttribute('src',src);

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function addStylesheet(href) {
    const link = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('type','text/css');
    link.setAttribute('href',href);

    document.querySelector('head').appendChild(link);
  }


  function setMainContent(path) {
    log(`Set Main Content`,{ system:'MainContent', data:path, level:1 });

    clearBackground();
    X.loadDocument('#mainContent',path);
    if (Environment.isProduction) {
      X.remove('.show-in-development');
    }
  }

  function showCover() {
    X.removeClass('#mainCover','hide');
  }

  // TODO: I feel like this complicated timeout layering could be abstracted
  //       away into another transition helper or some such.
  function hideCover(options={}) {
    const duration = options.fadeTime || 500;
    const cover = X.first('#mainCover');

    setTimeout(() => {
      cover.style['transition-property'] = 'opacity';
      cover.style['transition-duration'] = `${duration}ms`;
      cover.style['opacity'] = 1;
    },10);

    setTimeout(() => {
      cover.style['opacity'] = 0;
    },20);

    setTimeout(() => {
      X.addClass(cover,'hide');
      X.removeAttribute(cover,'style')
    },duration+30);
  }

  function setBackground(path) {
    X.first('#backgroundImage').style['background-image'] = X.assetURL(path);
  }

  function clearBackground() {
    X.first('#backgroundImage').style['background-image'] = null;
  }

  return {
    loadMainContent,
    loadStyles,
    setMainContent,
    addStylesheet,
    addScriptTag,
    showCover,
    hideCover,
    setBackground,
    clearBackground,
  };

})();