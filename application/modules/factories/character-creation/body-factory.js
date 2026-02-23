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

    if (bodyData.skinType === 'skin') {
      bodyData.skinColor = Random.from(BodyData.HumanSkinTones);
      bodyData.hairColor = Random.from(BodyData.CommonHairColors);
    }
    if (bodyData.skinType === 'scales') {
      bodyData.scaleColor = Random.from(BodyData.ScaleColors);
    }
    if (bodyData.skinType === 'fur') {
      bodyData.skinColor = Random.from(BodyData.HumanSkinTones);
      bodyData.furColor = Random.from(BodyData.CommonHairColors);
    }
    if (bodyData.skinType === 'fur&hair') {
      bodyData.skinColor = Random.from(BodyData.HumanSkinTones);
      bodyData.furColor = Random.from(BodyData.CommonHairColors);
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

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'BodyFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    // (Converts 'red-hairs' type trigger into 'darkRed-hair')
    pickSingleHairColor(triggers);

    checkDuplicates(triggers,'tail');
    checkDuplicates(triggers,'ears');
    checkDuplicates(triggers,'eyes');
    checkDuplicates(triggers,'eyeColor');
    checkDuplicates(triggers,'hair');
    checkDuplicates(triggers,'horn');
    checkDuplicates(triggers,'skin');

    [...triggers].forEach(trigger => {

      // These triggers include the value that the body property should be set to.
      const match = trigger.match(/(.*)-(tail|ears|eyes|eyeColor|hair|horn)$/);
      if (match) {
        switch (match[2]) {
          case 'tail':     bodyData.tailShape = match[1]; break;
          case 'ears':     bodyData.earShape = match[1]; break;
          case 'eyes':     bodyData.eyeShape = match[1]; break;
          case 'eyeColor': bodyData.eyeColor = match[1]; break;
          case 'hair':     applyHairTrigger(bodyData,match[1]); break;
          case 'horn':     bodyData.hornShape = match[1]; break;
        }
        andRemove(trigger);
      }

      if (trigger === 'dark-skin') {
        bodyData.skinColor = Random.from(BodyData.DarkHumanSkinTones);
        andRemove(trigger);
      }

      if (trigger === 'light-skin') {
        bodyData.skinColor = Random.from(BodyData.LightHumanSkinTones);
        andRemove(trigger);
      }
    });
  }

  // Leave the ArrayHelper.remove() function inside of each if statement. If we
  // add a different (color)-hairs trigger, and it isn't matched, an error will
  // then be generated for an unresolved trigger if it's not matched here.
  function pickSingleHairColor(triggers) {
    [...triggers].forEach(trigger => {
      const match = trigger.match(/(.*)-hairs$/);
      if (match) {
        if (match[1] === 'black') {
          triggers.push(`${Random.from(['blackBrown','black','jetBlack'])}-hair`);
          ArrayHelper.remove(triggers,trigger)
        }
        if (match[1] === 'blue') {
          triggers.push(`${Random.from(['lightBlue','blue','darkBlue'])}-hair`);
          ArrayHelper.remove(triggers,trigger)
        }
        if (match[1] === 'green') {
          triggers.push(`${Random.from(['lightGreen','green','darkGreen'])}-hair`);
          ArrayHelper.remove(triggers,trigger)
        }
        if (match[1] === 'purple') {
          triggers.push(`${Random.from(['lightPurple','purple','darkPurple'])}-hair`);
          ArrayHelper.remove(triggers,trigger)
        }
        if (match[1] === 'red') {
          triggers.push(`${Random.from(['copper','auburn','darkRed','red'])}-hair`);
          ArrayHelper.remove(triggers,trigger)
        }
      }
    });
  }

  function checkDuplicates(triggers, type) {
    if (triggers.filter(trigger => trigger.match(new RegExp(`-${type}$`))).length > 1) {
      throw `Character rejected. Triggers array contains more than one ${type} trigger.`
    }
  }

  // A hair-color trigger will apply a scale color to scaly characters.
  const hairScaleMapping = {
    red:    ['copper','auburn','chestnut','darkRed','red','pink'],
    gold:   ['platinumBlond','blond','strawberryBlond','goldenBlond','darkBlond','lightBrown','brown'],
    green:  ['lightGreen','green','darkGreen'],
    blue:   ['lightBlue','blue','darkBlue'],
    purple: ['lightPurple','purple','darkPurple'],
    black:  ['darkBrown','blackBrown','black','jetBlack'],
    gray:   ['gray','white'],
  }

  // Hair trigger in this case is a trigger that changes the hair color. This
  // is more complex than the other triggers because we should also make it
  // apply to fur or scale color if possible, or reject the character if not.
  function applyHairTrigger(bodyData, color) {
    if (bodyData.hairColor) { return bodyData.hairColor = color; }
    if (bodyData.furColor) { return bodyData.furColor = color; }
    if (bodyData.scaleColor == null) { throw `BodyData has no hair, fur, or scales.`; }

    Object.keys(hairScaleMapping).forEach(scaleColor => {
      if (hairScaleMapping[scaleColor].includes(color)) {
        bodyData.scaleColor = scaleColor;
      }
    });
  }

  return Object.freeze({ build, applyTriggers });

})();
