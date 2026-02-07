global.CockFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const cockData = {
      placement: 'normal',
      shape: species.getBody().cock.shape || 'normal',
    };

    const size = Random.fromFrequencyMap(species.getBody().cock.size);
    const sizeData = CockData.CockSizes[size];
    const shapeData = CockData.CockShapes[cockData.shape];

    // Calculate the base length from the size category's length ranges. Use the base length to calculate the
    // percentile where that cock falls within the length range. Lerp the baseLength to get the baseRange, then apply
    // the species length ratios to get the final lengths and widths.
    const lengthRatio = species.getLengthRatio();
    const baseLength = Random.between(sizeData.min, sizeData.max);
    const sizePercentile = (baseLength-sizeData.min) / (sizeData.max-sizeData.min);
    const baseWidth = sizeData.minWidth + (sizePercentile * (sizeData.maxWidth - sizeData.minWidth));

    const widthVariation = Random.rollDice({ x:4, d:10, p:80 }) / 100; // (4d10 + 80) (tight bound 0.80-1.20)
    const cumVariation = Random.rollDice({ x:4, d:10, p:80 }) / 100; // (4d10 + 80) (tight bound 0.80-1.20)

    cockData.length = Math.max(24,Math.round(lengthRatio * baseLength));
    cockData.width = Math.round(lengthRatio * baseWidth * widthVariation);
    cockData.cumVolume = Math.round(sizeData.cumVolume * species.getBody().cock.cumMultiplier * cumVariation);

    // Once we have all the basic lengths, widths, and volumes calculated we make shape specific adjustments, adding
    // shape specific features like knots and flares, or not including some features that aren't applicable.
    if (shapeData.sheath !== true) {
      const flaccidRatio = Random.rollDice({ x:4, d:10, p:40 }) / 100 // (4d10 + 40) (tight bound 0.40-0.80)
      cockData.flaccidLength = Math.max(24,Math.round(cockData.length * flaccidRatio));
    }

    if (shapeData.internalTesticles !== true) {
      const baseTesticleWidth = Random.between(sizeData.minWidth, sizeData.maxWidth);
      cockData.testicleWidth = Math.round(lengthRatio * baseTesticleWidth  * 1.1);
    }

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

  return Object.freeze({ build });

})();
