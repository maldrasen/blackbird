global.PersonalityComponent = (function() {
  const $properties = ['archetype','sanity','broken'];

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

    Validate.isIn('Personality.archetype',personalityComponent.archetype, Object.values(ArchetypeCode));
    Validate.between('Personality.sanity',personalityComponent.sanity, 0, 100);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
