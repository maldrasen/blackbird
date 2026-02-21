global.MarkComponent = (function() {
  const $properties = [_parentId,'type','memory'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.mark, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.mark,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.mark);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.mark);
  }

  function validate(id) {
    const markComponent = lookup(id);

    Object.keys(markComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Mark component does not have a ${key} property.`
      }
    });

    Validate.exists('Mark._parentId',markComponent._parentId);
    Validate.isIn('Mark.type',markComponent.type,['hate','lust','love']);
    Validate.exists('Mark.memory',markComponent.memory);
  }

  function of(parent) {
    return Registry.findComponentsWith(ComponentType.mark, markData => {
      return markData[_parentId] === parent;
    });
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
    of,
  });

})();
