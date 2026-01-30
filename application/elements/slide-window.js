global.SlideWindow = function(options) {
  const $slideWindow = X.first(options.selector);
  const $slideSpace = $slideWindow.querySelector('.slide-space');
  const $slideContainer = $slideWindow.querySelector('.slide-container');
  const $scrollingPanel = ScrollingPanel({ element:$slideContainer.querySelector('.slide-content') });
  const $slideContent = $slideContainer.querySelector('.slide-content');
  const $slideContentHeader = $slideContainer.querySelector('.content-header');

  Validate.exists("Slide Space", $slideSpace);
  Validate.exists("Slide Container", $slideContainer);
  Validate.exists("Slide Content", $slideContent);
  Validate.exists("Slide Content Header", $slideContentHeader);

  let animationTimeout;

  build();

  function build() {
    $slideWindow.querySelector('.slide-button').addEventListener('click', toggle);
    resize();
    reposition();
  }

  function isOpen() {
    return X.hasClass($slideWindow,'open');
  }

  function resize() {
    $scrollingPanel.resize()
  }

  function reposition() {
    const buttonHeight = 30;

    const containerHeight = $slideContainer.getBoundingClientRect().height;
    const spaceHeight = isOpen() ? 0 : containerHeight + buttonHeight - 30;
    const top = window.innerHeight - containerHeight - buttonHeight - 40;

    $slideSpace.style.height = `${spaceHeight}px`
    $slideWindow.style.top = `${top}px`;
  }

  function toggle() {
    return isOpen() ? close() : open();
  }

  function open() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    X.addClass($slideSpace,'animating');
    X.addClass($slideWindow,'open');
    reposition();
    WindowManager.push($self);

    animationTimeout = setTimeout(() => {
      X.removeClass($slideSpace,'animating');
    },250);
  }

  function close() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    X.addClass($slideSpace,'animating');
    X.removeClass($slideWindow,'open');
    reposition();
    WindowManager.remove($self);

    animationTimeout = setTimeout(() => {
      X.removeClass($slideSpace,'animating');
    },250);
  }

  function getHeader() { return $slideContentHeader; }
  function setHeader(header) {
    $slideContentHeader.innerHTML = '';
    $slideContentHeader.appendChild(header);
  }

  function getContent() { return $slideContent; }
  function setContent(content) {
    $slideContent.innerHTML = '';
    $slideContent.appendChild(content);
  }

  const $self = Object.freeze({
    resize,
    reposition,
    open,
    close,
    getHeader,
    setHeader,
    getContent,
    setContent,
  });

  return $self;

}