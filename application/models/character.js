global.Character = function(id) {
  const $id = id;

  function actorComponent() { return Registry.lookupActorComponent($id); }
  function getFirstName() { return actorComponent().firstName; }
  function getLastName() { return actorComponent().lastName; }
  function getGender() { return actorComponent().gender; }
  function getSpecies() { return actorComponent().species; }

  function controlledComponent() { return Registry.lookupControlledComponent($id); }
  function getControlValue() { return controlledComponent().control; }

  function healthComponent() { return Registry.lookupHealthComponent($id); }
  function getCurrentStamina() { return healthComponent().currentStamina; }
  function getMaxStamina() { return healthComponent().maxStamina; }

  function atLocationComponent() { return Registry.lookupAtLocationComponent($id); }
  function getAtLocation() { return atLocationComponent().location; }

  function toString() {
    return `Character[${$id}|${getFirstName()} ${getLastName()}]`;
  }

  const $self = {
    id: $id,
    getFirstName,
    getLastName,
    getGender,
    getSpecies,
    getControlValue,
    getCurrentStamina,
    getMaxStamina,
    getAtLocation,
    toString,
  };

  return Object.freeze($self);
}
