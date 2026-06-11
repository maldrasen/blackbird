global.FlashSquare = (function() {

  // Options: { element, color, duration }
  function flash(options) {
    const square = X.createElement(`<div class='flash-square' style='${buildFlashStyle(options)}'></div>`);
    X.first(`#effectArea`).appendChild(square);
    setTimeout(() => { X.addClass(square,'fade'); },1);
    setTimeout(() => { square.remove(); },options.duration);
  }

  function buildFlashStyle(options) {
    const position = X.getPosition(options.element);
    return [
      `height:${position.height}px;`,
      `width:${position.width}px;`,
      `top:${position.top}px;`,
      `left:${position.left}px;`,
      `background-color:${options.color};`,
      `transition-duration:${options.duration}ms;`
    ].join(' ');
  }

  return Object.freeze({
    flash
  });

})();
