global.ActorComponent = (function() {
  const $properties = ['title','name','surname','gender','species'];

  function getProperties() { return $properties; }

  function validate(id) {
    const actorComponent = Registry.lookupActorComponent(id)

    Object.keys(actorComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Actor component does not have a ${key} property.`
      }
    });

    Validate.isIn('gender',actorComponent.gender,Object.values(Gender));
    Validate.isIn('species',actorComponent.species,Species.getAllCodes());
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
