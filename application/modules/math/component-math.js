global.ComponentMath = (function() {

  // Function that takes the values from the Feelings or Control components and maps them onto a range of values that
  // can be used in the consent or sensation calculations. These values are measured on a scale from -1000 to 1000,
  // with the extreme ends corresponding to extreme feelings. A simple cubic curve doesn't really work well for low
  // values, so each range of values needs to follow its own curve.
  function emotionBaseValue(rawValue) {
    return PiecewiseCurve([
      { xMin:0,   xMax:100,  yMin:0,   yMax:10,  exp:1.0  }, // Apathy
      { xMin:100, xMax:200,  yMin:10,  yMax:30,  exp:1.5  }, // Mild
      { xMin:200, xMax:400,  yMin:30,  yMax:70,  exp:2.0  }, // Moderate
      { xMin:400, xMax:600,  yMin:70,  yMax:150, exp:2.33 }, // High
      { xMin:600, xMax:800,  yMin:150, yMax:250, exp:2.66 }, // Very High
      { xMin:800, xMax:1000, yMin:250, yMax:500, exp:3.0  }, // Extreme
    ])(rawValue);
  }

  // This function takes a value from -100 to 100, and creates a factor from 0.5 to 2. These factors are used to adjust
  // the running totals in the consent or sensation calculations. Generally the input values come from the Personality
  // or SexualPreferences components, which are measured on a similar scale.
  function personalityFactorValue(rawValue) {
    if (rawValue == null || rawValue === 0) { return 1; }
    const curved = Math.pow(rawValue,2) * 0.01;
    return (rawValue > 0) ? 1 + (curved/100)   : 1 - (curved/200);
  }

  // Adjust the scale of a factor. When first calculated a factor is between 0.5 and 2. Applying a scale of
  // 1.5 to this factor will reduce the range to between 0.66 and 1.5. A strength of 4 should double the effect of the
  // normal range (0.25 to 4)
  function applyFactorScale(factor, scale) {
    if (scale <= 1) { throw `Scale must be > 1`; }
    if (factor < 0.5 || factor > 2) { throw `This function expects a factor between 0.5 and 2`; }
    if (factor === 1 || scale === 2) { return factor; }

    let scaleMin, scaleRange, position;

    if (factor > 1) {
      scaleMin = 1;
      scaleRange = scale - 1;
      position = factor - 1;
    }
    if (factor < 1) {
      scaleMin = 1/scale;
      scaleRange = 1 - scaleMin;
      position = 1 - ((1 - factor) * 2);
    }

    return scaleMin + (scaleRange * position)
  }

  return Object.freeze({
    emotionBaseValue,
    personalityFactorValue,
    applyFactorScale,
  })

})();