global.PussyComponent = (function() {
  const $properties = [
    _parentId,
    'placement',
    'shape',
    'minPussyWidth',
    'maxPussyWidth',
    'maxPussyDepth',
    'minCervixWidth',
    'maxCervixWidth',
    'minUrethraWidth',
    'maxUrethraWidth',
    'clitLength',
    'clitWidth',
    'innerLabiaLength',
    'outerLabiaSize',
    'prolapseLength'
  ];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.pussy, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.pussy,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.pussy);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.pussy);
  }

  function validate(id) {
    const pussyComponent = lookup(id);

    Object.keys(pussyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Pussy component does not have a ${key} property.`
      }
    });

    Validate.exists('Pussy._parentId',pussyComponent._parentId);
    Validate.exists('Pussy.placement',pussyComponent.placement);
    Validate.isIn('Pussy.shape',pussyComponent.shape,PussyData.PussyShapes);
    Validate.atLeast('Pussy.maxPussyWidth',pussyComponent.maxPussyWidth,32);
    Validate.atLeast('Pussy.maxPussyDepth',pussyComponent.maxPussyWidth,32);
    Validate.atLeast('Pussy.maxUrethraWidth',pussyComponent.maxPussyWidth,2);
  }

  function of(parent) {
    return Registry.findComponentsWith(ComponentType.pussy, pussyData => {
      return pussyData[_parentId] === parent;
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
