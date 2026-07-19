global.ExperienceComponent = (function() {
  const properties = ['level','essence'];

  function create(id, data={}) {
    if (data.level == null) { data.level = 0; }
    if (data.essence == null) { data.essence = 0; }

    Registry.createComponent(id,ComponentType.experience,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.experience,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.experience);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.experience);
  }

  function validate(id) {
    const experienceComponent = lookup(id);

    Object.keys(experienceComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Experience component does not have a ${key} property.`);
      }
    });

    Validate.atLeast('Experience.level',experienceComponent.level,0);
    Validate.atLeast('Experience.essence',experienceComponent.essence,0);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
