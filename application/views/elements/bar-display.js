global.BarDisplay = function(options) {

  // Theoretically everything about the bars can be changed after they've been
  // built, in case we need to update the bars in a view. Or the constructor
  // can be used a single time to build a static bar element.

  const template = StringHelper.pack(`<div class='bar-display'>
    <div class='text-row'>
      <div class='label'></div>
      <div class='value-label'>(<span class='current'></span>/<span class='max'></span>)</div>
    </div>
    <div class='bar-track'><div class='bar'></div></div>
  </div>`);

  let element;
  let max = options.maxValue;
  let min = options.minValue;
  let current = options.currentValue;
  let label = options.label;
  let color = options.color;

  function getElement() {
    if (element == null) {
      element = X.createElement(template)
      setLabel(label);
      setColor(color);
      setMinValue(min);
      setMaxValue(max);
      setCurrentValue(current);
    }
    return element;
  }

  function setLabel(value) {
    label = value;
    getElement().querySelector('.label').replaceChildren(label);
  }

  function setColor(value) {
    color = value;
    const track = getElement().querySelector('.bar-track');
    track.setAttribute('class',`bar-track bar-display-bg-${color}`);
    const bar = getElement().querySelector('.bar');
    bar.setAttribute('class',`bar bar-display-fg-${color}`);
  }

  function setMinValue(value) {
    min = value;
  }

  function setMaxValue(value) {
    max = value;
    getElement().querySelector('.max').replaceChildren(max);
  }

  // Values can range outside the bar, health is negative for a knocked out character for instance, but the display
  // never goes below the bar's minimum. The minimum is also the bar's zero point, so a bar can show progress through
  // a range that doesn't start at zero, like the essence within the current level.
  function setCurrentValue(value) {
    current = value;

    const displayed = (min == null) ? current : Math.max(min, current);
    const floor = (min == null) ? 0 : min;
    let width = (max > floor) ? Math.round(((displayed - floor) / (max - floor)) * 100) : 0;
    getElement().querySelector('.current').replaceChildren(displayed);
    getElement().querySelector('.bar').setAttribute(`style`,`width:${width}%`);
  }

  function hide() { X.addClass(getElement(),'hide'); }
  function show() { X.removeClass(getElement(),'hide'); }
  function hideTextRow() { X.addClass(getElement().querySelector('.text-row'),'hide'); }
  function showTextRow() { X.removeClass(getElement().querySelector('.text-row'),'hide'); }
  function hideValues() { X.addClass(getElement().querySelector('.value-label'),'hide'); }
  function showValues() { X.removeClass(getElement().querySelector('.value-label'),'hide'); }

  return Object.freeze({
    getElement,
    setLabel,
    setColor,
    setMinValue,
    setMaxValue,
    setCurrentValue,
    hide,
    show,
    hideTextRow,
    showTextRow,
    hideValues,
    showValues,
  });

}