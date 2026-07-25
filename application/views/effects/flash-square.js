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
    const styles = [
      `height:${position.height}px;`,
      `width:${position.width}px;`,
      `top:${position.top}px;`,
      `left:${position.left}px;`,
      `background-color:${options.color};`,
      `transition-duration:${options.duration}ms;`
    ];

    if (options.boxShadow) {
      styles.push(`box-shadow:${options.boxShadow};`);
    }

    return styles.join(' ');
  }

  return Object.freeze({
    flash
  });

})();
