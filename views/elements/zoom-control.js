global.ZoomControl = function(options) {

  const levels = options.levels;

  const element = buildElement();
  element.querySelector('.zoom-out').addEventListener('click', () => buttonClicked(-1));
  element.querySelector('.zoom-in').addEventListener('click', () => buttonClicked(1));

  let level = (options.level == null) ? 0 : options.level;

  buildMarks();
  setLevel(level);

  function buildElement() {
    return X.createElement(StringHelper.pack(`<div class='zoom-control'>
      <a href='#' class='zoom-out button'>&minus;</a>
      <div class='track'><div class='marks'></div></div>
      <a href='#' class='zoom-in button'>+</a>
    </div>`));
  }

  function buildMarks() {
    const marks = element.querySelector('.marks');

    for (let i=0; i<levels; i++) {
      const mark = X.createElement(`<div class='mark' data-level='${i}'></div>`);
      mark.style['left'] = `${positionOf(i)}%`;
      marks.appendChild(mark);
    }
  }

  function positionOf(index) {
    return (levels > 1) ? (index / (levels - 1)) * 100 : 50;
  }

  function setLevel(value) {
    level = Math.max(0, Math.min(levels - 1, value));

    element.querySelectorAll('.mark').forEach(mark => X.removeClass(mark,'current'));
    X.addClass(element.querySelector(`.mark[data-level='${level}']`),'current');
  }

  function buttonClicked(step) {
    const target = level + step;
    if (target < 0 || target >= levels) { return; }

    setLevel(target);
    options.onChange(level);
  }

  return {
    getElement: () => { return element; },
    getLevel: () => { return level; },
    setLevel,
  };

}
