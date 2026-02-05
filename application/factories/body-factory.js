global.BodyFactory = (function() {


  function build(actor, attributes, triggers) {
    const bodyData = {};

    bodyData.height = getRandomHeight(actor.species, actor.gender);


    console.log(`${actor.species} ${actor.gender} = ${MeasurementHelper.feetAndInchesAbbreviated(bodyData.height)} ${MeasurementHelper.feetAndInchesInEnglish(bodyData.height)}`);

    // Height - actually important for lots of calculations;

    // Cosmetic
    // Skin Type - will be skin, fur, scales
    // Skin Color - Skin or Scales
    // Eye Color
    // Hair Color - Hair but also fur if skin type is fur
    // Ear Shape - Lots of characters with animal ears in this version I think.

    // Tail Shape
    // Horn Shape
    // Wing Shape


    return bodyData;
  }

  function getRandomHeight(speciesCode, genderCode) {
    const species = Species.lookup(speciesCode)
    const heightDeviationRatio = species.getHeightDeviationRatio();
    const femaleHeightRatio = species.getFemaleHeightRatio();

    // Apply Ratios
    const averageHeight = species.getAverageHeight() * (genderCode === Gender.female ? femaleHeightRatio : 1);
    const deviation = averageHeight * heightDeviationRatio;

    // Get random multiplier.
    const multiplier = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());

    return averageHeight + (multiplier * deviation);
  }

  return Object.freeze({ build });

})();
