global.Registry = (function() {

  const registry = {};
  registry[ComponentType.actor] = {};        // ['firstName','lastName','genderCode','speciesCode']
  registry[ComponentType.controlled] = {};   // ['control'])// affection fear respect loyalty?
  registry[ComponentType.atLocation] = {};   // ['locationCode'])
  registry[ComponentType.attributes] = {};   // ['strength','dexterity'])
  registry[ComponentType.mana] = {};         // ['red_mana','yellow_mana','green_mana','blue_mana','black_mana'])
  registry[ComponentType.health] = {};       // ['health','stamina','mana'])

  // Right now this function only returns an id. I'm not sure if we actually need to store this ID anywhere until
  // something uses it to create a component. There should never be entities without components.
  function createEntity() {
    return crypto.randomUUID();
  }

  function deleteEntity(id) {
    Object.keys(registry).forEach(type => {
      if (registry[type][id]) {
        registry[type][id] = null;
      }
    });
  }

  // Create a component with the data.
  function createComponent(id, type, data) {
    if (registry[type][id] != null) { throw `Entity[${id}] already has ${type}`}
    registry[type][id] = data;
  }

  function createActorComponent(id,data)      { Registry.createComponent(id,ComponentType.actor,data); }
  function createControlledComponent(id,data) { Registry.createComponent(id,ComponentType.controlled,data); }
  function createAtLocationComponent(id,data) { Registry.createComponent(id,ComponentType.atLocation,data); }
  function createAttributesComponent(id,data) { Registry.createComponent(id,ComponentType.attributes,data); }
  function createManaComponent(id,data)       { Registry.createComponent(id,ComponentType.mana,data); }
  function createHealthComponent(id,data)     { Registry.createComponent(id,ComponentType.health,data); }

  function lookupComponent(id, type) {
    return registry[type][id];
  }

  function lookupActorComponent(id)      { return Registry.lookupComponent(id,ComponentType.actor); }
  function lookupControlledComponent(id) { return Registry.lookupComponent(id,ComponentType.controlled); }
  function lookupAtLocationComponent(id) { return Registry.lookupComponent(id,ComponentType.atLocation); }
  function lookupAttributesComponent(id) { return Registry.lookupComponent(id,ComponentType.attributes); }
  function lookupManaComponent(id)       { return Registry.lookupComponent(id,ComponentType.mana); }
  function lookupHealthComponent(id)     { return Registry.lookupComponent(id,ComponentType.health); }

  function updateComponent(id,type,data) {
    if (registry[type][id] == null) { throw `Entity[${id}] does not have ${type}`}
    Object.keys(data).forEach(key => {
      registry[type][id][key] = data[key]
    });
  }

  function updateActorComponent(id,data)      { updateComponent(id,ComponentType.actor,data) }
  function updateControlledComponent(id,data) { updateComponent(id,ComponentType.controlled,data) }
  function updateAtLocationComponent(id,data) { updateComponent(id,ComponentType.atLocation,data) }
  function updateAttributesComponent(id,data) { updateComponent(id,ComponentType.attributes,data) }
  function updateManaComponent(id,data)       { updateComponent(id,ComponentType.mana,data) }
  function updateHealthComponent(id,data)     { updateComponent(id,ComponentType.health,data) }

  function deleteComponent(id,type) {
    if (registry[type][id] == null) { throw `Entity[${id}] does not have ${type}`}
    registry[type][id] = null;
  }

  function deleteActorComponent(id)      { Registry.deleteComponent(id,ComponentType.actor); }
  function deleteControlledComponent(id) { Registry.deleteComponent(id,ComponentType.controlled); }
  function deleteAtLocationComponent(id) { Registry.deleteComponent(id,ComponentType.atLocation); }
  function deleteAttributesComponent(id) { Registry.deleteComponent(id,ComponentType.attributes); }
  function deleteManaComponent(id)       { Registry.deleteComponent(id,ComponentType.mana); }
  function deleteHealthComponent(id)     { Registry.deleteComponent(id,ComponentType.health); }

  return Object.freeze({
    createEntity,
    deleteEntity,

    createComponent,
    createActorComponent,
    createControlledComponent,
    createAtLocationComponent,
    createAttributesComponent,
    createManaComponent,
    createHealthComponent,

    lookupComponent,
    lookupActorComponent,
    lookupControlledComponent,
    lookupAtLocationComponent,
    lookupAttributesComponent,
    lookupManaComponent,
    lookupHealthComponent,

    updateComponent,
    updateActorComponent,
    updateControlledComponent,
    updateAtLocationComponent,
    updateAttributesComponent,
    updateManaComponent,
    updateHealthComponent,

    deleteComponent,
    deleteActorComponent,
    deleteControlledComponent,
    deleteAtLocationComponent,
    deleteAttributesComponent,
    deleteManaComponent,
    deleteHealthComponent,
  });

})();
