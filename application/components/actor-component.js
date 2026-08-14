global.ActorComponent = (function() {
  const properties = ['title','name','surname','gender','species'];

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
      if (properties.includes(key) === false) {
        throw new Error(`Actor component does not have a ${key} property.`);
      }
    });

    // A character has a species and will be one of the four standard genders, not none. A beast will have an actor
    // component because the weaver templates will reference name and a gender, but beasts won't have a species.
    if (actorComponent.species) {
      Validate.isIn('Actor.gender',actorComponent.gender,['male','female','futa','enby']);
      Validate.isIn('Actor.species',actorComponent.species,Species.getAllCodes());
    }
  }

  return {
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  };

})();
