global.Registry = (function() {

  const entities = {}; // { entityId : {ComponentType} }
  const registry = {}; // { ComponentType : { entityId: { entityData } } }

  const typesWithChildren = [
    ComponentType.skill,
  ];

  // Called after each spec to empty the registry. Should also be called if a game is unloaded.
  function clear() {
    Object.keys(entities).forEach(key => delete entities[key]);
    Object.values(ComponentType).forEach(type => registry[type] = {});
  }

  // Because we serialize out to JSON, and because I want to reference an entity by id in the console, the entity ids
  // are fairly short. Collisions are possible, so if a collision happens we just try again.
  function createEntity() {
    let id = Random.identifier();
    if (entities[id] != null) {
      console.warn(`Entity ID Collision: ${id}`)
      return createEntity();
    }

    entities[id] = new Set();

    return id;
  }

  // Deleting an entity will also delete child entities. Some entities (things like skills) can't exist without their
  // parent entity, so they should be deleted.
  function deleteEntity(id) {
    Object.keys(registry).forEach(type => {
      if (registry[type][id]) {
        delete registry[type][id];
      }
    });

    findChildEntities(id).forEach(childId => deleteEntity(childId));

    delete entities[id];
  }

  function listEntityComponents(id) {
    return entities[id];
  }

  /// === CRUD ===

  function createComponent(id, type, data) {
    if (registry[type][id] != null) { throw `Entity[${id}] already has ${type}`}

    entities[id].add(type);
    registry[type][id] = data;
  }

  function createActorComponent(id,data)           { Registry.createComponent(id,ComponentType.actor,data); }
  function createControlledComponent(id,data)      { Registry.createComponent(id,ComponentType.controlled,data); }
  function createAtLocationComponent(id,data)      { Registry.createComponent(id,ComponentType.atLocation,data); }
  function createAttributesComponent(id,data)      { Registry.createComponent(id,ComponentType.attributes,data); }
  function createManaComponent(id,data)            { Registry.createComponent(id,ComponentType.mana,data); }
  function createHealthComponent(id,data)          { Registry.createComponent(id,ComponentType.health,data); }
  function createSkillComponent(parentId,id,data)  { Registry.createComponent(id,ComponentType.skill, { _parentId:parentId, ...data }); }

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

    entities[id].delete(type)
    delete registry[type][id];
  }

  function deleteActorComponent(id)      { Registry.deleteComponent(id,ComponentType.actor); }
  function deleteControlledComponent(id) { Registry.deleteComponent(id,ComponentType.controlled); }
  function deleteAtLocationComponent(id) { Registry.deleteComponent(id,ComponentType.atLocation); }
  function deleteAttributesComponent(id) { Registry.deleteComponent(id,ComponentType.attributes); }
  function deleteManaComponent(id)       { Registry.deleteComponent(id,ComponentType.mana); }
  function deleteHealthComponent(id)     { Registry.deleteComponent(id,ComponentType.health); }
  function deleteSkillComponent(id)      { Registry.deleteComponent(id,ComponentType.skill); }

  // === Inspect ===

  function compileEntityData(id) {
    const data = {};

    listEntityComponents(id).forEach(type => {
      data[type] = registry[type][id];
    });

    // Recursively add child data.
    let children = findChildEntities(id);
    if (children) {
      data.children = children.map(childID => compileEntityData(childID));
    }

    return data;
  }

  // === Queries ===

  function findChildEntities(id) {
    const children = new Set();

    typesWithChildren.forEach(type => {
      Object.keys(registry[type]).forEach(childId => {
        if (registry[type][childId]._parentId === id) {
          children.add(childId);
        }
      });
    })

    return [...children];
  }

  function findEntitiesWithComponents(typeList) {
    const result = [];

    Object.keys(entities).forEach(id => {
      if (typeList.every(type => entities[id].has(type))) {
        result.push(id);
      }
    });

    return result;
  }

  // TODO
  function findComponentWith(type,filter) {

  }



  return Object.freeze({
    clear,

    createEntity,
    deleteEntity,
    listEntityComponents,

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

    compileEntityData,

    findChildEntities,
    findEntitiesWithComponents,
  });

})();

Registry.clear();
