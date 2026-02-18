global.PersonalityFactory = (function() {

  function rollPersonality(gender,species) {
    const ranges = Species.lookup(species).getPersonalityRanges();
    const personality = { sanity:100 };

    Object.keys(ranges).forEach(key => {
      personality[key] = Random.between(ranges[key][0],ranges[key][1]);
    });

    return personality;
  }

  function applyTriggers(personalityData, triggers) {

    function andRemove(trigger) {
      log(`Applied ${trigger}`,{ system:'MouthFactory', level:3 });
      ArrayHelper.remove(triggers, trigger);
    }

    [...triggers].forEach(trigger => {

      if (trigger === 'calm') {
        adjustProperty(personalityData, 'neuroticism', false);
        andRemove(trigger);
      }

      if (trigger === 'kind') {
        adjustProperty(personalityData, 'agreeableness', true)
        andRemove(trigger);
      }

    });
  }

  function adjustProperty(personalityData, code, isIncreased) {
    const factor = isIncreased ? Random.between(150,175) : Random.between(25,50);
    let newValue = Math.round((factor/100) * personalityData[code]);
    if (newValue > 100) { newValue = 100; }
    personalityData[code] = newValue;
  }

  return Object.freeze({
    rollPersonality,
    applyTriggers,
  });

})();
