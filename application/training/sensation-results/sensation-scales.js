global.SensationScales = (function() {

  // Training scales should be simple. They just represent part sensitivity. We might want to do some linear
  // interpolation between scale thresholds and the scale factor to make the scale curve smoothish. We'll have to come
  // back to this once we have the sensations adding their values to the scales.

  // This function should also determine character's weakness, that is the part that is the most sensitive, when
  // sensitivity is at least a B. Actions that hit the weakness generate slightly more sensation, maybe 25% more or so,
  // and should increase comfort as well. Unless this is a pain causing action, then we get increased pain.
  function apply() {
    // TODO: Implement this
  }

  return Object.freeze({ apply })

})()