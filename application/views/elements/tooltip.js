global.Tooltip = (function() {
  let tooltipLibrary = {};
  let currentTooltip;

  function init() {
    window.addEventListener('mouseover', event => {
      if (X.hasClass(event.target,'tooltip-parent')) { startOpen(event); }
    });

    window.addEventListener('mouseout', event => {
      if (X.hasClass(event.target,'tooltip-parent')) { checkClose(event); }
    });
  }

  // Tooltips fetch their content from the tooltipLibrary given their lookup
  // code. These codes are global so that we don't have to redefine them
  // everytime.
  //
  //    code*       Required for tooltip lookup.
  //    content*    String or HTML element to display.
  //    position    ['top','bottom']
  //    delay       Time in ms to delay opening. 500ms by default.
  //
  function register(code, options) {
    tooltipLibrary[code] = {
      content: options.content,
      classname: options.classname || 'default-tooltip',
      position: (options.position || 'bottom'),
      delay: (options.delay || 500),
    };

    if (options.withDefinitionList) {
      tooltipLibrary[code].withDefinitionList = options.withDefinitionList;
    }
  }

  function unregister(code) {
    delete tooltipLibrary[code];
  }

  // Tooltips can be added to an element with the add function or if an element
  // has the tooltip-parent class and the tooltip code it should just work.
  function add(element, code) {
    X.addClass(element,'tooltip-parent');
    element.setAttribute('id',code);
  }

  // Set a timer that will open the tooltip if the mouse is still over the
  // tooltip element by the time the timer runs out.
  function startOpen(event) {
    currentTooltip = event.target.getAttribute('id');

    if (currentTooltip == null || tooltipLibrary[currentTooltip] == null) {
      throw `Cannot find tooltip with code ${currentTooltip}`;
    }

    setTimeout(() => {
      if (currentTooltip) { open(event.target); }
    },tooltipLibrary[currentTooltip].delay);
  }

  function open(parent) {
    if (parent.getAttribute('id') === currentTooltip) {

      let tooltip = tooltipLibrary[currentTooltip];
      let frame = X.first('#tooltipFrame');
      let offset = X.getPosition(parent);

      // Ensure the tooltip is empty.
      frame.innerHTML = '';

      // Tooltip strings are wrapped in a basic content div.
      if (typeof tooltip.content == 'string') {
        let content = X.createElement(`<div></div>`);
        content.innerHTML = tooltip.content;
        frame.appendChild(content);
      }

      // We can assume other content can be appended as is.
      if (typeof tooltip.content != 'string') {
        frame.appendChild(tooltip.content);
      }

      // Definition are included after other content types.
      if (tooltip.withDefinitionList) {
        let list = X.createElement('<dl></dl>');

        Object.keys(tooltip.withDefinitionList).forEach(key => {
          list.appendChild(X.createElement(`<dt>${key}</dt>`));
          list.appendChild(X.createElement(`<dd>${tooltip.withDefinitionList[key]}</dd>`));
        });

        frame.appendChild(list);
      }

      // Position and display the tooltip.
      if (tooltip.position === 'bottom') {
        frame.style['top'] = `${offset.top + offset.height}px`;
        frame.style['left'] = `${offset.left}px`;
      }
      if (tooltip.position === 'top') {
        frame.style['bottom'] = `${offset.height}px`;
        frame.style['left'] = `${offset.left}px`;
      }

      X.addClass(frame,tooltip.classname);
      X.removeClass(frame,'hide');

      // If the tooltip is now hanging off the right side of the screen,
      // reposition it so that it's anchored to right side of the parent.
      const frameOffset = X.getPosition(frame);
      if (offset.x + frameOffset.width + 10 > window.innerWidth) {
        frame.style['left'] = `${(frameOffset.x - frameOffset.width) + offset.width}px`
      }
    }
  }

  // Mouseout events will be triggered from any element under the tooltip
  // parent element so on mouseout we need to check every element that we're
  // currently hovering over to see if any of them are the tooltip element
  // still.
  function checkClose() {
    let release = true;

    X.each(':hover', element => {
      if (element.getAttribute('id') === currentTooltip) { release = false; }
    });

    if (release) { close(); }
  }

  function close() {
    currentTooltip = null;

    let frame = X.first('#tooltipFrame');
    frame.removeAttribute('style');
    frame.setAttribute('class','hide')
    frame.innerHTML = '';
  }

  return Object.freeze({
    init,
    register,
    unregister,
    add,
    close
  });

})();
