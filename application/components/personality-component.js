// Personality is mostly based on the big five personality traits, plus the addition of a sanity
//    https://en.wikipedia.org/wiki/Big_Five_personality_traits

global.PersonalityComponent = (function() {
  const $properties = ['openness','conscientiousness','extraversion','agreeableness','neuroticism','sanity','broken'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.personality,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.personality,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.personality);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.personality);
  }

  function validate(id) {
    const personalityComponent = lookup(id)

    Object.keys(personalityComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Personality component does not have a ${key} property.`
      }
    });

    Validate.exists('Personality.sanity',personalityComponent.sanity);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
