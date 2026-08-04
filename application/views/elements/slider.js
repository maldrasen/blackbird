// A general purpose slider element for selecting a value within a range of values.
//
// Options:
// - `value` - The value should be set when the slider is built in order to set the label and position the knob
// - `min`
// - `max`
// - `step`
// - `inputSelector` - If this selector is set then the input value is updated as the slider moves, and editing the
//                     input moves the slider.
// - `onChange` - Called with the new value whenever the value changes.

// Must match the .knob width in slider.scss
const KNOB_WIDTH = 20;

const LARGE_STEP_MULTIPLIER = 10;

global.Slider = function(options) {
  const element = X.createElement(`<div class='slider' tabindex='0'><div class='knob'></div></div>`);
  const knob = element.querySelector('.knob');
  const input = options.inputSelector ? X.first(options.inputSelector) : null;
  const min = options.min;
  const max = options.max;
  const step = options.step || 1;

  let value = snapToStep(options.value == null ? min : options.value);
  let activeGrab = null;

  function getValue() { return value; }

  function setValue(newValue) {
    const snapped = snapToStep(newValue);
    if (snapped === value) { return; }

    value = snapped;
    updateInput();
    positionKnob();

    if (options.onChange) { options.onChange(value); }
  }

  // Snap a raw value to the nearest step, clamped to the [min,max] range.
  function snapToStep(raw) {
    let snapped = min + Math.round((raw - min) / step) * step;
    if (snapped < min) { snapped = min; }
    if (snapped > max) { snapped = max; }
    return snapped;
  }

  function updateInput() {
    if (input) { input.value = value; }
  }

  // The knob is positioned with calc() so that the slider doesn't need to be attached to the document to be built.
  function positionKnob() {
    const percent = (value - min) / (max - min);
    knob.style['left'] = `calc(${percent * 100}% - ${percent * KNOB_WIDTH}px)`;
  }

  // Convert a mouse event's horizontal position into a value, given the offset of the grab point from the left edge
  // of the knob. Values outside the track are clamped by snapToStep().
  function valueAtPosition(event, grabOffset) {
    const track = X.getPosition(element);
    const extent = track.width - KNOB_WIDTH;
    const left = event.clientX - grabOffset - track.left;
    return min + (left / extent) * (max - min);
  }

  function trackClicked(event) {
    if (event.target === element) {
      setValue(valueAtPosition(event, KNOB_WIDTH / 2));
    }
  }

  function keyPressed(event) {
    if (event.code !== KeyCodes.ArrowLeft && event.code !== KeyCodes.ArrowRight) { return; }

    event.preventDefault();

    const direction = event.code === KeyCodes.ArrowRight ? 1 : -1;
    const distance = event.shiftKey ? step * LARGE_STEP_MULTIPLIER : step;

    setValue(value + (direction * distance));
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
  element.addEventListener('click', trackClicked);
  element.addEventListener('keydown', keyPressed);

  if (input) {
    input.addEventListener('change', inputChanged);
  }

  updateInput();
  positionKnob();

  return Object.freeze({
    getElement: () => { return element; },
    getValue,
    setValue,
  });

}
