global.DescriptionComponent = (function() {
  const $properties = [_parentId, 'template'];

  function create(id,data) {
    if (of(id) != null) { throw `A description for this component already exists.` }

    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.description, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.description,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.description);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.description);
  }

  function validate(id) {
    const descriptionComponent = lookup(id);

    Object.keys(descriptionComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Description component does not have a ${key} property.`
      }
    });

    Validate.exists(`Description._parentId`,descriptionComponent._parentId);
    Validate.exists(`Description.template`, descriptionComponent.template);
  }

  // There should only ever be one description.
  function of(parent) {
    return Registry.findComponentsWith(ComponentType.description, component => {
      return component[_parentId] === parent;
    })[0];
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
