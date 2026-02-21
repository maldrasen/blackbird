global.TriggerFactory = (function() {

  // Rather than applying random adjustments during body creation, we create triggers for them. We need to do this
  // because there are triggers that come from the names that do the exact same thing. So, rather than implementing the
  // same thing in two different ways, we create triggers for everything, then apply everything after all the body data
  // objects have been built.
  function addRandomTriggers(triggers, species) {
    if (Random.roll(100) > species.getMutability()) { return; }

    // Get an uncommon mutation 80% of the time.
    if (Random.roll(100) < 80) {
      switch(Random.roll(5)) {
        case 0: return uncommonEarsAndTail(triggers);
        case 1: return uncommonEyeColor(triggers);
        case 2: return uncommonEyeShape(triggers);
        case 3: return uncommonHairColor(triggers);
        case 4: return uncommonHorns(triggers);
      }
    }

    if (Random.roll(100) < 80) {
      switch(Random.roll(5)) {
        case 0: return triggers.push('erogenous-throat');
        case 1: return triggers.push('erogenous-cervix');
        case 2: return triggers.push('erogenous-urethra');
        case 3: return rareAspect(triggers, 'premature');
        case 4: return rareAspect(triggers, 'productive');
      }
    }

    // TODO: Otherwise (4%) get something very strange. Nipple cunts, extra
    //       cocks, etc. Perhaps extreme sensitivities like S rank anus.
  }

  function uncommonEarsAndTail(triggers) {
    const shape = Random.from(BodyData.TailShapes);
    triggers.push(`${shape}-tail`);

    if (BodyData.UncommonEarShapes.includes(shape)) {
      triggers.push(`${shape}-ears`) }
    if (shape === 'horse') {
      triggers.push(...['horse-cock','horse-pussy','horse-anus']); }

    return triggers;
  }

  function uncommonEyeShape(triggers) {
    const shape = Random.from(BodyData.EyeShapes);
    triggers.push(`${shape}-eyes`);

    if (shape === 'cat')    { triggers.push(...['cat-tail','cat-ears']); }
    if (shape === 'heart')  { triggers.push('slut'); }
    if (shape === 'dragon') { triggers.push('forked-tongue'); }

    return triggers;
  }

  function uncommonHorns(triggers) {
    const shape = Random.from(BodyData.HornShapes);
    triggers.push(`${shape}-horn`);

    // Getting cow horns adds cow features. Milky balls and tits.
    if (shape === 'forward-cow') {
      triggers.push(...['cow-tail','huge-balls','huge-tits','cow-tits','milky','productive:3']); }

    // Getting a unicorn horn adds horse features.
    if (shape === 'unicorn') {
      triggers.push(...['horse-tail','horse-ears','horse-cock','horse-pussy','horse-anus']); }

    return triggers;
  }

  function uncommonEyeColor(triggers) { triggers.push(`${Random.from(BodyData.UncommonEyeColors)}-eyeColor`); }
  function uncommonHairColor(triggers) { triggers.push(`${Random.from(BodyData.UncommonHairColors)}-hair`); }

  function rareAspect(triggers, aspectType) {
    const level = Random.fromFrequencyMap({ '1':100, '2':10, '3':1 });
    triggers.push(`${aspectType}:${level}`);
  }

  return Object.freeze({
    addRandomTriggers,
  });

})();

