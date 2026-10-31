// A control for stepping through a fixed set of discrete levels, built for the dungeon zoom: a - button on one end, a
// + button on the other, and a track between them with a mark for every level, the current one drawn as a taller
// bar. The control only counts the levels, it never knows what they stand for.
//
// Options:
// - `levels` - The number of levels
// - `level` - The starting level index
// - `onChange` - Called with the new level index when a button moves it. Moving it with setLevel() doesn't call it.
global.ZoomControl = function(options) {

  const template = StringHelper.pack(`<div class='zoom-control'>
    <a href='#' class='zoom-out button'>&minus;</a>
    <div class='track'><div class='marks'></div></div>
    <a href='#' class='zoom-in button'>+</a>
  </div>`);

  const levels = options.levels;
  let level = (options.level == null) ? 0 : options.level;
  let element;

  function getElement() {
    if (element == null) {
      element = X.createElement(template);
      buildMarks();
      element.querySelector('.zoom-out').addEventListener('click', () => buttonClicked(-1));
      element.querySelector('.zoom-in').addEventListener('click', () => buttonClicked(1));
      setLevel(level);
    }
    return element;
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

    toggleButton('.zoom-out', level > 0);
    toggleButton('.zoom-in', level < levels - 1);
  }

  function toggleButton(selector, enabled) {
    const button = element.querySelector(selector);
    enabled ? X.removeClass(button,'disabled') : X.addClass(button,'disabled');
  }

  function buttonClicked(step) {
    const target = level + step;
    if (target < 0 || target >= levels) { return; }

    setLevel(target);
    options.onChange?.(level);
  }

  return {
    getElement,
    getLevel: () => { return level; },
    setLevel,
  };

}
