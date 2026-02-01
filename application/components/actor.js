global.Actor = (function() {
  const $properties = ['firstName','lastName','gender','species'];

  function properties() { return $properties; }

  function validate(id) {
    const actorComponent = Registry.lookupActorComponent(id)

    Object.keys(actorComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Actor component does not have a ${key} property.`
      }
    });

    Validate.exists('firstName',actorComponent.firstName);
    Validate.exists('lastName',actorComponent.lastName);
    Validate.isIn('gender',actorComponent.gender,Object.values(Gender));
    Validate.isIn('species',actorComponent.species,['elf','nymph']); // TODO: Fetch a list of species
  }

  return Object.freeze({
    properties,
    validate,
  });

})();
