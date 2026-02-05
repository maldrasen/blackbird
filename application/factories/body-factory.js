global.BodyFactory = (function() {

  function build(actor, attributes, triggers) {
    const species = Species.lookup(actor.species);
    const bodyData = {
      height: getRandomHeight(species, actor.gender),
      skinType: species.getSkinType(),
      eyeShape: species.getEyeShape(),
      eyeColor: Random.from(BodyData.CommonEyeColors),
      bodySmell: getRandomSmell(species),
    };

    // === Skin, Scales, Hair, and Eyes ===

    if (species.getEarShape()) { bodyData.earShape = species.getEarShape(); }
    if (species.getTailShape()) { bodyData.tailShape = species.getTailShape(); }
    if (species.getHornShape()) { bodyData.hornShape = species.getHornShape(); }

    if (bodyData.skinType === 'scales') {
      bodyData.scaleColor = Random.from(BodyData.ScaleColors);
    } else {
      bodyData.skinColor = Random.from(BodyData.HumanSkinTones);
      bodyData.hairColor = Random.from(BodyData.CommonHairColors);
    }

    return bodyData;
  }

  function getRandomMutation(species) {
    if (Random.roll(100) > species.getMutability()) { return null; }

    // Get an uncommon mutation 80% of the time.
    if (Random.roll(100) < 80) {
      switch(Random.roll(5)) {
        case 0: return uncommonEarsAndTail();
        case 1: return uncommonEyeColor();
        case 2: return uncommonEyeShape();
        case 3: return uncommonHairColor();
        case 4: return uncommonHorns();
      }
    }

    // Otherwise get something more unusual. The above mutations only influence the body component, but this could
    // also generate triggers that effect other body parts or even add aspects. Something like always lactating.
  }

  function uncommonEarsAndTail() {
    const mutation = { tailShape: Random.from(BodyData.TailShapes) };
    if (BodyData.UncommonEarShapes.includes(mutation.tailShape)) { mutation.earShape = mutation.tailShape }
    return mutation;
  }

  function uncommonEyeShape() {
    return {
      eyeColor: Random.from(BodyData.EyeColors),
      eyeShape: Random.from(BodyData.EyeShapes),
    };
  }

  function uncommonHorns() {
    const mutation = { hornShape: Random.from(BodyData.HornShapes) };
    return (mutation.hornShape === 'forward-cow') ? { ...mutation, tailShape:'cow' } : mutation;
  }

  function uncommonEyeColor() { return { eyeColor: Random.from(BodyData.UncommonEyeColors)}; }
  function uncommonHairColor() { return { hairColor: Random.from(BodyData.UncommonHairColors)}; }

  function getRandomSmell(species) {
    switch(species.getSmellFamily()) {
      case 'all':    return Random.from(BodyData.AllSmells);
      case 'earthy': return Random.from(BodyData.EarthySmells);
      case 'floral': return Random.from(BodyData.FloralSmells);
      case 'lusty':  return Random.from(BodyData.LustySmells);
    }
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

  return Object.freeze({
    build,
    uncommonEarsAndTail,
    uncommonEyeColor,
    uncommonHorns,
  });

})();
