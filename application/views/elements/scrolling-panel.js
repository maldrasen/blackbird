
const STEP_DISTANCE = 50;

const $$scrollingPanels = {};
let $$panelIndex = 0;
let $$activeGrab = null;

global.ScrollingPanel = function(options) {
  const $id = options.id || nextID();
  const $wrappedContent = determineWrappedContent(options)

  let $scrollingPanel;
  let $scrollingPanelContent;
  let $scrollingPanelTrack;
  let $scrollingPanelThumb;
  let $contentHeight;

  function getID() { return $id; }
  function getWrappedContent() { return $wrappedContent; }

  function build() {
    $scrollingPanelContent = X.createElement(`<div class='scrolling-panel-content'></div>`);

    $scrollingPanelThumb = X.createElement(`<div class='scrolling-panel-thumbwheel'></div>`);
    $scrollingPanelThumb.addEventListener('mousedown', startDrag);

    $scrollingPanelTrack = X.createElement(`<div class='scrolling-panel-track'></div>`);
    $scrollingPanelTrack.appendChild($scrollingPanelThumb);
    $scrollingPanelTrack.addEventListener('click', trackClicked);

    $scrollingPanel = X.createElement(`<div class='scrolling-panel'></div>`);
    $scrollingPanel.dataset.id = $id;
    $scrollingPanel.dataset.scrollPosition = 0;
    $scrollingPanel.dataset.thumbPosition = 0;
    $scrollingPanel.appendChild($scrollingPanelContent);
    $scrollingPanel.appendChild($scrollingPanelTrack);
    $scrollingPanel.addEventListener('wheel', event => {
      event.preventDefault();
      event.stopPropagation();
      (event.deltaY > 0) ? stepDown(STEP_DISTANCE) : stepUp(STEP_DISTANCE);
    });

    const parent = $wrappedContent.parentNode;
    parent.removeChild($wrappedContent);
    parent.appendChild($scrollingPanel);

    $scrollingPanelContent.appendChild($wrappedContent);

    resize();
  }

  function setHeight(height) {
    $scrollingPanel.style['height'] = `${height}px`;
  }

  // If the scrolling panel is within an element with a fixed position the
  // height of the scrolling panel content will always be the height of the
  // scrolling panel. In this situation the content height must be set manually.
  function setContentHeight(height) { $contentHeight = height; }

  function resize() {
    if ($scrollingPanel.clientHeight === 0) { return; }

    let contentHeight = $contentHeight || $scrollingPanelContent.scrollHeight;
    let visibleHeight = $scrollingPanel.clientHeight;

    if (visibleHeight >= contentHeight) {
      setThumbPosition(0);
      return hideTrack();
    }

    showTrack();

    let thumbHeight = (visibleHeight / contentHeight) * visibleHeight;
    if (thumbHeight < 50) {
      thumbHeight = 50;
    }

    let thumbExtent = visibleHeight - thumbHeight;
    let thumbPosition = $scrollingPanel.dataset.scrollPosition * thumbExtent;

    setThumbPosition(thumbPosition);
    setThumbExtent(thumbExtent);

    $scrollingPanelThumb.style['height'] = `${thumbHeight}px`;
  }

  function isActive() { return X.hasClass($scrollingPanelTrack,'off') === false; }
  function showTrack() { X.removeClass($scrollingPanelTrack,'off'); }
  function hideTrack() { X.addClass($scrollingPanelTrack,'off'); }

  function trackClicked(event) {
    if (X.hasClass(event.target,'scrolling-panel-track')) {
      let clickAt = event.pageY;
      let thumbPosition = X.getPosition($scrollingPanelThumb).top;
      (clickAt < thumbPosition) ? stepUp(getPageDistance()) : stepDown(getPageDistance());
    }
  }

  function stepDown(distance) {
    if (isActive()) {
      let extent = getThumbExtent();
      let position = getThumbPosition() + distance;

      if (position > extent) {
        position = extent;
      }

      setThumbPosition(position);
    }
  }

  function stepUp(distance) {
    if (isActive()) {
      let position = getThumbPosition() - distance;
      if (position < 0) {
        position = 0;
      }

      setThumbPosition(position);
    }
  }

  function scrollToTop() { if (isActive()) { setThumbPosition(0); }}
  function scrollToBottom() { if (isActive()) { setThumbPosition(getThumbExtent()); }}

  function setThumbPosition(position) {
    if (typeof position !== 'number' || isNaN(position)) { throw `Thumb position is not a number`; }

    $scrollingPanel.dataset.thumbPosition = position;
    $scrollingPanelThumb.style['top'] = `${position}px`;
    positionView();
  }

  function setThumbExtent(extent) {
    if (typeof extent !== 'number' || isNaN(extent)) { throw `Thumb extent is not a number`; }
    $scrollingPanel.dataset.thumbExtent = extent;
  }

  function getPageDistance() { return X.getPosition($scrollingPanelThumb).height * 0.9; }
  function getThumbPosition() { return parseInt($scrollingPanel.dataset.thumbPosition || 0); }
  function getThumbExtent() { return parseFloat($scrollingPanel.dataset.thumbExtent || 1); }

  // Read the thumb-position and set view offset
  function positionView() {
    let thumbExtent = getThumbExtent();
    let thumbPosition = getThumbPosition();
    let scrollPosition = 1 - ((thumbExtent - thumbPosition) / thumbExtent);
    let contentOffset = 0;

    if (scrollPosition > 1) {
      scrollPosition = 1;
    }

    $scrollingPanel.dataset.scrollPosition = scrollPosition;

    if (scrollPosition > 0) {
      let contentHeight = $contentHeight || $scrollingPanelContent.scrollHeight;
      let visibleHeight = $scrollingPanel.clientHeight;

      contentOffset = (contentHeight - visibleHeight) * -scrollPosition
    }

    $scrollingPanelContent.style['top'] = `${contentOffset}px`;
  }

  // === Drag and Drop =========================================================

  function startDrag(event) {
    let body = X.first('body');
    let scrollTop = body.scrollTop;

    $$activeGrab = {
      position: (event.pageY - X.getPosition(event.target).top + scrollTop)
    };

    body.addEventListener('mousemove', moveThumb);
    body.addEventListener('mouseup', stopDrag);
    body.addEventListener('mouseleave', stopDrag);
  }

  function moveThumb(event) {
    let panelTop = X.getPosition($scrollingPanel).top;
    let scrollTop = X.first('body').scrollTop;
    let top = event.pageY - $$activeGrab.position - panelTop + scrollTop;
    let limit = getThumbExtent();

    if (top < 0) { top = 0; }
    if (top > limit) { top = limit; }

    setThumbPosition(top);
  }

  function stopDrag() {
    let body = X.first('body');

    body.removeEventListener('mousemove', moveThumb);
    body.removeEventListener('mouseup', stopDrag);
    body.removeEventListener('mouseleave', stopDrag);

    $$activeGrab = null;
  }

  // ===========================================================================

  build()

  const $self = Object.freeze({
    getID,
    getWrappedContent,
    setHeight,
    setContentHeight,
    resize,
    isActive,
    getPageDistance,
    stepUp,
    stepDown,
    scrollToTop,
    scrollToBottom,
  });

  $$scrollingPanels[$id] = $self;

  return $self;
}

// Wrapped content could be found with an id, a selector, or the element.
// (id and selector options are different because id can be used as scrolling
// panel ID)
function determineWrappedContent(options) {
  if (options.id) { return X.first(options.id); }
  if (options.selector) { return X.first(options.selector); }
  if (options.element) { return options.element; }
  throw `Cannot find wrapped content in options`;
}

function activeScrollingPanel() {
  const position = MouseMonitor.getPosition()
  const root = document.elementFromPoint(position.x, position.y);
  if (root) {
    const element = root.closest('.scrolling-panel');
    return element ? $$scrollingPanels[element.dataset.id] : null;
  }
}

function handleKeyPress(event) {
  const panel = activeScrollingPanel();

  if (panel && panel.isActive()) {
    const execute = callback => {
      event.preventDefault();
      event.stopPropagation();
      callback();
    }

    if (event.code === KeyCodes.PageUp)    { execute(() => panel.stepUp(panel.getPageDistance())); }
    if (event.code === KeyCodes.PageDown)  { execute(() => panel.stepDown(panel.getPageDistance())); }
    if (event.code === KeyCodes.End)       { execute(() => panel.scrollToBottom()); }
    if (event.code === KeyCodes.Home)      { execute(() => panel.scrollToTop()); }
  }
}

function nextID() {
  return `panel-${$$panelIndex++}`;
}

function resizeAll() {
  Object.values($$scrollingPanels).forEach(scrollingPanel => scrollingPanel.resize());
}

ScrollingPanel.init = function() {
  window.addEventListener('resize', resizeAll);
  window.addEventListener('keydown', handleKeyPress);
}

// Opening a casement window will usually create a scrolling panel, which adds
// it to a list of scrolling panels. We need this list for reasons. I don't
// have an easy way to go back and clean up orphaned scrolling panels when a
// window is closed though. Rather than putting some kind of cleanup hook into
// the casement.close() function, as well as every other place we might create
// temporary scrolling panel, I'll just look for orphaned panels every 10
// seconds or so and delete them.
window.setInterval(() => {
  Object.keys($$scrollingPanels).forEach(key => {
    if ($$scrollingPanels[key].getWrappedContent().closest('body') == null) {
      delete $$scrollingPanels[key];
    }
  });
},10000);
