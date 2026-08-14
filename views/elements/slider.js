// A general purpose slider element for selecting a value within a range of values.
//
// Options:
// - `value` - The value should be set when the slider is built in order to set the label and position the knob
// - `min`
// - `max`
// - `step`
// - `inputSelector` - If this selector is set then the slider and input values are bound together.
// - `onChange`
global.Slider = function(options) {
  const element = X.createElement(`<div class='slider'><div class='knob'></div></div>`);
  const knob = element.querySelector('.knob');
  const input = options.inputSelector ? X.first(options.inputSelector) : null;
  const min = options.min;
  const max = options.max;
  const step = options.step || 1;
  const knobWidth = 20;

  let value = snapToStep(options.value == null ? min : options.value);
  let activeGrab = null;

  function setValue(newValue) {
    const snapped = snapToStep(newValue);
    if (snapped !== value) {
      value = snapped;
      updateInput();
      positionKnob();

      if (options.onChange) { options.onChange(value); }
    }
  }

  function snapToStep(raw) {
    let snapped = min + Math.round((raw - min) / step) * step;
    if (snapped < min) { snapped = min; }
    if (snapped > max) { snapped = max; }
    return snapped;
  }

  function updateInput() {
    if (input) { input.value = value; }
  }

  function positionKnob() {
    const percent = (value - min) / (max - min);
    knob.style['left'] = `calc(${percent * 100}% - ${percent * knobWidth}px)`;
  }

  function valueAtPosition(event, grabOffset) {
    const track = X.getPosition(element);
    const extent = track.width - knobWidth;
    const left = event.clientX - grabOffset - track.left;
    return min + (left / extent) * (max - min);
  }

  function trackGrabbed(event) {
    if (event.target === element) {
      setValue(valueAtPosition(event, knobWidth / 2));
      startDrag(event);
    }
  }

  function inputChanged() {
    const number = input.value.trim() === '' ? NaN : Number(input.value);
    if (isNaN(number)) { return updateInput(); }

    setValue(number);
    updateInput();
  }

  // === Drag and Drop =========================================================

  function startDrag(event) {
    event.preventDefault();
    element.focus();

    activeGrab = { offset: event.clientX - X.getPosition(knob).left };

    const body = X.body();
    body.addEventListener('mousemove', dragKnob);
    body.addEventListener('mouseup', stopDrag);
    body.addEventListener('mouseleave', stopDrag);
  }

  function dragKnob(event) {
    setValue(valueAtPosition(event, activeGrab.offset));
  }

  function stopDrag() {
    const body = X.body();
    body.removeEventListener('mousemove', dragKnob);
    body.removeEventListener('mouseup', stopDrag);
    body.removeEventListener('mouseleave', stopDrag);

    activeGrab = null;
  }

  // ===========================================================================

  knob.addEventListener('mousedown', startDrag);
  element.addEventListener('mousedown', trackGrabbed);

  if (input) {
    input.addEventListener('change', inputChanged);
  }

  updateInput();
  positionKnob();

  return {
    getElement: () => { return element; },
    getValue: () => { return value; },
    setValue,
  };

}
