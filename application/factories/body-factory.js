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

    // === Random Mutations ===

    const mutation = getRandomMutation(actor, species);
    if (mutation) {

      // Triggers are added to the existing trigger list.
      (mutation.addTriggers||[]).forEach(trigger => {
        log(`Mutation added trigger: ${trigger}`,{ system:'BodyFactory', level:3 });
        triggers.push(trigger);
      });

      // Other keys are used to modify the body data.
      Object.keys(mutation).forEach(key => {
        if (key !== 'addTriggers') {
          log(`Mutation changed ${key}: ${bodyData[key]} becomes ${mutation[key]}`,{ system:'BodyFactory', level:3 });
          bodyData[key] = mutation[key];
        }
      });
    }

    return bodyData;
  }

  function getRandomMutation(actor, species) {
    if (Random.roll(100) > species.getMutability()) { return null }

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

    if (BodyData.UncommonEarShapes.includes(mutation.tailShape)) {
      mutation.earShape = mutation.tailShape
    }

    if (mutation.tailShape === 'horse') {
      mutation.addTriggers = ['horse-cock','horse-pussy','horse-anus'];
    }

    return mutation;
  }

  function uncommonEyeShape() {
    const mutation = {
      eyeColor: Random.from(BodyData.EyeColors),
      eyeShape: Random.from(BodyData.EyeShapes),
    };

    if (mutation.eyeShape === 'cat') {
      mutation.tailShape = 'cat';
      mutation.earShape = 'cat';
    }

    if (mutation.eyeShape === 'heart') {
      mutation.addTriggers = ['slut'];
    }

    if (mutation.eyeShape === 'dragon') {
      mutation.addTriggers = ['forked-tongue'];
    }

    return mutation;
  }

  function uncommonHorns() {
    const mutation = { hornShape: Random.from(BodyData.HornShapes) };

    // Getting cow horns adds some cow features. Milky balls and tits.
    if (mutation.hornShape === 'forward-cow') {
      mutation.tailShape = 'cow';
      mutation.addTriggers = ['huge-balls','huge-tits','cow-tits','milky','productive:3'];
    }

    // Getting a unicorn horn adds some horse features.
    if (mutation.hornShape === 'unicorn') {
      mutation.tailShape = 'horse';
      mutation.earShape = 'horse';
      mutation.addTriggers = ['horse-cock','horse-pussy','horse-anus'];
    }

    return mutation;
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

  // 0.9 - 1.1
  function fuzz() {
    return 1 + (Random.roll(100)-50)/1000
  }

  function getRandomHeight(species, gender, triggers) {
    const femaleHeightRatio = species.getFemaleHeightRatio();
    const futaHeightRatio = 1-(1-femaleHeightRatio)/2;

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
      return Math.round(averageHeight - (deviation * 2 * fuzz()));
    }

    // If this character is tall, set height around two standard deviations above average.
    if (triggers.includes('tall')) {
      log(`Applied Tall`,{ system:'BodyFactory', level:3 });
      ArrayHelper.remove(triggers,'tall');
      return Math.round(averageHeight + (deviation * 2 * fuzz()));
    }

    return Random.normalDistribution(averageHeight, deviation);
  }

  return Object.freeze({ build });

})();
