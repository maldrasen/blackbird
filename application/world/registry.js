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

  function dump(id) { console.log(JSON.stringify(Registry.compileEntityData(id),null,2)); }
  function entityExists(id) { return entities[id] != null; }

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

  // === Queries =======================================================================================================

  function findChildEntities(id) {
    const children = new Set();

    if (typesWithChildren.length === 0) {
      Object.keys(ComponentType).forEach(code => {
        if (global[ComponentType[code]].hasParent()) {
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
    dump,
    entityExists,
    createEntity,
    deleteEntity,
    listEntityComponents,
    compileEntityData,
    createComponent,
    lookupComponent,
    updateComponent,
    deleteComponent,
    findChildEntities,
    findEntitiesWithComponents,
    findComponentsWith,
  });

})();

Registry.clear();
