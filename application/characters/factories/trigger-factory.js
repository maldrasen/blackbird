global.TriggerFactory = (function() {

  // Rather than applying random adjustments during body creation, we create triggers for them. We need to do this
  // because there are triggers that come from the names that do the exact same thing. So, rather than implementing the
  // same thing in two different ways, we create triggers for everything, then apply everything after all the body data
  // objects have been built.
  function addRandomTriggers() {
    const state = CharacterFactory.getState();
    if (Random.roll(100) > state.getSpecies().getMutability()) { return; }

    // Get an uncommon mutation 80% of the time.
    if (Random.roll(100) < 80) {
      switch(Random.roll(5)) {
        case 0: return uncommonEarsAndTail(state);
        case 1: return uncommonEyeColor(state);
        case 2: return uncommonEyeShape(state);
        case 3: return uncommonHairColor(state);
        case 4: return uncommonHorns(state);
      }
    }

    if (Random.roll(100) < 80) {
      switch(Random.roll(5)) {
        case 0: return state.addTrigger('erogenous-throat');
        case 1: return state.addTrigger('erogenous-cervix');
        case 2: return state.addTrigger('erogenous-urethra');
        case 3: return rareAspect(state, 'premature');
        case 4: return rareAspect(state, 'productive');
      }
    }

    // TODO: Otherwise (4%) get something very strange. Nipple cunts, extra
    //       cocks, etc. Perhaps extreme sensitivities like S rank anus.
  }

  function uncommonEarsAndTail(state) {
    const shape = Random.from(BodyData.TailShapes);
    state.addTrigger(`${shape}-tail`);

    if (BodyData.UncommonEarShapes.includes(shape)) {
      state.addTrigger(`${shape}-ears`) }
    if (shape === 'horse') {
      state.addTriggers(['horse-cock','horse-pussy','horse-anus']); }
  }

  function uncommonEyeShape(state) {
    const shape = Random.from(BodyData.EyeShapes);
    state.addTrigger(`${shape}-eyes`);

    if (shape === 'cat')    { state.addTriggers(['cat-tail','cat-ears']); }
    if (shape === 'heart')  { state.addTrigger('~slut'); }
    if (shape === 'dragon') { state.addTrigger('forked-tongue'); }
  }

  function uncommonHorns(state) {
    const shape = Random.from(BodyData.HornShapes);
    state.addTrigger(`${shape}-horn`);

    // Getting cow horns adds cow features. Milky balls and tits.
    if (shape === 'forwardCow') {
      state.addTriggers(['cow-tail','huge-balls','huge-tits','cow-tits','milky','productive:3']); }

    // Getting a unicorn horn adds horse features.
    if (shape === 'unicorn') {
      state.addTriggers(['horse-tail','horse-ears','horse-cock','horse-pussy','horse-anus']); }
  }

  function uncommonEyeColor(state) { state.addTrigger(`${Random.from(BodyData.UncommonEyeColors)}-eyeColor`); }
  function uncommonHairColor(state) { state.addTrigger(`${Random.from(BodyData.UncommonHairColors)}-hair`); }

  function rareAspect(state, aspectType) {
    const level = Random.fromFrequencyMap({ '1':100, '2':10, '3':1 });
    state.addTrigger(`${aspectType}:${level}`);
  }

  return {
    addRandomTriggers,
  };

})();
