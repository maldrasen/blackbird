global.CharacterMath = (function() {

  // The speed factor is used frequently and comes from a lot of different factors. As such we cache it after
  // calculating it. Dexterity and body size are the primary influences on speed. We also take breast size into
  // consideration, as having a pair of huge swinging milkers will slow a person down significantly.

  function calculateSpeedFactor(id) {
    const dexSpeed = speedForDexterity(id);
    const breastSpeed = speedForBreastSize(id);
    const bodySpeed = speedForBodySize(id);

    return 1 + dexSpeed + breastSpeed + bodySpeed;
  }

  // A character's dexterity can reduce the speed factor by at most 0.3. Dexterity's effect on speed is soft capped at
  // 10000, though it's unlikely that anyone will have a dexterity that high. The speed reduction is handled in three
  // different bands, for diminishing returns.
  function speedForDexterity(id) {
    const dexterity = AttributesComponent.lookup(id)['dexterity'];

    if (dexterity > 10000) { return -0.3 }

    const band = [
      { min:1,    max:100,   outMin:0.00, outMax:0.15 },
      { min:101,  max:1000,  outMin:0.15, outMax:0.30 },
      { min:1001, max:10000, outMin:0.30, outMax:0.45 },
    ].find(band => dexterity <= band.max);

    const ratio = (dexterity - band.min) / (band.max - band.min);
    return -1 * (band.outMin + ratio * (band.outMax - band.outMin));
  }

  function speedForBodySize(id) {
    const height = BodyComponent.lookup(id).height;

    if (height < 500) { return -0.15; }
    if (height > 2200) { return 0.15; }
    if (height > 1400 && height < 1600) { return 0; }

    const shortBands = [
      { min:500,  max:800,  outMin:0.15, outMax:0.10 },
      { min:800,  max:1100, outMin:0.10, outMax:0.05 },
      { min:1100, max:1400, outMin:0.05, outMax:0.00 },
    ]
    const tallBands = [
      { min:1600, max:1800, outMin:0.00, outMax:0.05 },
      { min:1800, max:2000, outMin:0.05, outMax:0.10 },
      { min:2000, max:2200, outMin:0.10, outMax:0.15 },
    ]

    if (height <= 1400) {
      const band = shortBands.find(band => height <= band.max);
      const ratio = (height - band.min) / (band.max - band.min);
      return -1 * (band.outMin + ratio * (band.outMax - band.outMin));
    }

    const band = tallBands.find(band => height <= band.max);
    const ratio = (height - band.min) / (band.max - band.min);
    return band.outMin + ratio * (band.outMax - band.outMin);
  }

  function speedForBreastSize(id) {
    const tits = BreastsComponent.lookup(id);
    if (tits) {
      switch (tits.breastSize) {
        case 'big':     return 0.02;
        case 'huge':    return 0.06;
        case 'monster': return 0.10;
      }
    }
    return 0;
  }

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
    if (scale <= 1) { throw new Error(`Scale must be > 1`); }
    if (factor < 0.5 || factor > 2) { throw new Error(`This function expects a factor between 0.5 and 2`); }
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

  // This function takes a positive value and returns a value between 0 and the max, usually 100. We're currently using
  // this to derive a value for desire (which could be any positive number) that can be compared to the current
  // arousal, but a function like this could be useful for generating other like factors. The 'r' value defines the
  // steepness of the curve. A small r value makes the curve grow slower.
  function saturatingGrowthCurve(x, max=100, r = 0.01) {
    return max * (1 - Math.exp(-r * x));
  }

  return Object.freeze({
    calculateSpeedFactor,
    emotionBaseValue,
    personalityFactorValue,
    applyFactorScale,
    saturatingGrowthCurve,
  })

})();