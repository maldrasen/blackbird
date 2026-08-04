// Options:
// - label
// - value
// - min
// - max
// - step
global.Slider = function(options) {

  const element = X.createElement(`<div class='slider'>
    <div class='label-panel'></div>
    <div class='track'>
      <div class='knob'></div>
    </div>
    <div class='value-panel'></div>
  </div>`);

  if (options.label != null) {
    element.querySelector('.label-panel').appendChild(X.createElement(`<span class='label'>${options.label}</span>`));
  }
  if (options.value != null) {
    element.querySelector('.value-panel').appendChild(X.createElement(`<span class='value'>${options.value}</span>`));
  }

  return Object.freeze({
    getElement: () => { return element; },
  });

}
