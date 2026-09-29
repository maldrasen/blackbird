global.FlashSquare = (function() {

  // Options: { element, color, duration }
  function flash(options) {
    if (options.duration == null) { options.duration = 500; }
    if (options.color == null) { options.color = `rgb(255 255 255)`; }

    const square = X.createElement(`<div class='flash-square' style='${buildFlashStyle(options)}'></div>`);

    X.first(`#effectArea`).appendChild(square);
    setTimeout(() => { X.addClass(square,'fade'); },1);
    setTimeout(() => { square.remove(); },options.duration);
  }

  // Data: { killed, isCrit } — both optional, plain damage is the default.
  function flashDamage(element, data={}) {
    flash({ element, color:getDamageColor(data), duration:BattleConstants.damageEffectTime });
  }

  function getDamageColor(data) {
    if (data.killed) { return `rgb(200,25,25)`; }
    if (data.isCrit) { return `rgb(150,20,20)`; }
    return `rgb(75,10,10)`;
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

  return { flash, flashDamage };

})();
