global.TriggerFactory = (function() {

  function addRandomTriggers(triggers, species) {
    getRandomMutations(species).forEach(trigger => {
      console.log("Add Trigger: ",trigger);
      triggers.push(trigger);
    });
  }

  function getRandomMutations(species) {
    if (Random.roll(100) > species.getMutability()) { return []; }

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

    // TODO: Add more unusual triggers 80% of the remaining time (16%)
    // TODO: Otherwise (4%) get something very strange.
    return [];
  }

  function uncommonEarsAndTail() {
    const shape = Random.from(BodyData.TailShapes);
    const triggers = [`${shape}-tail`];

    if (BodyData.UncommonEarShapes.includes(shape)) {
      triggers.push(`${shape}-ears`)
    }

    if (shape === 'horse') {
      triggers.push(...['horse-cock','horse-pussy','horse-anus']);
    }

    return triggers;
  }

  function uncommonEyeShape() {
    const shape = Random.from(BodyData.EyeShapes);
    const triggers = [
      `${Random.from(BodyData.EyeColors)}-eyeColor`,
      `${shape}-eyes`,
    ];

    if (shape === 'cat')    { triggers.push(...['cat-tail','cat-ears']); }
    if (shape === 'heart')  { triggers.push('slut'); }
    if (shape === 'dragon') { triggers.push('forked-tongue'); }

    return triggers;
  }

  function uncommonHorns() {
    const shape = Random.from(BodyData.HornShapes);
    const triggers = [`${shape}-horn`];

    // Getting cow horns adds cow features. Milky balls and tits.
    if (shape === 'forward-cow') {
      triggers.push(...['cow-tail','huge-balls','huge-tits','cow-tits','milky','productive:3'])
    }

    // Getting a unicorn horn adds horse features.
    if (shape === 'unicorn') {
      triggers.push(...['horse-tail','horse-ears','horse-cock','horse-pussy','horse-anus'])
    }

    return triggers;
  }

  function uncommonEyeColor() { return [`${Random.from(BodyData.UncommonEyeColors)}-eyes`]; }
  function uncommonHairColor() { return [`${Random.from(BodyData.UncommonHairColors)}-hair`]; }

  return Object.freeze({
    addRandomTriggers,
  });

})()


// TODO: Check the trigger list to see if we set any of these twice
// const triggerTypes = ['-tail','-ears','-eyes','-eyeColor','-hair','-horn'];

// Separate Trigger Applier?
// function applyBodyTriggers() {
//
// }

// === Resolve Triggers ===
// Object.keys(mutation).forEach(key => {
//   if (key !== 'addTriggers') {
//     log(`Mutation changed ${key}: ${bodyData[key]} becomes ${mutation[key]}`,{ system:'BodyFactory', level:3 });
//     bodyData[key] = mutation[key];
//   }
// });
