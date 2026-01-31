global.Character = function(id) {
  const $id = id;

  function actorComponent() { return Registry.lookupActorComponent($id) }
  function controlledComponent() { return Registry.lookupControlledComponent($id) }
  function healthComponent() { return Registry.lookupHealthComponent($id) }

  function getFirstName() { return actorComponent().firstName; }
  function getLastName() { return actorComponent().lastName; }
  function getControlValue() { return controlledComponent().control; }

  function getCurrentStamina() { return healthComponent().currentStamina; }
  function getMaxStamina() { return healthComponent().maxStamina; }

  function toString() {
    return `Character[${$id}|${getFirstName()} ${getLastName()}]`;
  }

  const $self = {
    id: $id,
    getFirstName,
    getLastName,
    getControlValue,
    getCurrentStamina,
    getMaxStamina,
    toString,
  };

  return Object.freeze($self);
}
