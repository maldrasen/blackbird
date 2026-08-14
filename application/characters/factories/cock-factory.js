global.CockFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    if (state.shouldHaveCock() === false) { return; }

    const species = state.getSpecies();
    const cockDef = species.getBody().cock;

    const cockData = {
      count: 1,
      placement: 'normal',
      shape: cockDef.shape || 'normal',
      minUrethraWidth: 0,
      size: Random.fromFrequencyMap(species.getBody().cock.size),
    };

    const sizeData = CockData.CockSizes[cockData.size];
    const shapeData = CockData.CockShapes[cockData.shape];

    Object.assign(cockData, cockOfSize(sizeData, shapeData, species));
    Object.assign(cockData, ballsOfSize(sizeData, shapeData, species));

    setUrethraSize(cockData, cockDef, species);
    applyCockKnot(cockData, shapeData);
    applyHeadFlare(cockData, shapeData);

    state.setCock(cockData);
  }

  // Calculate the base length from the size category's length ranges. Use the base length to calculate the
  // percentile where that cock falls within the length range. Lerp the baseLength to get the baseRange, then apply
  // the species length ratios to get the final lengths and widths.
  function cockOfSize(sizeData, shapeData, species) {
    const lengthRatio = species.getLengthRatio();
    const baseLength = Random.between(sizeData.min, sizeData.max);

    const sizePercentile = (baseLength-sizeData.min) / (sizeData.max-sizeData.min);
    const baseWidth = sizeData.minWidth + (sizePercentile * (sizeData.maxWidth - sizeData.minWidth));
    const widthVariation = Random.rollDice({ x:4, d:10, p:80 }) / 100; // (4d10 + 80) (tight bound 0.80-1.20)
    const cumVariation = Random.rollDice({ x:4, d:10, p:80 }) / 100; // (4d10 + 80) (tight bound 0.80-1.20)

    const cockData = {
      length: Math.max(24,Math.round(lengthRatio * baseLength)),
      width: Math.round(lengthRatio * baseWidth * widthVariation),
      cumVolume: Math.round(sizeData.cumVolume * species.getBody().cock.cumMultiplier * cumVariation),
    }

    // Once we have all the basic lengths, widths, and volumes calculated we make shape specific adjustments, adding
    // shape specific features like knots and flares, or not including some features that aren't applicable.
    if (shapeData.sheath !== true) {
      const flaccidRatio = Random.rollDice({ x:4, d:10, p:40 }) / 100 // (4d10 + 40) (tight bound 0.40-0.80)
      cockData.flaccidLength = Math.max(24,Math.round(cockData.length * flaccidRatio));
    }

    return cockData;
  }

  // Balls will return an empty array if this species shouldn't have balls.
  function ballsOfSize(sizeData, shapeData, species) {
    if (shapeData.internalTesticles === true) { return {}; }

    const baseTesticleWidth = Random.between(sizeData.minWidth, sizeData.maxWidth);
    return {
      testicleWidth: Math.round(species.getLengthRatio() * baseTesticleWidth  * 1.1)
    }
  }

  function setUrethraSize(cockData, cockDef, species) {
    const urethraMin = cockDef.urethraWidthMin || 3;
    const urethraMax = cockDef.urethraWidthMax || 6;
    cockData.maxUrethraWidth = Math.max(2, Math.round(Random.between(urethraMin,urethraMax) * species.getLengthRatio()));
  }

  // === Triggers ======================================================================================================

  // This is ugly, but even if the character doesn't have a cock (and the trigger is ignored) we still need to remove
  // that trigger, and only that trigger.
  function applyTriggers() {
    const state = CharacterFactory.getState();
    const cockData = state.getCock();
    const species = state.getSpecies();

    function andRemove(trigger) {
      Console.log(`Applied ${trigger}`,{ system:'CockFactory', level:3 });
      state.removeTrigger(trigger);
    }

    state.getTriggers().forEach(trigger => {
      if (trigger === 'big-cock') {
        if (cockData) { makeCockBig(cockData, species); }
        andRemove(trigger);
      }
      if (trigger === 'huge-cock') {
        if (cockData) { makeCockHuge(cockData, species); }
        andRemove(trigger);
      }
      if (trigger === 'big-balls') {
        if (cockData && cockData.testicleWidth) { makeBallsBig(cockData, species); }
        andRemove(trigger);
      }
      if (trigger === 'huge-balls') {
        if (cockData && cockData.testicleWidth) { makeBallsHuge(cockData, species); }
        andRemove(trigger);
      }
      if (trigger === 'dog-cock') {
        if (cockData) { changeCockShape('dog', cockData); }
        andRemove(trigger);
      }
      if (trigger === 'horse-cock') {
        if (cockData) { changeCockShape('horse', cockData); }
        andRemove(trigger);
      }
      if (trigger === 'two-cocks') {
        if (cockData) { cockData.count = 2; }
        andRemove(trigger);
      }
      if (trigger === 'three-cocks') {
        if (cockData) { cockData.count = 3; }
        andRemove(trigger);
      }
    });

    state.setCock(cockData);
  }

  // Increase size to big (or huge if the size is already big, or monster if already huge)
  function makeCockBig(cockData, species) {
    let newSize = 'big'
    switch(cockData.size) {
      case 'big':  newSize = 'huge';    break;
      case 'huge': newSize = 'monster'; break;
    }
    changeCockSizeTo(newSize, cockData, species);
  }

  function makeBallsBig(cockData, species) {
    let newSize = 'big'
    switch(cockData.size) {
      case 'big':  newSize = 'huge';    break;
      case 'huge': newSize = 'monster'; break;
    }
    changeBallsSizeTo(newSize, cockData, species);
  }

  // Increase size to huge (or monster if the size is already huge)
  function makeCockHuge(cockData, species) {
    changeCockSizeTo((cockData.size === 'huge') ? 'monster' : 'huge', cockData, species);
  }

  function makeBallsHuge(cockData, species) {
    changeBallsSizeTo((cockData.size === 'huge') ? 'monster' : 'huge', cockData, species);
  }

  function changeCockSizeTo(newSize, cockData, species) {
    const sizeData = CockData.CockSizes[newSize];
    const shapeData = CockData.CockShapes[cockData.shape];

    cockData.size = newSize;
    Object.assign(cockData, cockOfSize(sizeData, shapeData, species));
  }

  function changeBallsSizeTo(newSize, cockData, species) {
    const sizeData = CockData.CockSizes[newSize];
    const shapeData = CockData.CockShapes[cockData.shape];

    cockData.testicleWidth = ballsOfSize(sizeData, shapeData, species).testicleWidth;
  }

  // Change the shape without changing the size. Also applies knots and flares if they need to exist. However this
  // function doesn't try to remove already existing features. Some triggers might add cock features without changing
  // the shape, so we want to maintain those features. Instead, we reject characters with shapes other than normal.
  function changeCockShape(newShape, cockData) {
    if (cockData.shape === newShape) { return }
    if (cockData.shape !== 'normal') {
      throw new Error(`Character Rejected: Can't change ${cockData.shape} cock to ${newShape} cock.`);
    }

    cockData.shape = newShape;

    const shapeData = CockData.CockShapes[cockData.shape];
    applyCockKnot(cockData, shapeData);
    applyHeadFlare(cockData, shapeData);
  }

  // The knot size is a percentage of cock width, anywhere between 120% - 150%. Knot flare is the additional width
  // as a percentage of knot width that the knot grows during orgasm. An inch wide cock, with 150% / 150% growth
  // factors would normally have a 1.5 inch wide knot, then a 2.25 inch wide knot during orgasm. The 'knotting'
  // action depends on the smaller knot fitting, then the larger knot being too large to remove.
  function applyCockKnot(cockData, shapeData) {
    if (shapeData.knot) {
      cockData.knotRatio = 120 + Random.roll(30);
      cockData.knotFlare = 120 + Random.roll(30);
    }
  }

  // The percentage of the cock width that the cock head grows to during orgasm, between 150% and 200%. This can lead
  // to scenes where a two inch wide cock flares out to four inches wide deep inside of someone.
  function applyHeadFlare(cockData, shapeData) {
    if (shapeData.headFlare) {
      cockData.headFlare = 150 + Random.roll(50);
    }
  }

  return {
    build,
    applyTriggers
  };

})();
