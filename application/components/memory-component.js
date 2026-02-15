global.MemoryComponent = (function() {
  const $properties = [_parentId,'time','type','details'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.memory, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.memory,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.memory);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.memory);
  }

  function validate(id) {
    const memoryComponent = lookup(id)

    Object.keys(memoryComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Memory component does not have a ${key} property.`
      }
    });

    Validate.exists(_parentId,memoryComponent._parentId);
    Validate.exists('time',memoryComponent.time);
    Validate.isIn('type',memoryComponent.type,['training','event']);
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
  });

})();
