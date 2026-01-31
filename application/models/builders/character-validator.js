global.CharacterValidator = (function() {

  function validate(id) {
    const actorComponent = Registry.lookupActorComponent(id);
    const controlComponent = Registry.lookupControlledComponent(id);
    const healthComponent = Registry.lookupHealthComponent(id);
    const atLocationComponent = Registry.lookupAtLocationComponent(id);

    // At the very least every character will have a name, a gender, and a species.
    Validate.exists('firstName',actorComponent.firstName);
    Validate.exists('lastName',actorComponent.lastName);
    Validate.isIn('gender',actorComponent.gender,Object.values(Gender));
    Validate.isIn('species',actorComponent.species,['elf']); // TODO: Fetch a list of species

    // Pretty sure every character will have health, though I could see it never being used for most NPCs.
    Validate.between('currentStamina',healthComponent.currentStamina,0,1500);
    Validate.between('maxStamina',healthComponent.currentStamina,500,1500);

    // Only trainable characters have a control component.
    if (controlComponent) {
      Validate.between('control',controlComponent.control,-500,500)
    }

    // A character might not technically be anywhere, so being at a location is optional.
    if (atLocationComponent) {
      Validate.exists('location',atLocationComponent.location);
    }
  }

  return {
    validate
  };

})();