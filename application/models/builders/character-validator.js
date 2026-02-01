global.CharacterValidator = (function() {

  function validate(id) {
    const actorComponent = Registry.lookupActorComponent(id);
    const controlComponent = Registry.lookupControlledComponent(id);
    const healthComponent = Registry.lookupHealthComponent(id);
    const situatedComponent = Registry.lookupSituatedComponent(id);

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

    // A character might not technically be anywhere, so being at a location is optional. If the component exists
    // though they should actually be somewhere.
    if (situatedComponent) {
      Validate.exists('currentLocation',situatedComponent.currentLocation);
    }
  }

  return {
    validate
  };

})();