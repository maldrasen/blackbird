global.BreastsFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const breastsData = {
      breastCount: 2,
      breastSize: Random.fromFrequencyMap(species.getBody().breasts),
      breastFirmness: Random.from(Object.keys(BreastData.BreastFirmness)),
      nippleShape: Random.fromFrequencyMap(BreastData.NippleShapes),
      nippleShade: Random.roll(5),
      orificeMinWidth: 0,
      orificeMaxWidth: 0,
      lactationFactor: 0,
    };

    const builtBreasts = buildBreasts(species, breastsData.breastSize, breastsData.breastFirmness);
    breastsData.relativeBreastVolume = builtBreasts.relativeVolume;
    breastsData.absoluteBreastVolume = builtBreasts.absoluteVolume;
    breastsData.breastShape = builtBreasts.breastShape;

    const randomLength = Random.normalDistribution(12,6);
    const randomWidthRatio = Random.between(4,8)/10;

    breastsData.nippleLength = Math.round(randomLength * species.getLengthRatio());
    breastsData.nippleWidth = Math.round(breastsData.nippleLength * randomWidthRatio)
    breastsData.areolaWidth = Math.round(Random.normalDistribution(48,18) * species.getLengthRatio());

    if (breastsData.nippleLength < 3) { breastsData.nippleLength = 3;}
    if (breastsData.nippleWidth < 2) { breastsData.nippleWidth = 2;}
    if (breastsData.areolaWidth < breastsData.nippleWidth * 2) { breastsData.areolaWidth = breastsData.nippleWidth * 2 }

    return breastsData;
  }

  // The breast size categories describe relative breast size in relation to the character's body. Breast volume is
  // an absolute measurement for calculations like breast weight, milk volume, etc. Volume scales on a cubic ratio,
  // so a stacked halfling is still pretty small in terms of absolute volume.
  //
  // I've split this method out because triggers that change the breast size category will need to recalculate all of
  // these values and save them on the breast component. If breasts change size outside the character factory we'll
  // need more subtle ways of calculating slow breast growth.
  function buildBreasts(species, size, firmness) {
    const volumeRange = BreastData.BreastSizes[size];
    const relativeVolume = Random.between(volumeRange.min, volumeRange.max);
    const absoluteVolume = calculateAbsoluteVolume(species,relativeVolume);
    const breastShape = Random.from(BreastData.BreastShapeTable[size][firmness]);

    return { relativeVolume, absoluteVolume, breastShape };
  }

  // General function that converts a relative breast volume into an absolute breast volume. This should be called
  // every time a breast's relative volume changes in order to keep absolute volume consistent.
  function calculateAbsoluteVolume(species, relativeVolume) {
    return Math.round(relativeVolume * species.getVolumeRatio());
  }

  function applyTriggers(breastData, triggers) {
    [...triggers].forEach(trigger => {
    });
  }

  return Object.freeze({ build, applyTriggers });

})();
