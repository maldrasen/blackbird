global.SpeedMath = (function() {

  // Dexterity and body size are the primary influences on speed. We also take breast size into consideration, as
  // having a pair of huge swinging milkers will slow a person down significantly. The factor is recalculated on
  // every read so that changes to any of the inputs (like a dexterity buff) take effect immediately.

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
    const dexterity = Attributes(id).getDexterity();

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

  return {
    calculateSpeedFactor,
  };

})();
