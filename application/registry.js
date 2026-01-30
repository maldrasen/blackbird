global.Registry = (function() {

  const registry = {};

  // Called after each spec to empty the registry. Should also be called if a game is unloaded.
  function clear() {
    registry[ComponentType.actor] = {};        // ['firstName','lastName','genderCode','speciesCode']
    registry[ComponentType.controlled] = {};   // ['control'])// affection fear respect loyalty?
    registry[ComponentType.atLocation] = {};   // ['locationCode'])
    registry[ComponentType.attributes] = {};   // ['strength','dexterity'])
    registry[ComponentType.mana] = {};         // ['red_mana','yellow_mana','green_mana','blue_mana','black_mana'])
    registry[ComponentType.health] = {};       // ['health','stamina','mana'])
    registry[ComponentType.skill] = {};        // ['skillCode','experience','value'])
  }

  // Right now this function only returns an id. I'm not sure if we actually need to store this ID anywhere until
  // something uses it to create a component. There should never be entities without components.
  function createEntity() {
    return crypto.randomUUID();
  }

  function findEntitiesWithComponents(typeList) {
    console.log("Find Entities With:",typeList)

    let ids = new Set(Object.keys(registry[typeList[0]]));

    for (let i=1; i<typeList.length; i++) {
      ids = ids.intersection(   new Set(Object.keys(registry[typeList[i]]))   );
    }

    return ids;
  }

  // Deleting an entity will also delete child entities. Some entities (things like skills) can't exist without their
  // parent entity, so they should be deleted.
  function deleteEntity(id) {
    Object.keys(registry).forEach(type => {
      if (registry[type][id]) {

        const data = registry[type][id];
        if (data[_parentId]) {
          deleteEntity(data[_parentId])
        }

        registry[type][id] = null;
      }
    });
  }

  function createComponent(id, type, data) {
    if (registry[type][id] != null) { throw `Entity[${id}] already has ${type}`}
    registry[type][id] = data;
  }

  function createActorComponent(id,data)           { Registry.createComponent(id,ComponentType.actor,data); }
  function createControlledComponent(id,data)      { Registry.createComponent(id,ComponentType.controlled,data); }
  function createAtLocationComponent(id,data)      { Registry.createComponent(id,ComponentType.atLocation,data); }
  function createAttributesComponent(id,data)      { Registry.createComponent(id,ComponentType.attributes,data); }
  function createManaComponent(id,data)            { Registry.createComponent(id,ComponentType.mana,data); }
  function createHealthComponent(id,data)          { Registry.createComponent(id,ComponentType.health,data); }
  function createSkillComponent(parentId,id,data)  { Registry.createComponent(id,ComponentType.health, { _parentId:parentId, ...data }); }

  function lookupComponent(id, type) {
    return registry[type][id];
  }

  function lookupActorComponent(id)      { return Registry.lookupComponent(id,ComponentType.actor); }
  function lookupControlledComponent(id) { return Registry.lookupComponent(id,ComponentType.controlled); }
  function lookupAtLocationComponent(id) { return Registry.lookupComponent(id,ComponentType.atLocation); }
  function lookupAttributesComponent(id) { return Registry.lookupComponent(id,ComponentType.attributes); }
  function lookupManaComponent(id)       { return Registry.lookupComponent(id,ComponentType.mana); }
  function lookupHealthComponent(id)     { return Registry.lookupComponent(id,ComponentType.health); }
  function lookupSkillComponent(id)      { return Registry.lookupComponent(id,ComponentType.skill); }

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
  function updateSkillComponent(id,data)      { updateComponent(id,ComponentType.skill,data) }


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
  function deleteSkillComponent(id)      { Registry.deleteComponent(id,ComponentType.skill); }

  return Object.freeze({
    clear,

    createEntity,
    deleteEntity,

    findEntitiesWithComponents,

    createComponent,
    createActorComponent,
    createControlledComponent,
    createAtLocationComponent,
    createAttributesComponent,
    createManaComponent,
    createHealthComponent,
    createSkillComponent,

    lookupComponent,
    lookupActorComponent,
    lookupControlledComponent,
    lookupAtLocationComponent,
    lookupAttributesComponent,
    lookupManaComponent,
    lookupHealthComponent,
    lookupSkillComponent,

    updateComponent,
    updateActorComponent,
    updateControlledComponent,
    updateAtLocationComponent,
    updateAttributesComponent,
    updateManaComponent,
    updateHealthComponent,
    updateSkillComponent,

    deleteComponent,
    deleteActorComponent,
    deleteControlledComponent,
    deleteAtLocationComponent,
    deleteAttributesComponent,
    deleteManaComponent,
    deleteHealthComponent,
    deleteSkillComponent,
  });

})();

Registry.clear();
