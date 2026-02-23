global.BarDisplay = function(options) {

  let $element;
  let $max = options.maxValue;
  let $min = options.minValue;
  let $current = options.currentValue;
  let $label = options.label;
  let $color = options.color;

  const template = StringHelper.pack(`<div class='bar-display'>
    <div class='text-row'>
      <div class='label'></div>
      <div class='value-label'>(<span class='current'></span>/<span class='max'></span>)</div>
    </div>
    <div class='bar-track'><div class='bar'></div></div>
  </div>`);

  function getElement() {
    if ($element == null) {
      $element = X.createElement(template)
      setLabel($label);
      setColor($color);
      setMinValue($min);
      setMaxValue($max);
      setCurrentValue($current);
    }
    return $element;
  }

  function setLabel(label) {
    $label = label;
    getElement().querySelector('.label').replaceChildren(label);
  }

  function setColor(color) {
    $color = color;
    const track = getElement().querySelector('.bar-track');
    track.setAttribute('class',`bar-track bar-display-bg-${$color}`);
    const bar = getElement().querySelector('.bar');
    bar.setAttribute('class',`bar bar-display-fg-${$color}`);
  }

  function setMinValue(min) {
    $min = min;
  }
  function setMaxValue(max) {
    $max = max;
    getElement().querySelector('.max').replaceChildren($max);
  }
  function setCurrentValue(current) {
    $current = current;
    getElement().querySelector('.current').replaceChildren($current);
  }

  return Object.freeze({
    getElement,
    setLabel,
  });

}