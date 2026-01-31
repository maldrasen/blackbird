global.CharacterValidator = (function() {

  function validate(id) {
    const actorComponent = Registry.lookupActorComponent(id);
    const controlComponent = Registry.lookupControlledComponent(id);
    const healthComponent = Registry.lookupHealthComponent(id);

    console.log("Control Component:",controlComponent)

    Validate.exists('firstName',actorComponent.firstName);
    Validate.exists('lastName',actorComponent.lastName);
    Validate.isIn('gender',actorComponent.gender,Object.values(Gender));
    //TODO: Fetch a list of species
    Validate.isIn('species',actorComponent.species,['elf']);

    Validate.between('currentStamina',healthComponent.currentStamina,0,1500);
    Validate.between('maxStamina',healthComponent.currentStamina,500,1500);

    if (controlComponent) {
      Validate.between('control',controlComponent.control,-500,500)
    }


  }

  return {
    validate
  };

})();