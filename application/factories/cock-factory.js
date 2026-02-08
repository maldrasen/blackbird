global.CockFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const cockDef = species.getBody().cock;

    const cockData = {
      placement: 'normal',
      shape: cockDef.shape || 'normal',
      minUrethraWidth: 0,
      size: Random.fromFrequencyMap(species.getBody().cock.size),
    };

    const sizeData = CockData.CockSizes[cockData.size];
    const shapeData = CockData.CockShapes[cockData.shape];

    Object.assign(cockData, cockOfSize(sizeData, shapeData, species));
    Object.assign(cockData, ballsOfSize(sizeData, shapeData, species));

    const urethraMin = cockDef.urethraWidthMin || 3;
    const urethraMax = cockDef.urethraWidthMax || 6;
    cockData.maxUrethraWidth = Math.max(2, Math.round(Random.between(urethraMin,urethraMax) * species.getLengthRatio()));

    // The knot size is a percentage of cock width, anywhere between 120% - 150%. Knot flare is the additional width
    // as a percentage of knot width that the knot grows during orgasm. An inch wide cock, with 150% / 150% growth
    // factors would normally have a 1.5 inch wide knot, then a 2.25 inch wide knot during orgasm. The 'knotting'
    // action depends on the smaller knot fitting, then the larger knot being too large to remove.
    if (shapeData.knot) {
      cockData.knotRatio = 120 + Random.roll(30);
      cockData.knotFlare = 120 + Random.roll(30);
    }

    // The percentage of the cock width that the cock head grows to during orgasm, between 150% and 200%. This can lead
    // to scenes where a two inch wide cock flares out to four inches wide deep inside of someone.
    if (shapeData.headFlare) {
      cockData.headFlare = 150 + Random.roll(50);
    }

    return cockData;
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


  function applyTriggers(cockData, actorData, triggers) {

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'CockFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    [...triggers].forEach(trigger => {

      if (trigger === 'big-cock') {
        if (cockData) { makeCockBig(cockData, actorData); }
        andRemove(trigger);
      }
      if (trigger === 'huge-cock') {
        if (cockData) { makeCockHuge(cockData, actorData); }
        andRemove(trigger);
      }
      if (trigger === 'big-balls') {
        if (cockData && cockData.testicleWidth) { makeBallsBig(cockData, actorData); }
        andRemove(trigger)
      }
      if (trigger === 'huge-balls') {
        if (cockData && cockData.testicleWidth) { makeBallsHuge(cockData, actorData); }
        andRemove(trigger)
      }
      if (trigger === 'dog-cock') {
        andRemove(trigger)
      }
      if (trigger === 'horse-cock') {
        andRemove(trigger)
      }
      if (trigger === 'two-cocks') {
        andRemove(trigger)
      }
      if (trigger === 'three-cocks') {
        andRemove(trigger)
      }
    });
  }

  // Increase size to big (or huge if the size is already big, or monster if already huge)
  function makeCockBig(cockData, actorData) {
    let newSize = 'big'
    switch(cockData.size) {
      case 'big':  newSize = 'huge';    break;
      case 'huge': newSize = 'monster'; break;
    }
    changeCockSizeTo(newSize, cockData, actorData);
  }

  function makeBallsBig(cockData, actorData) {
    let newSize = 'big'
    switch(cockData.size) {
      case 'big':  newSize = 'huge';    break;
      case 'huge': newSize = 'monster'; break;
    }
    changeBallsSizeTo(newSize, cockData, actorData);
  }

  // Increase size to huge (or monster if the size is already huge)
  function makeCockHuge(cockData, actorData) {
    changeCockSizeTo((cockData.size === 'huge') ? 'monster' : 'huge', cockData, actorData);
  }

  function makeBallsHuge(cockData, actorData) {
    changeBallsSizeTo((cockData.size === 'huge') ? 'monster' : 'huge', cockData, actorData);
  }

  function changeCockSizeTo(newSize, cockData, actorData) {
    const sizeData = CockData.CockSizes[newSize];
    const shapeData = CockData.CockShapes[cockData.shape];
    const species = Species.lookup(actorData.species);

    cockData.size = newSize;
    Object.assign(cockData, cockOfSize(sizeData, shapeData, species));
  }

  function changeBallsSizeTo(newSize, cockData, actorData) {
    const sizeData = CockData.CockSizes[newSize];
    const shapeData = CockData.CockShapes[cockData.shape];
    const species = Species.lookup(actorData.species);

    cockData.testicleWidth = ballsOfSize(sizeData, shapeData, species).testicleWidth;
  }

  return Object.freeze({ build, applyTriggers });

})();
