global.ActorComponent = (function() {
  const $properties = ['title','name','surname','gender','species'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.actor,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.actor,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.actor);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.actor);
  }

  function validate(id) {
    const actorComponent = lookup(id)

    Object.keys(actorComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Actor component does not have a ${key} property.`
      }
    });

    Validate.isIn('gender',actorComponent.gender,Object.values(Gender));
    Validate.isIn('species',actorComponent.species,Species.getAllCodes());
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
