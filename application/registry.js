global.Registry = (function() {

  const entities = {}; // { entityId : {ComponentType} }
  const components = {}; // { ComponentType : { entityId: { entityData } } }
  const typesWithChildren = [];

  // === Entity CRUD ===================================================================================================

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

  // Deleting an entity will also delete child entities. Some entities (things like body parts) can't exist without
  // their parent entity, so they should be deleted.
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

  /// === Component CRUD ===============================================================================================

  function createComponent(id, type, data) {
    if (components[type][id] != null) { throw `Entity[${id}] already has ${type}`}

    entities[id].add(type);
    components[type][id] = data;
  }

  function lookupComponent(id, type) {
    return components[type][id];
  }

  function updateComponent(id,type,data) {
    if (components[type][id] == null) { throw `Entity[${id}] does not have ${type}`}
    Object.keys(data).forEach(key => {
      components[type][id][key] = data[key]
    });
  }

  function deleteComponent(id,type) {
    if (components[type][id] == null) { throw `Entity[${id}] does not have ${type}`}

    entities[id].delete(type)
    delete components[type][id];
  }

  // === Lots of Shortcuts =============================================================================================

  function createActorComponent(id,data) {
    Registry.createComponent(id,ComponentType.actor,data);
    Actor.validate(id);
  }
  function createAnusComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.anus, { _parentId:id, ...data});
    Anus.validate(entity);
    return entity;
  }
  function createArousalComponent(id,data) {
    Registry.createComponent(id,ComponentType.arousal,data);
    Arousal.validate(id);
  }
  function createAspectComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.aspect, { _parentId:id, ...data});
    Aspect.validate(entity);
    return entity;
  }
  function createAttributesComponent(id,data) {
    Registry.createComponent(id,ComponentType.attributes,data);
    Attributes.validate(id);
  }
  function createBodyComponent(id,data) {
    Registry.createComponent(id,ComponentType.body,data);
    Body.validate(id);
  }
  function createBreastsComponent(id,data) {
    Registry.createComponent(id,ComponentType.breasts,data);
    Breasts.validate(id);
  }
  function createCockComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.cock, { _parentId:id, ...data});
    Cock.validate(entity);
    return entity;
  }
  function createControlledComponent(id,data) {
    Registry.createComponent(id,ComponentType.controlled,data);
    Controlled.validate(id);
  }
  function createFeelingsComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.feelings, { _parentId:id, ...data});
    Feelings.validate(entity);
    return entity;
  }
  function createHealthComponent(id,data) {
    Registry.createComponent(id,ComponentType.health,data);
    Health.validate(id);
  }
  function createManaComponent(id,data) {
    Registry.createComponent(id,ComponentType.mana,data);
    Mana.validate(id);
  }
  function createMarkComponent(id,data) {
    Registry.createComponent(id,ComponentType.mark,data);
    Mark.validate(id);
  }
  function createMemoryComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.memory, { _parentId:id, ...data});
    Memory.validate(entity);
    return entity;
  }
  function createMouthComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.mouth, { _parentId:id, ...data});
    Mouth.validate(entity);
    return entity;
  }
  function createPersonalityComponent(id,data) {
    Registry.createComponent(id,ComponentType.personality,data);
    Personality.validate(id);
  }
  function createPussyComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.pussy, { _parentId:id, ...data});
    Pussy.validate(entity);
    return entity;
  }
  function createScalesComponent(id,data) {
    Registry.createComponent(id, ComponentType.scales,data);
    Scales.validate(id);
  }
  function createSexualPreferenceComponent(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.sexualPreference, { _parentId:id, ...data});
    SexualPreference.validate(entity);
    return entity;
  }
  function createSituatedComponent(id,data) {
    Registry.createComponent(id,ComponentType.situated,data);
    Situated.validate(id);
  }
  function createSkillsComponent(id,data) {
    Registry.createComponent(id, ComponentType.skills, data);
    Skills.validate(id);
  }

  function lookupActorComponent(id)            { return Registry.lookupComponent(id,ComponentType.actor); }
  function lookupAnusComponent(id)             { return Registry.lookupComponent(id,ComponentType.anus); }
  function lookupArousalComponent(id)          { return Registry.lookupComponent(id,ComponentType.arousal); }
  function lookupAspectComponent(id)           { return Registry.lookupComponent(id,ComponentType.aspect); }
  function lookupAttributesComponent(id)       { return Registry.lookupComponent(id,ComponentType.attributes); }
  function lookupBodyComponent(id)             { return Registry.lookupComponent(id,ComponentType.body); }
  function lookupBreastsComponent(id)          { return Registry.lookupComponent(id,ComponentType.breasts); }
  function lookupCockComponent(id)             { return Registry.lookupComponent(id,ComponentType.cock); }
  function lookupControlledComponent(id)       { return Registry.lookupComponent(id,ComponentType.controlled); }
  function lookupFeelingsComponent(id)         { return Registry.lookupComponent(id,ComponentType.feelings); }
  function lookupHealthComponent(id)           { return Registry.lookupComponent(id,ComponentType.health); }
  function lookupManaComponent(id)             { return Registry.lookupComponent(id,ComponentType.mana); }
  function lookupMarkComponent(id)             { return Registry.lookupComponent(id,ComponentType.mark); }
  function lookupMemoryComponent(id)           { return Registry.lookupComponent(id,ComponentType.memory); }
  function lookupMouthComponent(id)            { return Registry.lookupComponent(id,ComponentType.mouth); }
  function lookupPersonalityComponent(id)      { return Registry.lookupComponent(id,ComponentType.personality); }
  function lookupPussyComponent(id)            { return Registry.lookupComponent(id,ComponentType.pussy); }
  function lookupScalesComponent(id)           { return Registry.lookupComponent(id,ComponentType.scales); }
  function lookupSexualPreferenceComponent(id) { return Registry.lookupComponent(id,ComponentType.sexualPreference); }
  function lookupSituatedComponent(id)         { return Registry.lookupComponent(id,ComponentType.situated); }
  function lookupSkillsComponent(id)            { return Registry.lookupComponent(id,ComponentType.skills); }

  function updateActorComponent(id,data) {
    updateComponent(id,ComponentType.actor,data);
    Actor.validate(id);
  }
  function updateAnusComponent(id,data) {
    updateComponent(id,ComponentType.anus,data);
    Anus.validate(id);
  }
  function updateArousalComponent(id,data) {
    updateComponent(id,ComponentType.arousal,data);
    Arousal.validate(id);
  }
  function updateAspectComponent(id,data) {
    updateComponent(id,ComponentType.aspect,data);
    Aspect.validate(id);
  }
  function updateAttributesComponent(id,data) {
    updateComponent(id,ComponentType.attributes,data);
    Attributes.validate(id);
  }
  function updateBodyComponent(id,data) {
    updateComponent(id,ComponentType.body,data);
    Body.validate(id);
  }
  function updateBreastsComponent(id,data) {
    updateComponent(id,ComponentType.breasts,data);
    Breasts.validate(id);
  }
  function updateCockComponent(id,data) {
    updateComponent(id,ComponentType.cock,data);
    Cock.validate(id);
  }
  function updateControlledComponent(id,data) {
    updateComponent(id,ComponentType.controlled,data);
    Controlled.validate(id);
  }
  function updateFeelingsComponent(id,data) {
    updateComponent(id,ComponentType.feelings,data);
    Feelings.validate(id);
  }
  function updateHealthComponent(id,data) {
    updateComponent(id,ComponentType.health,data);
    Health.validate(id);
  }
  function updateManaComponent(id,data) {
    updateComponent(id,ComponentType.mana,data);
    Mana.validate(id);
  }
  function updateMarkComponent(id,data) {
    updateComponent(id,ComponentType.mark,data);
    Mark.validate(id);
  }
  function updateMemoryComponent(id,data) {
    updateComponent(id,ComponentType.memory,data);
    Memory.validate(id);
  }
  function updateMouthComponent(id,data) {
    updateComponent(id,ComponentType.mouth,data);
    Mouth.validate(id);
  }
  function updatePersonalityComponent(id,data) {
    updateComponent(id,ComponentType.memory,data);
    Memory.validate(id);
  }
  function updatePussyComponent(id,data) {
    updateComponent(id,ComponentType.pussy,data);
    Pussy.validate(id);
  }
  function updateScalesComponent(id,data) {
    updateComponent(id,ComponentType.scales,data);
    Scales.validate(id);
  }
  function updateSexualPreferenceComponent(id,data) {
    updateComponent(id,ComponentType.memory,data);
    Memory.validate(id);
  }
  function updateSituatedComponent(id,data) {
    updateComponent(id,ComponentType.situated,data);
    Situated.validate(id);
  }
  function updateSkillsComponent(id,data) {
    updateComponent(id,ComponentType.skills,data);
    Skills.validate(id);
  }

  function deleteActorComponent(id)            { Registry.deleteComponent(id,ComponentType.actor); }
  function deleteAnusComponent(id)             { Registry.deleteComponent(id,ComponentType.anus); }
  function deleteArousalComponent(id)          { Registry.deleteComponent(id,ComponentType.arousal); }
  function deleteAspectComponent(id)           { Registry.deleteComponent(id,ComponentType.aspect); }
  function deleteAttributesComponent(id)       { Registry.deleteComponent(id,ComponentType.attributes); }
  function deleteBodyComponent(id)             { Registry.deleteComponent(id,ComponentType.body); }
  function deleteBreastsComponent(id)          { Registry.deleteComponent(id,ComponentType.breasts); }
  function deleteCockComponent(id)             { Registry.deleteComponent(id,ComponentType.cock); }
  function deleteControlledComponent(id)       { Registry.deleteComponent(id,ComponentType.controlled); }
  function deleteFeelingsComponent(id)         { Registry.deleteComponent(id,ComponentType.feelings); }
  function deleteHealthComponent(id)           { Registry.deleteComponent(id,ComponentType.health); }
  function deleteManaComponent(id)             { Registry.deleteComponent(id,ComponentType.mana); }
  function deleteMarkComponent(id)             { Registry.deleteComponent(id,ComponentType.mark); }
  function deleteMemoryComponent(id)           { Registry.deleteComponent(id,ComponentType.memory); }
  function deleteMouthComponent(id)            { Registry.deleteComponent(id,ComponentType.mouth); }
  function deletePersonalityComponent(id)      { Registry.deleteComponent(id,ComponentType.personality); }
  function deletePussyComponent(id)            { Registry.deleteComponent(id,ComponentType.pussy); }
  function deleteScalesComponent(id)            { Registry.deleteComponent(id,ComponentType.scales); }
  function deleteSexualPreferenceComponent(id) { Registry.deleteComponent(id,ComponentType.sexualPreference); }
  function deleteSituatedComponent(id)         { Registry.deleteComponent(id,ComponentType.situated); }
  function deleteSkillsComponent(id)            { Registry.deleteComponent(id,ComponentType.skills); }

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

    if (typesWithChildren.length === 0) {
      Object.keys(ComponentType).forEach(code => {
        if (global[ComponentType[code]].getProperties().includes(_parentId)) {
          typesWithChildren.push(ComponentType[code])
        }
      });
    }

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
    createAnusComponent,
    createArousalComponent,
    createAspectComponent,
    createAttributesComponent,
    createBodyComponent,
    createBreastsComponent,
    createCockComponent,
    createControlledComponent,
    createFeelingsComponent,
    createHealthComponent,
    createManaComponent,
    createMarkComponent,
    createMemoryComponent,
    createMouthComponent,
    createPersonalityComponent,
    createPussyComponent,
    createScalesComponent,
    createSexualPreferenceComponent,
    createSituatedComponent,
    createSkillsComponent,

    lookupComponent,
    lookupActorComponent,
    lookupAnusComponent,
    lookupArousalComponent,
    lookupAspectComponent,
    lookupAttributesComponent,
    lookupBodyComponent,
    lookupBreastsComponent,
    lookupCockComponent,
    lookupControlledComponent,
    lookupFeelingsComponent,
    lookupHealthComponent,
    lookupManaComponent,
    lookupMarkComponent,
    lookupMemoryComponent,
    lookupMouthComponent,
    lookupPersonalityComponent,
    lookupPussyComponent,
    lookupScalesComponent,
    lookupSexualPreferenceComponent,
    lookupSituatedComponent,
    lookupSkillsComponent,

    updateComponent,
    updateActorComponent,
    updateAnusComponent,
    updateArousalComponent,
    updateAspectComponent,
    updateAttributesComponent,
    updateBodyComponent,
    updateBreastsComponent,
    updateCockComponent,
    updateControlledComponent,
    updateFeelingsComponent,
    updateHealthComponent,
    updateManaComponent,
    updateMarkComponent,
    updateMemoryComponent,
    updateMouthComponent,
    updatePersonalityComponent,
    updatePussyComponent,
    updateScalesComponent,
    updateSexualPreferenceComponent,
    updateSituatedComponent,
    updateSkillsComponent,

    deleteComponent,
    deleteActorComponent,
    deleteAnusComponent,
    deleteArousalComponent,
    deleteAspectComponent,
    deleteAttributesComponent,
    deleteBodyComponent,
    deleteBreastsComponent,
    deleteCockComponent,
    deleteControlledComponent,
    deleteFeelingsComponent,
    deleteHealthComponent,
    deleteManaComponent,
    deleteMarkComponent,
    deleteMemoryComponent,
    deleteMouthComponent,
    deletePersonalityComponent,
    deletePussyComponent,
    deleteScalesComponent,
    deleteSexualPreferenceComponent,
    deleteSituatedComponent,
    deleteSkillsComponent,

    compileEntityData,

    findChildEntities,
    findEntitiesWithComponents,
    findComponentsWith,
  });

})();

Registry.clear();
