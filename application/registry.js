global.Registry = (function() {

  const entities = {}; // { entityId : {ComponentType} }
  const components = {}; // { ComponentType : { entityId: { entityData } } }

  const typesWithChildren = [
    ComponentType.skill,
  ];

  // Called after each spec to empty the registry. Should also be called if a game is unloaded.
  function clear() {
    Object.keys(entities).forEach(key => delete entities[key]);
    Object.values(ComponentType).forEach(type => components[type] = {});
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
    Object.keys(components).forEach(type => {
      if (components[type][id]) {
        delete components[type][id];
      }
    });

    findChildEntities(id).forEach(childId => deleteEntity(childId));

    delete entities[id];
  }

  function listEntityComponents(id) {
    return entities[id];
  }

  /// === CRUD =========================================================================================================

  function createComponent(id, type, data) {
    if (components[type][id] != null) { throw `Entity[${id}] already has ${type}`}
    if (Object.values(ComponentType).includes(type) === false) { throw `${type} is not a valid component type.` }

    entities[id].add(type);
    components[type][id] = data;
  }

  function createActorComponent(id,data) {
    Registry.createComponent(id,ComponentType.actor,data);
    Actor.validate(id);
  }

  function createControlledComponent(id,data) {
    Registry.createComponent(id,ComponentType.controlled,data);
    Controlled.validate(id);
  }

  function createSituatedComponent(id,data) {
    Registry.createComponent(id,ComponentType.situated,data);
    Situated.validate(id);
  }

  function createAttributesComponent(id,data) {
    Registry.createComponent(id,ComponentType.attributes,data);
    Attributes.validate(id);
  }

  function createManaComponent(id,data) {
    Registry.createComponent(id,ComponentType.mana,data);
    Mana.validate(id);
  }

  function createHealthComponent(id,data) {
    Registry.createComponent(id,ComponentType.health,data);
    Health.validate(id);
  }

  function createSkillComponent(parentId,id,data) {
    Registry.createComponent(id,ComponentType.skill, { _parentId:parentId, ...data });
    Skill.validate(id);
  }

  function lookupComponent(id, type)     { return components[type][id]; }
  function lookupActorComponent(id)      { return Registry.lookupComponent(id,ComponentType.actor); }
  function lookupControlledComponent(id) { return Registry.lookupComponent(id,ComponentType.controlled); }
  function lookupSituatedComponent(id)   { return Registry.lookupComponent(id,ComponentType.situated); }
  function lookupAttributesComponent(id) { return Registry.lookupComponent(id,ComponentType.attributes); }
  function lookupManaComponent(id)       { return Registry.lookupComponent(id,ComponentType.mana); }
  function lookupHealthComponent(id)     { return Registry.lookupComponent(id,ComponentType.health); }
  function lookupSkillComponent(id)      { return Registry.lookupComponent(id,ComponentType.skill); }

  function updateComponent(id,type,data) {
    if (components[type][id] == null) { throw `Entity[${id}] does not have ${type}`}
    Object.keys(data).forEach(key => {
      components[type][id][key] = data[key]
    });
  }

  function updateActorComponent(id,data) {
    updateComponent(id,ComponentType.actor,data);
    Actor.validate(id);
  }

  function updateControlledComponent(id,data) {
    updateComponent(id,ComponentType.controlled,data);
    Controlled.validate(id);
  }

  function updateSituatedComponent(id,data) {
    updateComponent(id,ComponentType.situated,data);
    Situated.validate(id);
  }

  function updateAttributesComponent(id,data) {
    updateComponent(id,ComponentType.attributes,data);
    Attributes.validate(id);
  }

  function updateManaComponent(id,data) {
    updateComponent(id,ComponentType.mana,data);
    Mana.validate(id);
  }

  function updateHealthComponent(id,data) {
    updateComponent(id,ComponentType.health,data);
    Health.validate(id);
  }

  function updateSkillComponent(id,data) {
    updateComponent(id,ComponentType.skill,data);
    Skill.validate(id);
  }

  function deleteComponent(id,type) {
    if (components[type][id] == null) { throw `Entity[${id}] does not have ${type}`}

    entities[id].delete(type)
    delete components[type][id];
  }

  function deleteActorComponent(id)      { Registry.deleteComponent(id,ComponentType.actor); }
  function deleteControlledComponent(id) { Registry.deleteComponent(id,ComponentType.controlled); }
  function deleteSituatedComponent(id)   { Registry.deleteComponent(id,ComponentType.situated); }
  function deleteAttributesComponent(id) { Registry.deleteComponent(id,ComponentType.attributes); }
  function deleteManaComponent(id)       { Registry.deleteComponent(id,ComponentType.mana); }
  function deleteHealthComponent(id)     { Registry.deleteComponent(id,ComponentType.health); }
  function deleteSkillComponent(id)      { Registry.deleteComponent(id,ComponentType.skill); }

  // === Inspect =======================================================================================================

  function compileEntityData(id) {
    const data = {};

    listEntityComponents(id).forEach(type => {
      data[type] = components[type][id];
    });

    // Recursively add child data.
    let children = findChildEntities(id);
    if (children) {
      data.children = children.map(childID => compileEntityData(childID));
    }

    return data;
  }

  // === Queries =======================================================================================================

  function findChildEntities(id) {
    const children = new Set();

    typesWithChildren.forEach(type => {
      Object.keys(components[type]).forEach(childId => {
        if (components[type][childId]._parentId === id) {
          children.add(childId);
        }
      });
    })

    return [...children];
  }

  function findEntitiesWithComponents(typeList) {
    const results = [];

    Object.keys(entities).forEach(id => {
      if (typeList.every(type => entities[id].has(type))) {
        results.push(id);
      }
    });

    return results;
  }

  function findComponentsWith(type,filter) {
    const results = [];

    Object.keys(components[type]).forEach(id => {
      if (filter(components[type][id])) {
        results.push(id);
      }
    });

    return results;
  }

  return Object.freeze({
    clear,

    createEntity,
    deleteEntity,
    listEntityComponents,

    createComponent,
    createActorComponent,
    createControlledComponent,
    createSituatedComponent,
    createAttributesComponent,
    createManaComponent,
    createHealthComponent,
    createSkillComponent,

    lookupComponent,
    lookupActorComponent,
    lookupControlledComponent,
    lookupSituatedComponent,
    lookupAttributesComponent,
    lookupManaComponent,
    lookupHealthComponent,
    lookupSkillComponent,

    updateComponent,
    updateActorComponent,
    updateControlledComponent,
    updateSituatedComponent,
    updateAttributesComponent,
    updateManaComponent,
    updateHealthComponent,
    updateSkillComponent,

    deleteComponent,
    deleteActorComponent,
    deleteControlledComponent,
    deleteSituatedComponent,
    deleteAttributesComponent,
    deleteManaComponent,
    deleteHealthComponent,
    deleteSkillComponent,

    compileEntityData,

    findChildEntities,
    findEntitiesWithComponents,
    findComponentsWith,
  });

})();

Registry.clear();
