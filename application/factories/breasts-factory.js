
//   'nippleShape','nippleWidth',
//   'nippleLength','nippleShade','areolaWidth','lactationFactor','orificeMinWidth','orificeMaxWidth','description'];

global.BreastsFactory = (function() {

  function build(actor) {
    const species = Species.lookup(actor.species);
    const breastsData = {
      breastCount: 2,
      breastSize: Random.fromFrequencyMap(species.getBody().breasts),
      breastFirmness: Random.from(Object.keys(BreastData.BreastFirmness)),
    };

    const builtBreasts = buildBreasts(species, breastsData.breastSize, breastsData.breastFirmness);
    breastsData.relativeBreastVolume = builtBreasts.relativeVolume;
    breastsData.absoluteBreastVolume = builtBreasts.absoluteVolume;
    breastsData.breastShape = builtBreasts.breastShape;

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
    const volumeRatio = (species.getAverageHeight() / 1750) ** 3
    return Math.round(relativeVolume * volumeRatio);
  }

  return Object.freeze({ build });

})();
