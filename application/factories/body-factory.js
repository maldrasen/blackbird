global.BodyFactory = (function() {

  function build(actor, triggers) {
    const species = Species.lookup(actor.species);
    const bodyData = {
      height: getRandomHeight(species, actor.gender, triggers),
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

  function getRandomSmell(species) {
    switch(species.getSmellFamily()) {
      case 'all':    return Random.from(BodyData.AllSmells);
      case 'earthy': return Random.from(BodyData.EarthySmells);
      case 'floral': return Random.from(BodyData.FloralSmells);
      case 'lusty':  return Random.from(BodyData.LustySmells);
    }
  }

  // Randomly determine the character's height. This function also applies the 'short' or 'tall' triggers. Because
  // this is done so early in the process, only names should add tall or short. We apply it early because the character
  // height is used in a lot of other places, so it can't be changed later during character creation.
  function getRandomHeight(species, gender, triggers) {
    const femaleHeightRatio = species.getFemaleHeightRatio();
    const futaHeightRatio = 1-(1-femaleHeightRatio)/2;
    const fuzz = 1 + (Random.roll(100)-50)/1000; // 0.9 - 1.1

    let heightRatio = 1;
    if (gender === Gender.female) { heightRatio = femaleHeightRatio; }
    if (gender === Gender.futa)   { heightRatio = futaHeightRatio; }
    if (gender === Gender.enby)   { heightRatio = futaHeightRatio; }

    // Apply Ratios
    const averageHeight = species.getAverageHeight() * heightRatio;
    const deviation = averageHeight * species.getHeightDeviationRatio();

    // If this character is short, set height around two standard deviations below average.
    if (triggers.includes('short')) {
      log(`Applied Short`,{ system:'BodyFactory', level:3 });
      ArrayHelper.remove(triggers,'short');
      return Math.round(averageHeight - (deviation * 2 * fuzz));
    }

    // If this character is tall, set height around two standard deviations above average.
    if (triggers.includes('tall')) {
      log(`Applied Tall`,{ system:'BodyFactory', level:3 });
      ArrayHelper.remove(triggers,'tall');
      return Math.round(averageHeight + (deviation * 2 * fuzz));
    }

    return Random.normalDistribution(averageHeight, deviation);
  }

  function applyTriggers(bodyData, triggers) {
    [...triggers].forEach(trigger => {

      // These triggers include the value that the body property should be set to.
      const match = trigger.match(/(.*)-(tail|ears|eyes|eyeColor|hair|horn)$/);
      if (match) {
        switch (match[2]) {
          case 'tail':     bodyData.tailShape = match[1]; break;
          case 'ears':     bodyData.earShape = match[1]; break;
          case 'eyes':     bodyData.eyeShape = match[1]; break;
          case 'eyeColor': bodyData.eyeColor = match[1]; break;
          case 'hair':     bodyData.hairColor = match[1]; break;
          case 'horn':     bodyData.hornShape = match[1]; break;
        }
        log(`Applied ${trigger}`,{ system:'BodyFactory', level:3 });
        ArrayHelper.remove(triggers,trigger);
      }

      if (trigger === 'dark-skin') {
        bodyData.skinColor = Random.from(BodyData.DarkHumanSkinTones);
        log(`Applied ${trigger}`,{ system:'BodyFactory', level:3 });
        ArrayHelper.remove(triggers,trigger);
      }

      if (trigger === 'light-skin') {
        bodyData.skinColor = Random.from(BodyData.LightHumanSkinTones);
        log(`Applied ${trigger}`,{ system:'BodyFactory', level:3 });
        ArrayHelper.remove(triggers,trigger);
      }
    });
  }

  return Object.freeze({ build, applyTriggers });

})();
