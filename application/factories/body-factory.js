global.BodyFactory = (function() {


  function build(actor, attributes, triggers) {
    const species = Species.lookup(actor.species);
    const bodyData = {};

    bodyData.height = getRandomHeight(species, actor.gender);
    bodyData.skinType = species.getSkinType();

    console.log('---')
    console.log(`${actor.species} ${actor.gender} = ${MeasurementHelper.feetAndInchesAbbreviated(bodyData.height)}`);

    console.log("Data:",bodyData);
    console.log('')

    // Cosmetic
    // Skin Type - will be skin, fur, scales
    // Skin Color - Skin or Scales
    // Eye Color
    // Iris Shape - Always assume normal for that species unless specified.
    // Hair Color - Hair but also fur if skin type is fur
    // Ear Shape - Lots of characters with animal ears in this version I think.
    // Tail Shape
    // Horn Shape


    return bodyData;
  }

  function getRandomMutation(species, gender) {
    if (Random.roll(100) > species.getMutability()) { return null; }

    // Common
    //   Ear and Tail
    //   Horns
    //   Eye Color, Iris Shape
    //
    // Unusual
    //   Always lactate


  }

  function getRandomHeight(species, gender) {
    const heightDeviationRatio = species.getHeightDeviationRatio();
    const femaleHeightRatio = species.getFemaleHeightRatio();

    // Apply Ratios
    const averageHeight = species.getAverageHeight() * (gender === Gender.female ? femaleHeightRatio : 1);
    const deviation = averageHeight * heightDeviationRatio;

    // Get random multiplier.
    const multiplier = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());

    return Math.round(averageHeight + (multiplier * deviation));
  }

  return Object.freeze({ build });

})();
