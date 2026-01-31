global.CharacterBuilder = (function() {

  function build(options) {
    const characterId = Registry.createEntity();

    const gender = options.gender || Gender.female
    const species = options.species || 'elf';

    const actorComponent = { gender, species };
    const controlledComponent = { control:50 };
    const healthComponent = { currentStamina:1000, maxStamina:1000 }

    if (options.firstName == null) {
      const names = NameBuilder.getRandom({ gender, category:'Elf' });

      // TODO: Handle the triggers requirements and adjustments that some names come with.
      console.log("Random Name:");
      console.log("  -",names.first);
      console.log("  -",names.last);

      actorComponent.firstName = names.first.name;
      actorComponent.lastName = names.last.name;
    }

    Registry.createActorComponent(characterId, actorComponent);
    Registry.createControlledComponent(characterId, controlledComponent);
    Registry.createHealthComponent(characterId, healthComponent);

    CharacterValidator.validate(characterId);

    return characterId;
  }

  return {
    build
  }

})();
