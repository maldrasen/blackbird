global.PersonalityFactory = (function() {

  function rollPersonality(gender,species) {
    const ranges = Species.lookup(species).getPersonalityRanges();
    const personality = { sanity:100 };

    Object.keys(ranges).forEach(key => {
      const range = ranges[key];
      personality[key] = Random.normalDistribution(range.average, range.deviation);
    });

    return personality;
  }

  function applyTriggers(personalityData, triggers) {

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'PersonalityFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    if (triggers.includes['calm'] && triggers.includes['excitable']) {
      throw `Character rejected. Cannot be both calm and excitable.` }
    if (triggers.includes['kind'] && triggers.includes['cruel']) {
      throw `Character rejected. Cannot be both kind and cruel.` }
    if (triggers.includes['violent'] && triggers.includes['passive']) {
      throw `Character rejected. Cannot be both violent and passive.` }

    [...triggers].forEach(trigger => {
      if (trigger === 'calm') {
        adjustProperty(personalityData, 'calm', 'positive');
        andRemove(trigger); }
      if (trigger === 'kind') {
        adjustProperty(personalityData, 'kind', 'positive');
        andRemove(trigger); }
      if (trigger === 'violent') {
        adjustProperty(personalityData, 'violent', 'positive');
        andRemove(trigger); }
      if (trigger === 'excitable') {
        adjustProperty(personalityData, 'calm', 'negative');
        andRemove(trigger); }
      if (trigger === 'cruel') {
        adjustProperty(personalityData, 'kind', 'negative');
        andRemove(trigger); }
      if (trigger === 'passive') {
        adjustProperty(personalityData, 'violent', 'negative');
        andRemove(trigger); }
    });
  }

  // The trigger will just reset the personality value into a range that's
  // within normal bounds for that personality type.
  function adjustProperty(personalityData, code, direction) {
    personalityData[code] = (direction === 'positive') ? Random.between(20,60) : -Random.between(20,60);
  }

  return Object.freeze({
    rollPersonality,
    applyTriggers,
  });

})();
