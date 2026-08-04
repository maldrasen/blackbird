// A general purpose slider element for selecting a value within a range of values.
//
// Options:
// - `value` - The value should be set when the slider is built in order to set the label and position the knob
// - `min`
// - `max`
// - `step`
// - `inputSelector` - If this selector is set then the input value is updated as the slider moves.
global.Slider = function(options) {
  const element = X.createElement(`<div class='slider'><div class='knob'></div></div>`);
  const input = options.inputSelector ? X.first(options.inputSelector) : null;

  if (input) {
    input.value = options.value;
  }

  return Object.freeze({
    getElement: () => { return element; },
  });

}
