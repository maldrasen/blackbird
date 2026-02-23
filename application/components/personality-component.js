global.PersonalityComponent = (function() {
  const $properties = ['calm','kind','violent','sanity','broken'];

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

    Validate.between('Personality.sanity',personalityComponent.sanity, 0, 100);

    ['calm','kind','violent'].forEach(key => {
      Validate.between(`Personality.${key}`,personalityComponent[key],-100,100);
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
