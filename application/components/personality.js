// Personality is mostly based on the big five personality traits, plus the addition of a sanity
//    https://en.wikipedia.org/wiki/Big_Five_personality_traits

global.Personality = (function() {
  const $properties = ['openness','conscientiousness','extraversion','agreeableness','neuroticism','sanity','broken'];

  function getProperties() { return $properties; }

  function validate(id) {
    const personalityComponent = Registry.lookupPersonalityComponent(id)

    Object.keys(personalityComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Personality component does not have a ${key} property.`
      }
    });

    Validate.exists('sanity',personalityComponent.sanity);
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
